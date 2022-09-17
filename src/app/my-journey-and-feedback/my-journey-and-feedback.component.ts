import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'angularx-social-login';
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
  modalInstance: any;
  informationTypeFilter: { particularDiary: boolean, teamDiary: boolean, sendedFeedbacks: boolean, receivedFeedbacks: boolean };
  messageTypeFilter: { acknowledgment: boolean, development: boolean };

  @ViewChild('periodStart') periodStart: NgbInputDatepicker;
  @ViewChild('periodEnd') periodEnd: NgbInputDatepicker;

  private _organizationId: string;
  private _userLogged: any;
  private _deleteIdCache: string;
  private _deleteRevCache: string;

  constructor(private router: Router,
              private datePipe: DatePipe,
              private cookie: CookieService,
              private spinner: NgxSpinnerService,
              private authService: AuthService,
              private service: ServicesService) {
    this.relatedSkillsInstance = [];
    this.filter = new MyJourneyAndFeedbackFilterData();
    this.informationTypeFilter = { particularDiary: true, teamDiary: true, sendedFeedbacks: true, receivedFeedbacks: true };
    this.messageTypeFilter = { acknowledgment: true, development: true };
    this.data = [];
    this.compentencesList = [];
    this._organizationId = this.cookie.get('ORGANIZATIONID');
  }
  
  ngOnInit() {
    this.spinner.show();
    this.authService.authState.subscribe(
      {
        next: (user) => {
          this._userLogged = user;
          this.loadData();
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

  onAddData() {
    this.router.navigate(['add-journey-and-feedback']);
  }

  onSearch() {
    const startPeriodElem: any = this.getComponentInstance(this.dateFildsInstances, 'startPeriod');
    this.filter.startPeriod = startPeriodElem.el.value;

    const endPeriodElem: any = this.getComponentInstance(this.dateFildsInstances, 'endPeriod');
    this.filter.endPeriod = endPeriodElem.el.value;

    const relatedSkillsTempInstance = this.filter.relatedSkills = this.getComponentInstance(this.relatedSkillsInstance, 'relatedSkillsField');
    
    if (relatedSkillsTempInstance !== undefined)
      this.filter.relatedSkills = relatedSkillsTempInstance.getSelectedValues().map((el: string) => el.split(':')[1].replace('\'', '').replace('\'', '').trim());

    this.loadData();
  }

  onConfirmDelete() {
    this.service.deleteJourneyAndFeedback(this._deleteIdCache, this._deleteRevCache).subscribe(
      {
        next: () => {
          this.data = []; 
          this.onSearch();
          this._deleteIdCache = '';
          this._deleteRevCache = '';
          M.toast({ html: 'Registro removido com sucesso!' });
        }
      }
    )
  }

  onCancelDelete() {
    this._deleteIdCache = '';
    this._deleteRevCache = '';
    const instance = M.Modal.getInstance(document.getElementById('exclusionMessageModal'))
    instance.close();
  }

  onEdit(id: string, revision: string) {
    throw new Error('Implementar a funcionalidade!');
  }

  onDelete(id: string, revision: string) {
    this._deleteIdCache = id;
    this._deleteRevCache = revision;
    const instance = M.Modal.getInstance(document.getElementById('exclusionMessageModal'))
    instance.open();
  }

  private loadData() {
    this.spinner.show();
    const p = Object.assign({}, this.filter);

    const [ startDay, startMonth, startYear ] = p.startPeriod.toString().split('/');
    p.startPeriod = this.datePipe.transform(new Date(+startYear, +startMonth, +startDay), 'yyyy-MM-dd');

    const [ endDay, endMonth, endYear ] = p.endPeriod.toString().split('/');
    p.endPeriod = this.datePipe.transform(new Date(+endYear, +endMonth, Number(endDay) + 1), 'yyyy-MM-dd');
    
    p.userLogged = this._userLogged.email;
    p.organizationId = this._organizationId;

    const informationTypeArr = [];
    if (this.informationTypeFilter.particularDiary) informationTypeArr.push(2);
    if (this.informationTypeFilter.teamDiary) informationTypeArr.push(3);
    if (this.informationTypeFilter.sendedFeedbacks) informationTypeArr.push(4);
    if (this.informationTypeFilter.receivedFeedbacks) informationTypeArr.push(5);
    p.informationType = informationTypeArr.join(',');
    
    const messageTypeArr = [];
    if (this.messageTypeFilter.acknowledgment) messageTypeArr.push(1);
    if (this.messageTypeFilter.development) messageTypeArr.push(2);
    p.messageType = messageTypeArr.join(',');

    this.service.findJourneyAndFeedback(p).subscribe(
      {
        next: (response: any) => {
          this.data = response.docs.map((el: any) => {
            const databaseObject = el.params;
            return {
              'id': el._id,
              'rev': el._rev,
              'utilizationDate': this.datePipe.transform(new Date(databaseObject.utilizationDate), 'dd/MM/yyyy'),
              'type': MyJourneyAndFeedbackConstantsData.INFORMATION_TYPE[`${databaseObject.informationType}`],
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
    return instance.find((comp: any) => {
      return String(comp.el.name).indexOf(componentName) >= 0
    });
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

    const elems = document.querySelectorAll('.modal');
    this.modalInstance = M.Modal.init(elems, {});
  }

  private getCompetences() {
    this.service.findOrganizationById(this._organizationId).subscribe(
      {
        next: (response: any) => {
          this.compentencesList.push({ key: 'todos', label: 'Todos' });
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
