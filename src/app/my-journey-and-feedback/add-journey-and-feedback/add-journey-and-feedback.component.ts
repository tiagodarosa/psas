import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';
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
  membersOfTeam: Array<{label: string, key: string}>;
  membersOfOrganization: Array<{label: string, key: string}>;
  isTeamLeader: boolean;
  utilizationDateInstance: any;
  selectsInstances: Array<any>;

  private _organizationId: string;
  private _userLogged: SocialUser;

  constructor(private router: Router,
              private cookie: CookieService,
              private spinner: NgxSpinnerService,
              private authService: AuthService,
              private service: ServicesService) {
    this.compentencesList = [];
    this.selectsInstances = [];
    this.membersOfTeam = [];
    this.isTeamLeader = false;
    this.model = { 'informationType': '2', 'recipient': '' };
    this._organizationId = this.cookie.get('ORGANIZATIONID');
  }

  ngOnInit() {
    this.authService.authState.subscribe((response: SocialUser) => {
      this._userLogged = response;
      this.model.recipient = this._userLogged.email;
      this.verifyIfTeamLeader();
    });
  }

  ngAfterViewInit(): void {
      this.loadComponents();
      this.getCompetences();
      this.getMembersOfTeam();
      this.getMembersOfOrganization();
  }

  back() {
    this.router.navigate(['my-journey-and-feedback']);
  }

  onSave() {
    if (this.utilizationDateInstance.toString() === undefined || this.utilizationDateInstance.toString() === null || this.utilizationDateInstance.toString() === '')
      return;

    this.spinner.show();
    const data = new MyJourneyAndFeedbackData();
    data.informationType = Number(this.model.informationType);
    data.recipient = this.model.recipient;
    data.recipientName = this.membersOfOrganization.find((mo: any) => mo.key === this.model.recipient).label || 'Não identificado';
    data.keepAnonymous = this.model.keepAnonymous || false;
    data.shareToTeamLeader = this.model.shareToTeamLeader || false;
    data.message = this.model.message;
    data.messageType = this.model.messageType;
    data.organizationId = this._organizationId;
    data.issuer = this._userLogged.email;
    data.issuerPhotoUrl = this._userLogged.photoUrl;
    data.issuerName = this._userLogged.name;
    data.relatedSkills = this.getComponentInstance(this.selectsInstances, 'relatedSkillsField').getSelectedValues()
      .map((el: string) => el.split(':')[1].replace('\'', '').replace('\'', '').trim());
    data.utilizationDate = new Date();

    this.service.addJourneyAndFeedback(data)
      .subscribe({
        next: (response: any) => {
          M.toast({ html: 'Registro inserido com sucesso!' });
          this.back();
        },
        error: this.showErrors.bind(this),
        complete: () => this.spinner.hide()
      }
    );
    this.spinner.hide()
  }
 
  onChangeInformationType() {
    setTimeout(() => {
      this.model.recipient = '';
      if (this.model.informationType === '2') {
        this.model.recipient = this._userLogged.email;
      }
    }, 0);
  }

  getMessageHelp(): string {
    return `Sugestões para estruturar a mensagem para a comunicação ser completa:<br/> Informe a data do incidente.<br/> Informe qual projeto ou contexto.<br/> Informe se houve indicadores impactados, quais e valores.<br/> Qual o comportamento percebido?<br/> Qual o impacto com o comportamento?<br/> Qual comportamento era esperado? <br/> Sugira melhorias na atitude.`;
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
          this.initializeSelects('relatedSkillsField');
        }
      }
    );
  }

  private getMembersOfTeam() {
    this.service.findTeamsFromUser().subscribe((r: any) => {
      r.teams.forEach((team: any) => {
        team.members.forEach((member: any) => {
          if (member.name)
            this.membersOfTeam.push({ 'label': member.name, 'key': member.email });
        })
      });
      this.membersOfTeam.unshift({
        'label': '', 'key': ''
      });
      setTimeout(() => this.initializeSelects('membersOfTeamName'), 500);
    });
  }

  private getMembersOfTeam_() {

    this.service.findProjectsFromUser().subscribe((response: any) => {
      response.projects.forEach((el:any) => {
        if (el.organizationId === this._organizationId) {
          this.service.findTeamsFromUser().subscribe((r: any) => {
            const team = r.teams.find((it: any) => it.projectId === el._id);
            this.membersOfTeam = team.members.map((member: any) => {
              const user = this.membersOfOrganization.find(it => it.key === member.email);
              return {
                'label': user.label, 'key': member.email
              }
            });
            this.membersOfTeam.unshift({
              'label': '', 'key': ''
            });
            this.initializeSelects('membersOfTeamName');
          })
        }
      })
    });

  }

  private initializeSelects(componentName: string) {
    setTimeout(() => {
      const selectElems = document.querySelector(`[name=${componentName}]`);
      this.selectsInstances.push(M.FormSelect.init(selectElems, {}));
    }, 0);
  }

  private getMembersOfOrganization() {
    this.service.findOrganizationById(this._organizationId).subscribe((el: any) => {
      this.membersOfOrganization = el.users.map(it => {
        return {
          'label': it.name,
          'key': it.email
        }
      });
      this.membersOfOrganization.unshift({
        'label': '', 'key': ''
      });
      this.initializeSelects('membersOfOrganizationName');
    });
  }

  private verifyIfTeamLeader() {
    this.service.findOrganizationById(this._organizationId).subscribe(
      {
        next: (response: any) => {
          const userObject = response.users.find((u: any) => u.email === this._userLogged.email);
          this.isTeamLeader = userObject.profile !== 'organizationMember';
        }
      }
    )
  }

}
