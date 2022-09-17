import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  totalReceived: number;
  totalSent: number;
  totalDiary: number;
  messageTypeFilter: { acknowledgment: boolean, development: boolean };
  viewControl: { recipient: boolean, issuer: boolean };
  membersOfOrganization: Array<any>;
  membersOfTeam: Array<any>;
  membersOfTeamCombo: Array<any>;

  @ViewChild('periodStart') periodStart: NgbInputDatepicker;
  @ViewChild('periodEnd') periodEnd: NgbInputDatepicker;
  @ViewChild('appWordCloud') appWordCloud: WordCloudComponent;

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
    this.data = [];
    this.wcData = [];
    this.rankingData = [];
    this.compentencesList = [];
    this.membersOfTeamCombo = [];
    this.totalReceived = 0;
    this.totalSent = 0;
    this.totalDiary = 0;
    this.viewControl = { recipient: false, issuer: false };
    this.messageTypeFilter = { acknowledgment: true, development: true };
    this._organizationId = this.cookie.get('ORGANIZATIONID');
    this._isReloadComponents = false;
    this.profile = this.route.snapshot.params.profile;
    this._assessmentId = this.route.snapshot.params.assessmentId;
  }

  ngOnInit() {
    this.wcData = [];
    this.rankingData = [];
    this.cards = [];
    this.data = [];
    this._docs = [];
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

  onSelectInformationType(value: string) {
    if (value === '2' || value === '5') {
      if(this.profile === 'user-profile') {
        this.viewControl.recipient = false;
        this.filter.recipient = this._userLogged.email;
      } else {
        this.viewControl.issuer = true;
        this.viewControl.recipient = true;
        this.filter.recipient = '';
        this.filter.issuer = '';
        this.initializeSelects('membersOfOrganizationName');
        this.initializeSelects('membersOfTeamName');
      }
    } else if (value === '3') {
      this.viewControl.issuer = false;
      this.viewControl.recipient = true;
      this.filter.issuer = this._userLogged.email;
      this.initializeSelects('membersOfOrganizationName');
    } else if (value === '4') {
      if(this.profile === 'user-profile') {
        this.viewControl.recipient = true;
        this.filter.recipient = '';
        this.filter.issuer = this._userLogged.email;
        this.initializeSelects('membersOfOrganizationName');
      } else {
        this.viewControl.issuer = true;
        this.viewControl.recipient = true;
        this.filter.recipient = '';
        this.filter.issuer = '';
        this.initializeSelects('membersOfOrganizationName');
        this.initializeSelects('membersOfTeamName');
      }
    }
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

  ngAfterViewInit(): void {
    this.loadComponents();
    this.getCompetences();
  }

  onBack() {
    this.router.navigate(['dashboard-v2']);
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
    this.totalReceived = 0;
    this.totalSent = 0;
    this.totalDiary = 0;
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
          this.buildTotals();
        },
        error: this.showErrors.bind(this),
        complete: () => this.spinner.hide()
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
    this._docs.forEach((el: any) => {
      if (el.params.informationType === 2) {
        this.totalDiary++;
      } else if (el.email === this._userLogged.email) {
        this.totalSent++;
      } else if (el.params.recipient === this._userLogged.email) {
        this.totalReceived++;
      }
    });
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
    if (this.profile === 'team-profile') {
      this.service.findApplicationsFromUser().subscribe((app: any) => {
        const applicationObject = app.applicationList.find((appList: any) => appList._id === this._assessmentId);
        this.membersOfTeam = applicationObject.team.members;
        this.membersOfTeamCombo = applicationObject.team.members
          .filter((mm: any) => mm.name !== undefined)
          .map((object: any) => { return { key: object.email, label: object.name }});
        this.loadData();
      })
    } else {
      this.loadData();
    }
  }

}
