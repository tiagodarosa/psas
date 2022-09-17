import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComparisonOfResultsComponent } from '../components/charts/comparison-of-results/comparison-of-results.component';
import { ServicesService } from '../services.service';
import MyJourneyAndFeedbackFilterData from '../shared/data/my-journey-and-feedback-filter-data';

declare var M: any;

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrls: ['./questionnaire-result.component.css']
})
export class QuestionnaireResultComponent implements OnInit, AfterViewInit {

  profile: string;
  code: string;
  applicationId: string;
  results: Array<any>;
  competenceData: Array<any>;
  resultCompetenceData: any;
  userLogged: any;
  application: any;
  types: any;
  methods: any;
  comparissonResultsData: any;

  @ViewChild('appComparisonOfResults') appComparisonOfResults: ComparisonOfResultsComponent;

  private _docs: Array<any>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private authService: AuthService,
              private service: ServicesService,
              private spinner: NgxSpinnerService) {
    this.methods = this.buildMethodsObject();
    this.types = this.buildTypesObject();
    this.results = [];
    this.competenceData = [];
    this.resultCompetenceData = {};
    this.application = { name: 'Carregando...' };
    this.profile = this.route.snapshot.params.profile;
    this.applicationId = this.route.snapshot.params.assessment;
    this.code = this.route.snapshot.params.code;
  }

  ngOnInit() {
    this.loadData();
    this.service.findApplicationsFromUser().subscribe({
      next: (response: any) => {
        this.application = response.applicationList.find((el:any) => el._id === this.applicationId)
        this.buildCompetences();
      }
    });
    this.authService.authState.subscribe(
      {
        next: (user) => this.userLogged = user,
        error: () => this.spinner.hide(),
        complete: () => this.spinner.hide()
      }
    );
  }

  ngAfterViewInit(): void {
    const tabsElems = document.querySelectorAll('.tabs');
    M.Tabs.init(tabsElems, {});

    const colapsElems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(colapsElems, {});
  }

  onBack() {
    this.router.navigate(['dashboard-v2']);
  }

  private loadData() {
    this.spinner.show();
    const p = new MyJourneyAndFeedbackFilterData();
    const [ startDay, startMonth, startYear ] = p.startPeriod.toString().split('/');
    p.startPeriod = this.datePipe.transform(new Date(+startYear, +startMonth - 1, +startDay), 'yyyy-MM-dd');

    const [ endDay, endMonth, endYear ] = p.endPeriod.toString().split('/');
    p.endPeriod = this.datePipe.transform(new Date(+endYear, +endMonth - 1, +endDay), 'yyyy-MM-dd');
    p.recipient = this.code;
    this.service.findJourneyAndFeedback(p).subscribe(
      {
        next: (response: any) => {
          this._docs = response.docs;
          this.buildCompetenceTable();
        },
        error: this.showErrors.bind(this),
        complete: () => this.spinner.hide()
      }
    );
  }

  private buildCompetenceTable() {
    this._docs.forEach((el: any) => {
      if (el.params.relatedSkills !== undefined) {
        el.params.relatedSkills.forEach((el:string) => {
          const relSklTemp = this.competenceData.find(it => it.name === el);
          if (relSklTemp !== undefined) relSklTemp.weight++;
          else this.competenceData.push({ name: el, weight: 1 });
        });
      }
    });
  }

  private showErrors(error: any) {
    this.spinner.hide();
    M.toast({ html: `Erro: ${error.message}`});
  }

  private buildTypesObject(): any {
    return {
      'initial': 'Diagnóstica',
      'summative': 'Formativa',
      'formative': 'Somativa'
    }
  }

  private buildMethodsObject(): any {
    return {
      'ranking': 'Ranking',
      'nomination': 'Nomeação',
      'classification': 'Classificação'
    }
  }

  private buildCompetences() {

    const teamLeader = this.application.team.members[0].email;
    const competences = this.application.assessment.questions.map((q:any) => {
      return {
        order: q.order,
        name: q.competenceName
      };
    }).sort((a: any, b: any) => a.order - b.order);
    const autoResultsObj: Array<any> = this.application.answers.filter((a: any) => a.userEvaluator === this.userLogged.email && a.userRated === a.userEvaluator);
    const leaderResultsObj: Array<any> = this.application.answers.filter((a: any) => a.userEvaluator === teamLeader && a.userRated === a.userEvaluator);
    const pairResultsObj: Array<any> = this.application.answers.filter((a: any) => a.userEvaluator !== teamLeader && a.userEvaluator !== this.userLogged.email && a.userRated === a.userEvaluator);
    const autoResults: Array<number> = [];
    const leaderResults: Array<number> = [];
    const pairResults: Array<number> = [];
    competences.forEach((c: any) => {
      const arObject = autoResultsObj.find((obj: any) => obj.questionOrder === c.order);
      const lrObject = leaderResultsObj.find((obj: any) => obj.questionOrder === c.order);
      const prObject = pairResultsObj.find((obj: any) => obj.questionOrder === c.order);
      const average = (Number(arObject.answer) + Number(lrObject.answer) + Number(prObject.answer)) / 3;
      autoResults.push(Number(arObject.answer));
      leaderResults.push(Number(lrObject.answer));
      pairResults.push(Number(prObject.answer));
      this.competenceData.push( 
        { 
          'name': c.name, 
          'auto': Number(arObject.answer).toFixed(1),
          'leader': Number(lrObject.answer).toFixed(1),
          'pair': Number(prObject.answer).toFixed(1),
          'average': average.toFixed(1)
        } 
      );
      
    });

    this.comparissonResultsData = {
      competences: competences.map((c: any) => c.name),
      autoResults,
      leaderResults,
      pairResults
    };

    let autoTotal: number = 0;
    let leaderTotal: number = 0;
    let pairTotal: number = 0;
    this.competenceData.forEach((compData: any) => {
      autoTotal += Number(compData.auto);
      leaderTotal += Number(compData.leader);
      pairTotal += Number(compData.pair);
    });

    autoTotal = autoTotal / this.competenceData.length;
    leaderTotal = leaderTotal / this.competenceData.length;
    pairTotal = pairTotal / this.competenceData.length;
    const total = (autoTotal + leaderTotal + pairTotal) / 3;

    this.resultCompetenceData = {
      'name': 'MÉDIA COMPETÊNCIA',
      'auto': autoTotal.toFixed(1),
      'leader': leaderTotal.toFixed(1),
      'pair': pairTotal.toFixed(1),
      'average': total.toFixed(1)
    };

    this.appComparisonOfResults.reloadChart(this.comparissonResultsData);

  }

}
