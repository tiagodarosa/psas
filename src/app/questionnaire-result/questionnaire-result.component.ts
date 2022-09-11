import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
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
  assessmentId: string;
  results: Array<any>;
  competenceData: Array<any>;
  userLogged: any;
  assessment: string;

  private _docs: Array<any>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private authService: AuthService,
              private service: ServicesService,
              private spinner: NgxSpinnerService) {
    this.results = [];
    this.competenceData = [];
    this.profile = this.route.snapshot.params.profile;
    this.assessmentId = this.route.snapshot.params.assessment;
    this.code = this.route.snapshot.params.code;
  }

  ngOnInit() {
    this.loadData();
    this.service.findAssessmentById(this.assessmentId).subscribe((response: any) => this.assessment = response.assessment);
    this.service.findApplicationsFromUser().subscribe((response: any) => {
      next: (response: any) => console.log(response);
    })
    this.authService.authState.subscribe(
      {
        next: (user) => {
          this.userLogged = user;
        },
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

}
