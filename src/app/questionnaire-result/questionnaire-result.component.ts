import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComparisonOfResultsComponent } from '../components/charts/comparison-of-results/comparison-of-results.component';
import { HistoryChartComponent } from '../components/charts/history-chart/history-chart.component';
import { NineBoxChartComponent } from '../components/nine-box-chart/nine-box-chart.component';
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
  competenceSeries: Array<any>;
  totalSeries: any;
  resultCompetenceData: any;
  userLogged: any;
  application: any;
  types: any;
  methods: any;
  comparissonResultsData: any;
  rows: Array<any>;
  userInfoList: Array<any>;
  definitiveRows: Array<any>;
  nineBox: string;
  teamName: string;
  employeeNameSelected: string;
  employeePhotoSelected: string;
  
  @ViewChild('appComparisonOfResults') appComparisonOfResults: ComparisonOfResultsComponent;
  @ViewChild('historyChart') historyChart: HistoryChartComponent;
  
  private _axisY: number;
  private _axisX: number;
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
    this.competenceSeries = [];
    this.rows = [];
    this.resultCompetenceData = {};
    this.totalSeries = {};
    this.nineBox = '';
    this.employeeNameSelected = 'Carregando...';
    this.employeePhotoSelected = '';
    this.teamName = 'Carregando...';
    this.application = { name: 'Carregando...' };
    this.applicationId = this.route.snapshot.params.assessment;
    this.code = this.route.snapshot.params.code;
  }

  ngOnInit() {
    this.userInfoList = this.buildUserInfoList();
    let userInfo = this.userInfoList.find((info: any) => info.email === this.code);
    if (userInfo !== undefined) {
      this.employeeNameSelected = userInfo.name;
      this.employeePhotoSelected = userInfo.photoUrl;
    }

    this.authService.authState.subscribe(
      {
        next: (user) => {
          this.userLogged = user;
          this.loadData();
        },
        error: () => this.spinner.hide(),
        complete: () => this.spinner.hide()
      }
    );
  }

  ngAfterViewInit(): void {
    const tabsElems = document.querySelectorAll('.tabs');
    M.Tabs.init(tabsElems, {});
  }

  getPhotoUrl(email: string) {
    try {
      const userInfo = this.userInfoList.find((uil: any) => uil.email === email);
      if (userInfo !== undefined && userInfo !== null)
        return userInfo.photoUrl;
      else
        return '/assets/user.png';
    } catch(error) {
      return '/assets/user.png';
    }
  }

  getTotalSeriesArr() {
    return Object.keys(this.totalSeries);
  }

  getTotalValue(key: string) {
    return this.totalSeries[key];
  }

  loadInitialData() {
    this.service.findApplicationsFromUser().subscribe({
      next: (response: any) => {
        this.application = response.applicationList.find((el:any) => el._id === this.applicationId)
        this.profile = this.route.snapshot.params.profile;
        if (this.profile === 'user-profile')
          this.buildCompetences(this.userLogged.email);
        else {
          this.competenceSeries = this.application.assessment.questions.map((q:any) => {
            return {
              order: q.order,
              name: q.competenceName
            };
          }).sort((a: any, b: any) => a.order - b.order);
          this.buildTeamCompetences();
          this.buildRadarTeam();
        }
      }
    });
  }
  
  initializaCollapses() {
    const colapsElems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(colapsElems, {});
  }

  onBack() {
    this.router.navigate(['dashboard-v2']);
  }

  getAverageValue(r: any, totalCompetence: number): string {
    let total = 0;
    for (let count = 0; count < totalCompetence; count++) {
      total += Number(r[`$qst_${count}`]);
    }
    return Number(total / totalCompetence).toFixed(1);
  }

  getNoteValue(lineData: any, rIndex: number) {
    return lineData.averageUsers[rIndex].note;
  }

  getTotalColor(value: string) {
    return this.getColor(Number(value));
  }

  onDiaryAndFeedback() {
    this.router.navigate(['details-journey-and-feedback', this.profile, this.applicationId]);
  }

  onShowQuestionnaireResult(email: string) {
    this.router.navigate(['individual-result', 'user-profile', this.applicationId, email]);
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
          this.loadInitialData();
          if (this.userLogged !== undefined && this.userLogged !== null)
            this.historyChart.reloadChart(this.userLogged.email);
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

  private getColor(weight: number) {
    if (weight > 3.5)
      return '#00b853';
    else if (weight > 2.5)
      return '#a3e09c'; 
    else if (weight > 1.5)
      return '#d2ecb3';
    else
      return '#fff6cb';
  }

  private buildRadarTeam() {
    const teamLeader = this.application.team.members[0].email;
    const membersOfTeam = this.application.team.members.filter((mbs: any) => mbs.email !== teamLeader);
    const teamCompResultsData = [];
    membersOfTeam.forEach( (mot: any) => {
      const leaderResultsObj: Array<any> = this.application.answers.filter((a: any) => a.userEvaluator === teamLeader && a.userRated === mot.email);
      const pairResultsObj: Array<any> = this.application.answers.filter((a: any) => a.userEvaluator !== teamLeader && a.userEvaluator !== mot.email && a.userRated === mot.email);
      const averageResults: Array<number> = [];
      const leaderResults: Array<number> = [];
      const pairResults: Array<number> = [];
      this.competenceSeries.forEach((c: any) => {
        const lrObject = leaderResultsObj.find((obj: any) => obj.questionOrder === c.order);
        const prObject = pairResultsObj.find((obj: any) => obj.questionOrder === c.order);
        let average: number = 0;
        leaderResults.push(Number(lrObject.answer));
        pairResults.push(Number(prObject.answer));
        average = Number(Number(prObject.answer) + Number(lrObject.answer) ) / 2;
        averageResults.push(average);
      });

      teamCompResultsData.push(
        {
          competences: this.competenceSeries.map((c: any) => c.name),
          data: averageResults,
          name: mot.name
        }
      );
    });

    let teamData: Array<number> = [];
    for (let count = 0; count < this.competenceSeries.length; count++) {
      let competenceTotal = 0;
      for (let membersCount = 0; membersCount < teamCompResultsData.length;membersCount++) {
        competenceTotal += teamCompResultsData[membersCount]['data'][count];
      }
      teamData.push(competenceTotal / teamCompResultsData.length);
    }

    teamCompResultsData.push(
      {
        competences: this.competenceSeries.map((c: any) => c.name),
        data: teamData,
        name: 'Média Equipe'
      }
    );
    
    setTimeout(() => {
      this.appComparisonOfResults.teamReloadChart(teamCompResultsData);
    }, 100);
  }

  private buildTeamCompetences() {
    this.rows = [];
    const teamLeader = this.application.team.members[0].email;
    this.teamName = this.application.team.name;
    this.application.team.members.forEach((member: any) => {
      
      if (member.name !== undefined) {
        this._axisX = 0;
        this._axisY = 0;
        const autoResultsObj: Array<any> = this.application.answers.filter((a: any) => a.userEvaluator === member.email && a.userRated === a.userEvaluator);
        const leaderResultsObj: Array<any> = this.application.answers.filter((a: any) => a.userEvaluator === teamLeader && a.userRated === member.email);
        const pairResultsObj: Array<any> = this.application.answers.filter((a: any) => a.userEvaluator !== teamLeader && a.userEvaluator !== member.email && a.userRated === a.userEvaluator);
        this.competenceSeries.forEach((c: any) => {
          const arObject = autoResultsObj.find((obj: any) => obj.questionOrder === c.order);
          const lrObject = leaderResultsObj.find((obj: any) => obj.questionOrder === c.order);
          const prObject = pairResultsObj.find((obj: any) => obj.questionOrder === c.order);
          const average = (Number(arObject.answer) + Number(lrObject.answer) + Number(prObject.answer)) / 3;
          let _9boxAverage: number = 0;
          _9boxAverage = Number(Number(prObject.answer) + Number(lrObject.answer) ) / 2;
          
          if (String(c.name).toLocaleLowerCase().trim() === 'resultado')
            this._axisY = _9boxAverage;
          else
            this._axisX += _9boxAverage

          const objTemp = this.rows.find((r: any) => r.name === member.name);
          if (objTemp !== undefined) {
            objTemp[`$qst_${c.order}`] = average.toFixed();
          } else {
            const objTemp = {
              'name': member.name,
              'email': member.email
            };
            objTemp[`$qst_${c.order}`] = average.toFixed();

            this.rows.push(objTemp);
          }

        });
        this._axisX = this._axisX / this.competenceSeries.length - 1;

        const objTemp = this.rows.find((r: any) => r.name === member.name);
        if (objTemp !== undefined)
          objTemp['nine_box'] = NineBoxChartComponent.calcAxis(this._axisX, this._axisY);
      }

    });

    for (let count = 0; count < this.competenceSeries.length; count++) {
      this.totalSeries[`$qst_${count}`] = 0;
    }

    this.rows.forEach((r: any) => {
      for (let count = 0; count < this.competenceSeries.length; count++) {
        this.totalSeries[`$qst_${count}`] += Number(r[`$qst_${count}`]);
      }  
    });

    for (let count = 0; count < this.competenceSeries.length; count++) {
      this.totalSeries[`$qst_${count}`] = this.totalSeries[`$qst_${count}`] / this.rows.length;
    }
    
    this.definitiveRows = [];
    let result: any = {};
    this.competenceSeries.forEach((c: any, index: number) => {
      if (String(c.name).trim().toLocaleLowerCase() !== 'resultado') {
        const object = {
          'id': c.order,
          'competenceName': c.name,
          'totalValue': this.totalSeries[`$qst_${index}`],
          'averageUsers': []
        };
  
        for (let count = 0; count < this.rows.length; count++) {
          object.averageUsers.push(
            {
              'competenceName': c.name,
              'note': this.rows[count][`$qst_${index}`]
            }
          );
        }
        this.definitiveRows.push(object);
      } else {
        result = {
          'id': c.order,
          'competenceName': c.name,
          'totalValue': this.totalSeries[`$qst_${index}`],
          'averageUsers': []
        };
  
        for (let count = 0; count < this.rows.length; count++) {
          result.averageUsers.push(
            {
              'competenceName': c.name,
              'note': this.rows[count][`$qst_${index}`]
            }
          );
        }
      }
    });
    
    this.definitiveRows = this.definitiveRows.sort((a, b) => Number(b.totalValue) - Number(a.totalValue));
    this.definitiveRows.push(result);

    this.rows.forEach((r: any) => {
      r['average'] = this.getAverageValue(r, this.competenceSeries.length);
      r['averageColor'] = this.getColor(r['average']);
    })
    
    this.initializaCollapses();

  }
  
  private buildCompetences(userMail: string) {

    this._axisX = 0;
    this._axisY = 0;

    const teamLeader = this.application.team.members[0].email;
    const competences = this.application.assessment.questions.map((q:any) => {
      return {
        order: q.order,
        name: q.competenceName
      };
    }).sort((a: any, b: any) => a.order - b.order);
    const autoResultsObj: Array<any> = this.application.answers.filter((a: any) => a.userEvaluator === userMail && a.userRated === a.userEvaluator);
    const leaderResultsObj: Array<any> = this.application.answers.filter((a: any) => a.userEvaluator === teamLeader && a.userRated === userMail);
    const pairResultsObj: Array<any> = this.application.answers.filter((a: any) => a.userEvaluator !== teamLeader && a.userEvaluator !== userMail && a.userRated === a.userEvaluator);
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
      let _9boxAverage: number = 0;
      _9boxAverage = Number(Number(prObject.answer) + Number(lrObject.answer) ) / 2;
      
      if (String(c.name).toLocaleLowerCase().trim() === 'resultado')
        this._axisY = _9boxAverage;
      else
        this._axisX += _9boxAverage

      this.competenceData.push( 
        { 
          'name': c.name, 
          'auto': Number(arObject.answer).toFixed(1),
          'leader': Number(lrObject.answer).toFixed(1),
          'pair': Number(prObject.answer).toFixed(1),
          'average': average.toFixed(1),
          'color': this.getColor(average)
        } 
      );
      
    });

    this._axisX = this._axisX / competences.length - 1;
    this.nineBox = NineBoxChartComponent.calcAxis(this._axisX, this._axisY);

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
      if (String(compData.name).toLocaleLowerCase().trim() !== 'resultado') {
        autoTotal += Number(compData.auto);
        leaderTotal += Number(compData.leader);
        pairTotal += Number(compData.pair);
      }
    });

    let difference: number = 0;
    let markObject: any = null;;
    this.competenceData.forEach((data: any) => {
      let diffTemp = data.auto - data.leader;
      if (diffTemp > difference) {
        markObject = data;
        difference = diffTemp;
      }

      diffTemp = data.leader - data.auto;
      if (diffTemp > difference) {
        markObject = data;
        difference = diffTemp;
      }
    });
    if (markObject !== null)
      markObject['$biggerDifference'] = true;

    const index = this.competenceData.findIndex((el: any) => String(el.name).toLocaleLowerCase() === 'resultado');
    const cache = this.competenceData.splice(index, 1);
    this.competenceData = this.competenceData.sort((el1: any, el2: any) => el2.average - el1.average);
    this.competenceData.push(cache[0]);

    autoTotal = autoTotal / (this.competenceData.length - 1);
    leaderTotal = leaderTotal / (this.competenceData.length - 1);
    pairTotal = pairTotal / (this.competenceData.length - 1);
    const total = (autoTotal + leaderTotal + pairTotal) / 3;

    this.resultCompetenceData = {
      'name': 'MÉDIA COMPETÊNCIA',
      'auto': autoTotal.toFixed(1),
      'leader': leaderTotal.toFixed(1),
      'pair': pairTotal.toFixed(1),
      'average': total.toFixed(1),
      'color': this.getColor(total)
    };

    this.appComparisonOfResults.reloadChart(this.comparissonResultsData);
    this.initializaCollapses();
  }

  private buildUserInfoList() {
    return [
      {
        "name":"Ana Cristina Calegari Corrêa",
        "email":"anacristina.calegari@gmail.com",
        "photoUrl":"https://lh3.googleusercontent.com/a-/ACNPEu8dncgo2a1FyjuplepDeZeRYfcNSJIbHEWwc4OyxTo=s96-c"
      },
      {
        "name":"Cristina da Silva",
        "email":"cristinaccsilva2022@gmail.com",
        "photoUrl":"https://lh3.googleusercontent.com/a-/ACNPEu-UVk4NPpYtdTMwXpkbjAIs4VTuBTPZ7ay0h8mx=s96-c"
      },
      {
        "name":"Thiago Gonçalves dos Santos",
        "email":"thigo.san@gmail.com",
        "photoUrl":"https://lh3.googleusercontent.com/a-/AFdZucpod9jta5TZSY0jTGuMyTgeb9kJIJlhKM6CrqqEWJU=s96-c"
      },
      {
        "name":"Ana Cristina Calegari Corrêa",
        "email":"anacalegari.academica@gmail.com",
        "photoUrl":"https://lh3.googleusercontent.com/a/AItbvmmi0CshehMwNRKaEhKE5FXZO-dzq9VdHqDG9DdE=s96-c"
      },
      {
        "name": "Neomesio Junior",
        "email": "neomesio@gmail.com",
        "photoUrl": "https://lh3.googleusercontent.com/a-/ACNPEu8HpsMap5UMuTCi3X6mHOYl08byZf3rqXcEX4OUzg=s96-c"
      }
    ];
  }

}
