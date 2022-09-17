import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComparisonOfResultsComponent } from '../components/charts/comparison-of-results/comparison-of-results.component';
import { WordCloudComponent } from '../components/charts/word-cloud/word-cloud.component';
import { ServicesService } from '../services.service';
import MyJourneyAndFeedbackFilterData from '../shared/data/my-journey-and-feedback-filter-data';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './dashboard-v2.component.html',
  styleUrls: ['./dashboard-v2.component.css']
})
export class DashboardV2Component implements OnInit, AfterViewInit {

  wcData: Array<any>;
  teamsList: Array<any>;
  projectsList: Array<any>;
  applicationsList: Array<any>;
  assessmentValue: string;
  profileSelector: string;
  person: string;
  isLoadingComplete: boolean;
  comparissonResultsData: any;

  @ViewChild('appWordCloud') appWordCloud: WordCloudComponent;
  @ViewChild('appComparisonOfResults') appComparisonOfResults: ComparisonOfResultsComponent;

  private _organizationId: string;
  private _userLogged: any;
  private _isReloadComponents: boolean;
  private _applicationsListCache: Array<any>;

  constructor(private router: Router,
              private cookie: CookieService,
              private spinner: NgxSpinnerService,
              private authService: AuthService,
              private datePipe: DatePipe,
              private service: ServicesService) {
    this._organizationId = this.cookie.get('ORGANIZATIONID');
    this.wcData = [];
    this.applicationsList = [];
    this._applicationsListCache = [];
    this.comparissonResultsData = { competences: [] };
    this._isReloadComponents = false;
    this.isLoadingComplete = false;
    this.profileSelector = '1';
  }

  ngOnInit() {
    this.authService.authState.subscribe(
      {
        next: (user) => {
          this._userLogged = user;
          this.getApplications();
          this.getTeams();
          this.loadWordCloudData();
        },
        error: () => this.spinner.hide(),
        complete: () => this.spinner.hide()
      }
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => $('select').formSelect(), 1000);
  }

  onDetailsJourneyAndFeedback() {
    const paramUrl = this.profileSelector === '1' ? 'user-profile' : 'team-profile';
    this.router.navigate(['details-journey-and-feedback', paramUrl, this.assessmentValue]);
  }

  onShowQuestionnaireResult() {
    const paramUrl = this.profileSelector === '1' ? 'user-profile' : 'team-profile';
    this.router.navigate(['questionnaire-result', paramUrl, this.assessmentValue, 'thigo.san@gmail.com']);
  }

  onChangeProfile() {
    this.person = this.profileSelector === '1' ? this._userLogged.email : '';
    this.loadWordCloudData();
  }

  onSelectApplication() {
    const object = this._applicationsListCache.find((al: any) => al._id === this.assessmentValue);
    const teamLeader = object.team.members[0].email;
    const competences = object.assessment.questions.map((q:any) => {
      return {
        order: q.order,
        name: q.competenceName
      };
    }).sort((a: any, b: any) => a.order - b.order);
    const autoResultsObj: Array<any> = object.answers.filter((a: any) => a.userEvaluator === this._userLogged.email && a.userRated === a.userEvaluator);
    const leaderResultsObj: Array<any> = object.answers.filter((a: any) => a.userEvaluator === teamLeader && a.userRated === a.userEvaluator);
    const pairResultsObj: Array<any> = object.answers.filter((a: any) => a.userEvaluator !== teamLeader && a.userEvaluator !== this._userLogged.email && a.userRated === a.userEvaluator);
    const autoResults: Array<number> = [];
    const leaderResults: Array<number> = [];
    const pairResults: Array<number> = [];
    competences.forEach((c: any) => {
      const arObject = autoResultsObj.find((obj: any) => obj.questionOrder === c.order);
      const lrObject = leaderResultsObj.find((obj: any) => obj.questionOrder === c.order);
      const prObject = pairResultsObj.find((obj: any) => obj.questionOrder === c.order);
      autoResults.push(Number(arObject.answer));
      leaderResults.push(Number(lrObject.answer));
      pairResults.push(Number(prObject.answer));
    });

    this.comparissonResultsData = {
      competences: competences.map((c: any) => c.name),
      autoResults,
      leaderResults,
      pairResults
    };

    this.appComparisonOfResults.reloadChart(this.comparissonResultsData);
  }

  private getMembers() {
    if (this.teamsList.length === 1) {
      return this.teamsList.map((el: any) => {
        const members = el.members.map((el: any) => el.email)
        return members;
      }).join(',');
    } else {
      throw new Error('Adicionar o campo para escolha de times na tela.');
    }
  }

  private loadWordCloudData() {
    this.wcData = [];
    const param: MyJourneyAndFeedbackFilterData = new MyJourneyAndFeedbackFilterData();
    param.informationType = '1';
    param.recipient = this.profileSelector === '1' ? this._userLogged.email : this.getMembers();
    const [ startDay, startMonth, startYear ] = param.startPeriod.toString().split('/');
    param.startPeriod = this.datePipe.transform(new Date(+startYear, +startMonth - 1, +startDay), 'yyyy-MM-dd');

    const [ endDay, endMonth, endYear ] = param.endPeriod.toString().split('/');
    param.endPeriod = this.datePipe.transform(new Date(+endYear, +endMonth - 1, +endDay), 'yyyy-MM-dd');

    param.informationType = '2,3,4,5';
    param.messageType = '1,2';

    param.userLogged = this._userLogged.email;
    param.organizationId = this._organizationId;

    this.service.findJourneyAndFeedback(param).subscribe(
      (response: any) => {
        response.docs.forEach((el: any) => {
          if (el.params.relatedSkills !== undefined) {
            el.params.relatedSkills.forEach((el:string) => {
              const relSklTemp = this.wcData.find(it => it.name === el);
              if (relSklTemp !== undefined) relSklTemp.weight++;
              else this.wcData.push({ name: el, weight: 1 });
            });
          }
        });
        if (this._isReloadComponents) this.appWordCloud.reloadChart(this.wcData);
        this._isReloadComponents = false;
      }
    )
  }

  private getTeams() {
    this.teamsList = [];
    this.projectsList = [];
    this.service.findTeamsFromUser().subscribe((data) => {
      const projs = Object(data).projects;
      projs.forEach(p => {
        if (p.organizationId === this._organizationId) {
          this.projectsList.push(p);
        }
      });
      const tList = Object(data).teams;
      tList.forEach(t => {
        if (this.projectsList.some(p => p._id === t.projectId)) {
          this.teamsList.push(t);
        }
      });
      this.teamsList.sort(this.compare);
    }, (error) => {
      console.log(error);
    });
  }

  private compare(a: any, b: any) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  private getApplications() {
    this.service.findApplicationsFromUser().subscribe(
      {
        next: (response: any) => {
          this._applicationsListCache = response.applicationList;
          response.applicationList.filter((el: any) => el.organizationId === this._organizationId)
            .forEach((el: any) => {
              this.applicationsList.push({
                value: el._id,
                label: el.name
              });
            }
          );
          setTimeout(() => {
            const selectElems = document.querySelectorAll('select');
            M.FormSelect.init(selectElems, {});
            this.isLoadingComplete = true;
            if (this.applicationsList.length === 1) {
              this.assessmentValue = this.applicationsList[0].value;
              this.onSelectApplication();
            }
          }, 100)
        }
      }
    )
  }

}
