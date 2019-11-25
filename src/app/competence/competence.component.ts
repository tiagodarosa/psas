import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.css']
})
export class CompetenceComponent implements OnInit {

  userEmail = '';
  userProfile = '';
  competences = [];
  competenceName = '';
  competenceNameEdit2 = '';
  competenceType = '';
  competenceTypeEdit2 = '';
  competenceDescription = '';
  competenceDescriptionEdit2 = '';
  organization = {
    _rev: '',
    name: '',
    users: [],
    competences: [],
    status: ''
  };
  competenceTypes = [
    { value: 'knowledge', description: 'Conhecimento' },
    { value: 'ability', description: 'Habilidade' },
    { value: 'attitude', description: 'Atitude' }
  ];

  constructor(
    private authService: AuthService,
    public service: ServicesService,
    private router: Router,
    private cookie: CookieService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.authService.authState.subscribe((user) => {
      this.userEmail = user.email;
      this.getCompetences();
    });
  }

  getCompetences() {
    const organizationId = this.cookie.get('ORGANIZATIONID');
    this.service.findOrganizationById(organizationId).subscribe((data) => {
      this.organization = Object(data);
      this.userProfile = this.getUserProfile(this.organization);
      this.competences = this.organization.competences || [];
      console.log(this.organization);
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }

  getUserProfile(organization) {
    const users = organization.users;
    const user = users.find(u => u.email === this.userEmail);
    if (user) {
      return user.profile;
    } else {
      return '';
    }
  }

  addCompetenceModal() {
    $('.modal').modal();
    $('select').formSelect();
    $('.addCompetence').modal('open');
  }

  editCompetenceModal(competenceName: string) {
    const comp = this.competences.find(c => c.name === competenceName);
    this.competenceNameEdit2 = competenceName;
    this.competenceTypeEdit2 = comp.type;
    this.competenceDescriptionEdit2 = comp.description;
    $('select').formSelect();
    M.updateTextFields();
    $('.modal').modal();
    $('select').formSelect();
    M.updateTextFields();
    $('.modal').modal();
    $('.editCompetence').modal();
    $('.editCompetence').modal('open');
  }

  filterCompetenceType(competenceType: string) {
    return this.competenceTypes.find(competence => competence.value === competenceType).description;
  }

  addCompetence(competenceName: string, competenceType: string, competenceDescription: string) {
    if (competenceName === '' || competenceType === '' || competenceDescription === '') {
      M.toast({html: `Você deve preencher todos os campos obrigatórios.`});
    } else {
      const comp = this.organization.competences.find(c => c.name === competenceName);
      if (comp) {
        M.toast({html: `Já existe uma competência cadastrada com o nome '${competenceName}'.`});
      } else {
        this.spinner.show();
        const competence = {
          name: competenceName,
          type: competenceType,
          description: competenceDescription
        };
        this.organization.competences.push(competence);
        this.service.updateOrganization(this.organization).subscribe((data) => {
          this.getCompetences();
        }, (error) => {
          this.router.navigate(['home']);
        });
      }
    }
  }

  editCompetence(competenceName: string, competenceType: string, competenceDescription: string) {
    if (competenceName === '' || competenceType === '' || competenceDescription === '') {
      M.toast({html: `Você deve preencher todos os campos obrigatórios.`});
    } else {
      const comp = this.organization.competences.find(c => c.name === this.competenceNameEdit2);
      if (comp) {
        M.toast({html: `Já existe uma competência cadastrada com o nome '${competenceName}'.`});
      } else {
        this.spinner.show();
        const competence = {
          name: competenceName,
          type: competenceType,
          description: competenceDescription
        };
        this.organization.competences.push(competence);
        this.service.updateOrganization(this.organization).subscribe((data) => {
          this.getCompetences();
        }, (error) => {
          this.router.navigate(['home']);
        });
      }
    }
  }

  deleteCompetenceModal(competenceName: string) {
    this.competenceName = competenceName;
    $('.modal').modal();
    $('select').formSelect();
    $('.deleteCompetence').modal('open');
  }

  deleteCompetence() {
    const comp = this.organization.competences.find(c => c.name === this.competenceName);
    if (comp) {
      this.spinner.show();
      for (let i = 0; i < this.organization.competences.length; i++) {
        if (this.organization.competences[i].name === this.competenceName) {
          this.organization.competences.splice(i, 1);
          break;
        }
      }
      this.service.updateOrganization(this.organization).subscribe((data) => {
        this.getCompetences();
      }, (error) => {
        this.router.navigate(['home']);
      });
    } else {
      M.toast({html: `Ocorreu algum erro ao excluir a competência.`});
    }
  }

}
