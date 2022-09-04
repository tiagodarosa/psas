import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from 'src/app/services.service';
import MyJourneyAndFeedbackData from 'src/app/shared/data/my-journey-and-feedback-data';
import PickersConstants from 'src/app/shared/materialize/i18n/pickers.constants';

declare var M: any; 

@Component({
  selector: 'app-add-journey-and-feedback',
  templateUrl: './add-journey-and-feedback.component.html',
  styleUrls: ['./add-journey-and-feedback.component.css']
})
export class AddJourneyAndFeedbackComponent implements OnInit, AfterViewInit {

  model: any;
  compentencesList: Array<{label: string, key: string}>;
  utilizationDateInstance: any;
  relatedSkillsInstance: any;

  private _organizationId: string;

  constructor(private router: Router,
              private cookie: CookieService,
              private spinner: NgxSpinnerService,
              private service: ServicesService) {
    this.compentencesList = [];
    this.model = {};
    this._organizationId = this.cookie.get('ORGANIZATIONID');
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
      this.loadComponents();
      this.getCompetences();
  }

  back() {
    this.router.navigate(['my-journey-and-feedback']);
  }

  onSave() {
    if (this.utilizationDateInstance.toString() === undefined || this.utilizationDateInstance.toString() === null || this.utilizationDateInstance.toString() === '')
      return;

    this.spinner.show();
    const data = new MyJourneyAndFeedbackData();
    data.informationType = this.model.informationType;
    data.keepAnonymous = this.model.keepAnonymous || false;
    data.shareToTeamLeader = this.model.shareToTeamLeader || false;
    data.message = this.model.message;
    data.messageType = this.model.messageType;
    data.recipient = this.model.recipient;
    data.relatedSkills = this.getComponentInstance(this.relatedSkillsInstance, 'relatedSkillsField').getSelectedValues()
      .map((el: string) => el.split(':')[1].replace('\'', '').replace('\'', '').trim());
    const [ day, month, year] = this.getComponentInstance(this.utilizationDateInstance, 'utilizationDateField').toString().split('/');
    data.utilizationDate = new Date(+year, +month - 1, +day);

    this.service.addJourneyAndFeedback(data)
      .subscribe({
        next: (response: any) => {
          M.toast({ html: 'Registro inserido com sucesso!' });
          this.back();
        },
        error: this.showErrors.bind(this),
        complete: () => this.spinner.hide()
      });
  }

  private showErrors(error: any) {
    this.spinner.hide();
    M.toast({ html: `Erro: ${error.message}`});
  }

  private getComponentInstance(instance: Array<any>, componentName: string) {
    return instance.find((comp: any) => comp.el.name === componentName);
  }

  private loadComponents() {
    const datePickersElems = document.querySelectorAll('.datepicker');
    this.utilizationDateInstance = M.Datepicker.init(datePickersElems, { format: 'dd/mm/yyyy', i18n: PickersConstants.BR_OPTIONS });
    
    const ttElems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(ttElems, {});
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
