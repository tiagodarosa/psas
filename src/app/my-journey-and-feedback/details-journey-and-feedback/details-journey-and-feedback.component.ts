import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BarsChartComponent } from 'src/app/components/charts/bars-chart/bars-chart.component';
import { WordCloudComponent } from 'src/app/components/charts/word-cloud/word-cloud.component';
import { ServicesService } from 'src/app/services.service';
import CompetenceData from 'src/app/shared/data/compentende.data';
import MyJourneyAndFeedbackConstantsData from 'src/app/shared/data/my-journey-and-feedback-constants.data';
import MyJourneyAndFeedbackFilterData from 'src/app/shared/data/my-journey-and-feedback-filter-data';
import PickersConstants from 'src/app/shared/materialize/i18n/pickers.constants';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-details-journey-and-feedback',
  templateUrl: './details-journey-and-feedback.component.html',
  styleUrls: ['./details-journey-and-feedback.component.css']
})
export class DetailsJourneyAndFeedbackComponent implements OnInit, AfterViewInit {

  wcData: Array<any>;
  rankingData: Array<any>;
  cards: Array<any>;
  data: Array<CompetenceData>;
  compentencesList: Array<{label: string, key: string}>;
  relatedSkillsInstance: any;
  dateFildsInstances: any;
  filter: MyJourneyAndFeedbackFilterData;
  profile: string;
  teamName: string;
  messageTypeFilter: { acknowledgment: boolean, development: boolean };
  indicators: Array<{ name: string, partDiary: number, sent: number, received: number, partDiaryColor: string, sentColor: string, receivedColor: string, email: string }>;
  viewControl: { recipient: boolean, issuer: boolean };
  membersOfOrganization: Array<any>;
  membersOfTeam: Array<any>;
  membersOfTeamCombo: Array<any>;
  userInfoList: Array<any>;
  isLoadingIndicators: boolean;
  barsTotalData: { totalDiary: number, totalSent: number, totalReceived: number };

  @ViewChild('periodStart') periodStart: NgbInputDatepicker;
  @ViewChild('periodEnd') periodEnd: NgbInputDatepicker;
  @ViewChild('appWordCloud') appWordCloud: WordCloudComponent;
  @ViewChild('appBarsChart') appBarsChart: BarsChartComponent;

  private _organizationId: string;
  private _userLogged: any;
  private _docs: Array<any>;
  private _isReloadComponents: boolean;
  private _assessmentId: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private cookie: CookieService,
              private authService: AuthService,
              private spinner: NgxSpinnerService,
              private service: ServicesService) {
    this.relatedSkillsInstance = [];
    this.filter = new MyJourneyAndFeedbackFilterData();
    this.filter.informationType = '2';
    this.isLoadingIndicators = false;
    this.data = [];
    this.wcData = [];
    this.rankingData = [];
    this.compentencesList = [];
    this.membersOfTeamCombo = [];
    this.indicators = [];
    this.viewControl = { recipient: false, issuer: false };
    this.messageTypeFilter = { acknowledgment: true, development: true };
    this._organizationId = this.cookie.get('ORGANIZATIONID');
    this._isReloadComponents = false;
    this.profile = this.route.snapshot.params.profile;
    this._assessmentId = this.route.snapshot.params.assessmentId;
    this.barsTotalData = { totalDiary: 0, totalSent: 0, totalReceived: 0 };
  }

  ngOnInit() {
    this.wcData = [];
    this.rankingData = [];
    this.cards = [];
    this.data = [];
    this._docs = [];
    this.service.getUserInfoByEmail({email: ''}).subscribe((response:any) => this.userInfoList = response.docs);
    this.authService.authState.subscribe(
      {
        next: (user) => {
          this._userLogged = user;
          this.getMembersOfOrganization();
          this.getMembersOfTeam();
          this.onSelectInformationType(this.filter.informationType);
        },
        error: () => this.spinner.hide(),
        complete: () => this.spinner.hide()
      }
    );
  }

  ngAfterViewInit(): void {
    this.loadComponents();
    this.getCompetences();
  }

  onSelectInformationType(value: string) {
    if (value === '2') {
      if(this.profile === 'user-profile') {
        this.viewControl.recipient = false;
        this.viewControl.issuer = false;
        this.filter.issuer = this._userLogged.email;
        this.filter.recipient = this._userLogged.email;
      } else {
        this.viewControl.issuer = true;
        this.viewControl.recipient = true;
        this.filter.recipient = '';
        this.filter.issuer = '';
      }
    } else if (value === '3') {
      this.viewControl.issuer = true;
      this.viewControl.recipient = true;
    } else if (value === '4') {
      if(this.profile === 'user-profile') {
        this.viewControl.recipient = true;
        this.viewControl.issuer = true;
        this.filter.recipient = '';
        this.filter.issuer = this._userLogged.email;
      } else {
        this.viewControl.issuer = true;
        this.viewControl.recipient = true;
        this.filter.recipient = '';
        this.filter.issuer = '';
      }
    } else if (value === '5') {
      this.filter.recipient = '';
      this.filter.issuer = '';
      this.viewControl.issuer = true;
      this.viewControl.recipient = true;
    }
    this.initializeSelects('membersOfOrganizationName');
    this.initializeSelects('membersOfTeamName');
  }

  onSearch() {
    this._isReloadComponents = true;
    const startPeriodElem: any = this.getComponentInstance(this.dateFildsInstances, 'startPeriod');
    this.filter.startPeriod = startPeriodElem.el.value;

    const endPeriodElem: any = this.getComponentInstance(this.dateFildsInstances, 'endPeriod');
    this.filter.endPeriod = endPeriodElem.el.value;

    const relatedSkillsTempInstance = this.filter.relatedSkills = this.getComponentInstance(this.relatedSkillsInstance, 'relatedSkillsField');
    
    if (relatedSkillsTempInstance !== undefined)
      this.filter.relatedSkills = relatedSkillsTempInstance.getSelectedValues().map((el: string) => el.split(':')[1].replace('\'', '').replace('\'', '').trim());

    this.loadData();
  }

  onBack() {
    this.router.navigate(['dashboard-v2']);
  }

  getPhotoUrl(email: string) {
    try {
      const userInfo = this.userInfoList.find((uil: any) => uil.params.email === email);
      if (userInfo !== undefined && userInfo !== null)
        return userInfo.params.photoUrl;
      else
        return '/assets/user.png';
    } catch(error) {
      return '/assets/user.png';
    }
  }

  private getComponentInstance(instance: Array<any>, componentName: string) {
    return instance.find((comp: any) => {
      return String(comp.el.name).indexOf(componentName) >= 0
    });
  }

  private loadComponents() {
    
    const datePickersElems = document.querySelectorAll('.datepicker');
    this.dateFildsInstances = M.Datepicker.init(datePickersElems, { format: 'dd/mm/yyyy', i18n: PickersConstants.BR_OPTIONS });

    $(document).ready(function(){
      $('.tooltipped').tooltip();
    });

    $('.collapsible').collapsible();
  }

  private getCompetences() {
    this.service.findOrganizationById(this._organizationId).subscribe(
      {
        next: (response: any) => {
          response.competences.forEach((el: any) => {
            this.compentencesList.push({ key: el.name, label: el.name });
          });
          setTimeout(() => {
            const selectElems = document.querySelectorAll('select');
            this.relatedSkillsInstance = M.FormSelect.init(selectElems, {});
          }, 0);
        }
      }
    );
  }

  private loadData() {
    this.spinner.show();
    this.appWordCloud.reloadChart([]);
    this.wcData = [];
    this.rankingData = [];
    const p = Object.assign({}, this.filter);
    
    const [ startDay, startMonth, startYear ] = p.startPeriod.toString().split('/');
    p.startPeriod = this.datePipe.transform(new Date(+startYear, +startMonth, +startDay), 'yyyy-MM-dd');

    const [ endDay, endMonth, endYear ] = p.endPeriod.toString().split('/');
    p.endPeriod = this.datePipe.transform(new Date(+endYear, +endMonth - 1, Number(endDay) + 1), 'yyyy-MM-dd');

    const messageTypeArr = [];
    if (this.messageTypeFilter.acknowledgment) messageTypeArr.push(1);
    if (this.messageTypeFilter.development) messageTypeArr.push(2);
    p.messageType = messageTypeArr.join(',');
    if (p.messageType !== undefined && p.messageType !== null && p.messageType === '')
      delete p.messageType;

    p.organizationId = this._organizationId;
    p.profile = this.profile;
    p.userLogged = this._userLogged.email;
    if (this.profile === 'team-profile') {
      p.teamLeader = this.membersOfTeam[0].email;
      p.membersList = this.membersOfTeam.map((mt: any) => mt.email).join(',');
    }

    this.service.findJourneyAndFeedback(p).subscribe(
      {
        next: (response: any) => {
          this._docs = response.docs;
          this.buildWordCloudData();
          if (this.profile === 'user-profile')
            this.buildTotals();
        },
        error: this.showErrors.bind(this),
        complete: () => this.spinner.hide()
      }
    );
  }

  private buildTeamIndicators() {
    const indicatorFilterData = new MyJourneyAndFeedbackFilterData();
    const d = new Date();
    this.isLoadingIndicators = true;
    indicatorFilterData.startPeriod = `01/01/${d.getFullYear()}`;
    indicatorFilterData.endPeriod = `${d.getDate()}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    indicatorFilterData.organizationId = this._organizationId;
    indicatorFilterData.profile = 'team-leader';

    const p = Object.assign({}, indicatorFilterData);
    
    const [ startDay, startMonth, startYear ] = p.startPeriod.toString().split('/');
    p.startPeriod = this.datePipe.transform(new Date(+startYear, +startMonth, +startDay), 'yyyy-MM-dd');

    const [ endDay, endMonth, endYear ] = p.endPeriod.toString().split('/');
    p.endPeriod = this.datePipe.transform(new Date(+endYear, +endMonth - 1, Number(endDay) + 1), 'yyyy-MM-dd');

    this.service.findJourneyAndFeedback(p).subscribe(
      {
        next: (response: any) => {
          const indicatorsDocs = response.docs;
          this.membersOfTeam.forEach((member: any) => {
            if (member.name) {
              const particularDiary = indicatorsDocs.filter((id: any) => id.params.issuer === member.email && id.params.recipient === member.email) || [];
              const sentFeedbacks = indicatorsDocs.filter((id: any) => id.params.issuer === member.email && id.params.recipient !== member.email) || [];
              const receivedFeedbacks = indicatorsDocs.filter((id: any) => id.params.issuer !== member.email && id.params.recipient === member.email) || [];
              this.indicators.push(
                {
                  email: member.email,
                  name: member.name,
                  partDiary: particularDiary.length, 
                  sent: sentFeedbacks.length, 
                  received: receivedFeedbacks.length,
                  partDiaryColor: particularDiary.length === 0 ? 'red' : 'black',
                  sentColor: sentFeedbacks.length === 0 ? 'red' : 'black',
                  receivedColor: receivedFeedbacks.length === 0 ? 'red' : 'black'
                 });
            }
          });

          let propertyName = '';
          let object = null;
          let largerValue = 0;
          this.indicators.forEach((el: any) => {

            if (el.partDiary > largerValue) {
              largerValue = el.partDiary;
              object = el;
              propertyName = 'partDiaryColor';
            }

            if (el.sent > largerValue) {
              largerValue = el.sent;
              object = el;
              propertyName = 'sentColor';
            }

            if (el.received > largerValue) {
              largerValue = el.received;
              object = el;
              propertyName = 'receivedColor';
            }

            if (propertyName === null || propertyName === '') {
              largerValue = el.partDiary;
              object = el;
              propertyName = 'partDiaryColor';
            }
          });

          object[propertyName] = 'green';
          object['bold'] = 'bold';

        },

        error: this.showErrors.bind(this),
        complete: () => this.isLoadingIndicators = false
      }
    );
  }

  private showErrors(error: any) {
    this.spinner.hide();
    M.toast({ html: `Erro: ${error.message}`});
  }

  private buildWordCloudData() {
    this._docs.forEach((el: any) => {
      if (el.params.relatedSkills !== undefined) {
        el.params.relatedSkills.forEach((relSkills: string) => {
          const relSklTemp = this.wcData.find(it => it.name === relSkills);
          if (relSklTemp !== undefined) relSklTemp.weight++;
          else this.wcData.push({ name: relSkills, weight: 1 });
        });
      }
    });
    if (this._isReloadComponents) this.appWordCloud.reloadChart(this.wcData);
    this.buildCardList();
    this.buildRanking();
    this._isReloadComponents = false;
  }

  private buildRanking() {
    setTimeout(() => {
      const elArr = document.querySelectorAll('text.highcharts-point');
      this.rankingData = [];
      elArr.forEach((it: any) => {
        const object = this.wcData.find((wc: any) => wc.name === it.innerHTML);
        this.rankingData.push( {name: it.innerHTML, color: it.attributes.fill.value, weight: object.weight } );
      } );
    }, 500);
  }

  private buildCardList() {
    this.cards = this._docs.map(
      (el: any) => {
        el.letter = el.params.recipientName || 'D';
        el.messageTypeValue = MyJourneyAndFeedbackConstantsData.MESSAGE_TYPE[`${el.params.messageType}`];
        el.informationTypeValue = MyJourneyAndFeedbackConstantsData.INFORMATION_TYPE[`${el.params.informationType}`];
        return el;
      }
    )
  }

  private buildTotals() {
    const indicatorFilterData = new MyJourneyAndFeedbackFilterData();
    const d = new Date();
    this.isLoadingIndicators = true;
    indicatorFilterData.startPeriod = `01/01/${d.getFullYear()}`;
    indicatorFilterData.endPeriod = `${d.getDate()}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    indicatorFilterData.organizationId = this._organizationId;
    indicatorFilterData.userLogged = this._userLogged.email;
    indicatorFilterData.profile = 'my-profile';

    const p = Object.assign({}, indicatorFilterData);
    
    const [ startDay, startMonth, startYear ] = p.startPeriod.toString().split('/');
    p.startPeriod = this.datePipe.transform(new Date(+startYear, +startMonth - 1, +startDay), 'yyyy-MM-dd');

    const [ endDay, endMonth, endYear ] = p.endPeriod.toString().split('/');
    p.endPeriod = this.datePipe.transform(new Date(+endYear, +endMonth - 1, Number(endDay) + 1), 'yyyy-MM-dd');

    this.service.findJourneyAndFeedback(p).subscribe(
      {
        next: (response: any) => {
          const indicatorsDocs = response.docs;
          const totalDiary = indicatorsDocs.filter((id: any) => id.params.informationType === 2 && id.params.issuer === this._userLogged.email && id.params.recipient === this._userLogged.email) || [];
          const totalSent = indicatorsDocs.filter((id: any) => id.params.informationType === 4 && id.params.issuer === this._userLogged.email && id.params.recipient !== this._userLogged.email) || [];
          const totalReceived = indicatorsDocs.filter((id: any) => id.params.informationType === 4 && id.params.issuer !== this._userLogged.email && id.params.recipient === this._userLogged.email) || [];
          this.barsTotalData = { totalDiary: totalDiary.length, totalSent: totalSent.length, totalReceived: totalReceived.length };
          this.appBarsChart.reloadChart(this.barsTotalData);
        },
        error: this.showErrors.bind(this),
        complete: () => this.isLoadingIndicators = false
      }
    );
  }

  private getMembersOfOrganization() {
    this.service.findOrganizationById(this._organizationId).subscribe((el: any) => {
      this.membersOfOrganization = el.users.map((it: any) => {
        return {
          'label': it.name,
          'key': it.email
        }
      });
      this.membersOfOrganization.unshift({
        'label': '', 'key': ''
      });
    });
  }

  private initializeSelects(componentName: string) {
    setTimeout(() => {
      const selectElems = document.querySelector(`[name=${componentName}]`);
      M.FormSelect.init(selectElems, {});
    }, 0);
  }

  private getMembersOfTeam() {
    this.service.findApplicationsFromUser().subscribe((app: any) => {
      const applicationObject = app.applicationList.find((appList: any) => appList._id === this._assessmentId);
      this.membersOfTeam = applicationObject.team.members;
      this.membersOfTeamCombo = applicationObject.team.members
        .filter((mm: any) => mm.name !== undefined)
        .map((object: any) => { return { key: object.email, label: object.name }});
      this.buildTeamIndicators();
      this.loadData();
    })
  }

}
