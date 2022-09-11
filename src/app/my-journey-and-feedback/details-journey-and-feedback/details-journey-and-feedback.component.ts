import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
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

  @ViewChild('periodStart') periodStart: NgbInputDatepicker;
  @ViewChild('periodEnd') periodEnd: NgbInputDatepicker;
  @ViewChild('appWordCloud') appWordCloud: WordCloudComponent;

  private _organizationId: string;
  private _docs: Array<any>;
  private _isReloadComponents: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private cookie: CookieService,
              private spinner: NgxSpinnerService,
              private service: ServicesService) {
    this.relatedSkillsInstance = [];
    this.filter = new MyJourneyAndFeedbackFilterData();
    this.data = [];
    this.wcData = [];
    this.rankingData = [];
    this.compentencesList = [];
    this._organizationId = this.cookie.get('ORGANIZATIONID');
    this._isReloadComponents = false;
    this.profile = this.route.snapshot.params.profile;
  }

  ngOnInit() {
    this.wcData = [];
    this.rankingData = [];
    this.cards = [];
    this.data = [];
    this._docs = [];
    this.loadData();
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
    const p = Object.assign({}, this.filter);
    const [ startDay, startMonth, startYear ] = p.startPeriod.toString().split('/');
    p.startPeriod = this.datePipe.transform(new Date(+startYear, +startMonth - 1, +startDay), 'yyyy-MM-dd');

    const [ endDay, endMonth, endYear ] = p.endPeriod.toString().split('/');
    p.endPeriod = this.datePipe.transform(new Date(+endYear, +endMonth - 1, +endDay), 'yyyy-MM-dd');
    
    this.service.findJourneyAndFeedback(p).subscribe(
      {
        next: (response: any) => {
          this.wcData = [];
          this._docs = response.docs;
          this.buildWordCloudData();
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
        el.params.relatedSkills.forEach((el:string) => {
          const relSklTemp = this.wcData.find(it => it.name === el);
          if (relSklTemp !== undefined) relSklTemp.weight++;
          else this.wcData.push({ name: el, weight: 1 });
        });
        if (this._isReloadComponents) this.appWordCloud.reloadChart(this.wcData);
        this.buildRanking();
        this.buildMessageRanking();
        this.buildCardList();
        this._isReloadComponents = false;
      }
    });
  }

  private buildRanking() {
    setTimeout(() => {
      const elArr = document.querySelectorAll('text.highcharts-point');
      this.rankingData = this.wcData.sort((a, b) => b - a).map(
        (el: any) => {
          elArr.forEach((it: any) => {
            if (it.innerHTML === el.name)
              el['color'] = it.attributes.fill.value;
          })
          return el;
        }
      );
    }, 1000);
  }

  private buildMessageRanking() {

  }

  private buildCardList() {
    this.cards = this._docs.map(
      (el: any) => {
        el.messageTypeValue = MyJourneyAndFeedbackConstantsData.MESSAGE_TYPE[`${el.params.messageType}`];
        el.informationTypeValue = MyJourneyAndFeedbackConstantsData.INFORMATION_TYPE[`${el.params.informationType}`];
        return el;
      }
    )
  }

}
