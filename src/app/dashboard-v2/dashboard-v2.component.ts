import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
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
export class DashboardV2Component implements OnInit {

  wcData: Array<any>;
  teamsList: Array<any>;
  projectsList: Array<any>;
  assessmentList: Array<any>;
  profileSelector: string;

  @ViewChild('appWordCloud') appWordCloud: WordCloudComponent;

  private _organizationId: string;
  private _userLogged: any;
  private _isReloadComponents: boolean;

  constructor(private router: Router,
              private cookie: CookieService,
              private spinner: NgxSpinnerService,
              private authService: AuthService,
              private datePipe: DatePipe,
              private service: ServicesService) {
    this._organizationId = this.cookie.get('ORGANIZATIONID');
    this.wcData = [];
    this.assessmentList = [];
    this._isReloadComponents = false;
    this.profileSelector = '1';
  }

  ngOnInit() {
    $('select').formSelect();
    this.authService.authState.subscribe(
      {
        next: (user) => {
          this._userLogged = user;
          this.getAssessment();
          this.getTeams();
          this.loadWordCloudData();
        },
        error: () => this.spinner.hide(),
        complete: () => this.spinner.hide()
      }
    );
  }

  onDetailsJourneyAndFeedback() {
    const paramUrl = this.profileSelector === '1' ? 'user-profile' : 'team-profile';
    this.router.navigate(['details-journey-and-feedback', paramUrl]);
  }

  onShowQuestionnaireResult() {
    const paramUrl = this.profileSelector === '1' ? 'user-profile' : 'team-profile';
    this.router.navigate(['questionnaire-result', paramUrl, 'thigo.san@gmail.com']);
  }

  onChangeProfile() {
    this.loadWordCloudData();
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
    param.informationType = 1;
    param.recipient = this.profileSelector === '1' ? this._userLogged.email : this.getMembers();
    const [ startDay, startMonth, startYear ] = param.startPeriod.toString().split('/');
    param.startPeriod = this.datePipe.transform(new Date(+startYear, +startMonth - 1, +startDay), 'yyyy-MM-dd');

    const [ endDay, endMonth, endYear ] = param.endPeriod.toString().split('/');
    param.endPeriod = this.datePipe.transform(new Date(+endYear, +endMonth - 1, +endDay), 'yyyy-MM-dd');

    this.service.findJourneyAndFeedback(param).subscribe(
      (response: any) => {
        response.docs.forEach((el: any) => {
          if (el.params.relatedSkills !== undefined) {
            el.params.relatedSkills.forEach((el:string) => {
              const relSklTemp = this.wcData.find(it => it.name === el);
              if (relSklTemp !== undefined) relSklTemp.weight++;
              else this.wcData.push({ name: el, weight: 1 });
            });
            if (this._isReloadComponents) this.appWordCloud.reloadChart(this.wcData);
            this._isReloadComponents = false;
          }
        });
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

  private getAssessment() {
    this.service.findAssessmentsFromUser().subscribe(
      {
        next: (response: any) => {
          this.assessmentList = [];
          response.assessments.forEach(elem => {
            this.assessmentList.push({ value: elem._id, label: elem.name });
          });
          setTimeout(() => {
            const selectElems = document.querySelectorAll('select');
            M.FormSelect.init(selectElems, {});
          }, 0)
        }
      }
    );
  }

}
