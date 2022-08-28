import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from '../services.service';
import CompetenceData from '../shared/data/compentende.data';
import MyJourneyAndFeedbackConstantsData from '../shared/data/my-journey-and-feedback-constants.data';
import MyJourneyAndFeedbackFilterData from '../shared/data/my-journey-and-feedback-filter-data';
import PickersConstants from '../shared/materialize/i18n/pickers.constants';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-my-journey-and-feedback',
  templateUrl: './my-journey-and-feedback.component.html',
  styleUrls: ['./my-journey-and-feedback.component.css']
})
export class MyJourneyAndFeedbackComponent implements OnInit, AfterViewInit {

  periodStartValue: NgbDateStruct;
  periodEndValue: NgbDateStruct;
  compentencesList: Array<{label: string, key: string}>;
  relatedSkillsInstance: any;
  dateFildsInstances: any;
  data: Array<CompetenceData>;
  filter: MyJourneyAndFeedbackFilterData;

  @ViewChild('periodStart') periodStart: NgbInputDatepicker;
  @ViewChild('periodEnd') periodEnd: NgbInputDatepicker;

  private _organizationId: string;

  constructor(private router: Router,
              private datePipe: DatePipe,
              private cookie: CookieService,
              private spinner: NgxSpinnerService,
              private service: ServicesService) {
    this.relatedSkillsInstance = [];
    this.filter = new MyJourneyAndFeedbackFilterData();
    this.data = [];
    this.compentencesList = [];
    this._organizationId = this.cookie.get('ORGANIZATIONID');
  }
  
  ngOnInit() {
    this.loadUsers();
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.loadComponents();
    this.getCompetences();
  }

  onAddData() {
    this.router.navigate(['add-journey-and-feedback']);
  }

  onSearch() {
    const [ startDay, startMonth, startYear] = this.getComponentInstance(this.dateFildsInstances, 'startPeriod').toString().split('/');
    this.filter.startPeriod = new Date(+startYear, +startMonth - 1, +startDay).toISOString();

    const [ endDay, endMonth, endYear] = this.getComponentInstance(this.dateFildsInstances, 'endPeriod').toString().split('/');
    this.filter.endPeriod = new Date(+endYear, +endMonth - 1, +endDay).toISOString();

    const relatedSkillsTempInstance =  this.filter.relatedSkills = this.getComponentInstance(this.relatedSkillsInstance, 'relatedSkillsField')
    
    if (relatedSkillsTempInstance !== undefined)
      this.filter.relatedSkills = relatedSkillsTempInstance.getSelectedValues().map((el: string) => el.split(':')[1].replace('\'', '').replace('\'', '').trim());

    this.loadData();
  }

  private loadData() {
    this.spinner.show();
    this.service.findJourneyAndFeedback(this.filter).subscribe(
      {
        next: (response: any) => {
          this.data = response.docs.map((el: any) => {
            const databaseObject = el.params;
            return {
              'utilizationDate': this.datePipe.transform(new Date(databaseObject.utilizationDate), 'dd/MM/yyyy'),
              'type': databaseObject.informationType,
              'recipient': databaseObject.recipient,
              'author': el.name,
              'messageMotive': MyJourneyAndFeedbackConstantsData.MESSAGE_TYPE[`${databaseObject.messageType}`],
              'competences': databaseObject.relatedSkills.join(',')
            }
          });
        },
        error: this.showErrors.bind(this),
        complete: () => this.spinner.hide()
      }
    );

  }

  private getComponentInstance(instance: Array<any>, componentName: string) {
    return instance.find((comp: any) => comp.el.name === componentName) || [];
  }

  private showErrors(error: any) {
    this.spinner.hide();
    M.toast({ html: `Erro: ${error.message}`});
  }

  private loadComponents() {
    
    const datePickersElems = document.querySelectorAll('.datepicker');
    this.dateFildsInstances = M.Datepicker.init(datePickersElems, { format: 'dd/mm/yyyy', i18n: PickersConstants.BR_OPTIONS });

    $(document).ready(function(){
      $('.tooltipped').tooltip();
    });

    $('.collapsible').collapsible();
  }

  private loadUsers() {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.autocomplete');
      M.Autocomplete.init(elems, {
        data: {
          "Apple": null,
          "Microsoft": null,
          "Google": 'https://placehold.it/250x250'
        }
      });
    });
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

}
