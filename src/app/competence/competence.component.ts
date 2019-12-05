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
  competenceType = '';
  competenceDescription = '';
  temporaryName = '';
  organization = {
    _rev: '',
    name: '',
    users: [],
    competences: [],
    status: ''
  };
  organizationId = '';
  organizationName = '';
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
    this.organizationId = this.cookie.get('ORGANIZATIONID');
    this.organizationName = this.cookie.get('ORGANIZATIONNAME');
    this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
    this.authService.authState.subscribe((user) => {
      this.userEmail = user.email;
      this.getCompetences();
    });
  }

  getCompetences() {
    this.service.findOrganizationById(this.organizationId).subscribe((data) => {
      this.organization = Object(data);
      this.competences = this.organization.competences || [];
      this.competences.sort(this.compare);
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }

  compare(a, b) {
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

  addCompetenceModal() {
    $('.modal').modal();
    $('select').formSelect();
    $('.addCompetence').modal('open');
  }

  editCompetenceModal(competenceName: string) {
    const comp = this.competences.find(c => c.name === competenceName);
    this.temporaryName = competenceName;
    $('#competenceNameEdit').val(competenceName);
    $('#competenceTypeEdit').val(comp.type);
    $('#competenceDescriptionEdit').val(comp.description);
    $('.modal').modal();
    $('select').formSelect();
    $('.editCompetence').modal('open');
    M.updateTextFields();
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
          this.competences = this.organization.competences;
          this.competences.sort(this.compare);
          this.spinner.hide();
          M.toast({html: 'Competência adicionada com sucesso!'});
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
      const comp = this.organization.competences.find(c => c.name === this.temporaryName);
      if (comp) {
        this.spinner.show();
        this.organization.competences = this.organization.competences.filter(c => c.name !== this.temporaryName);
        const competence = {
          name: competenceName,
          type: competenceType,
          description: competenceDescription
        };
        this.organization.competences.push(competence);
        this.service.updateOrganization(this.organization).subscribe((data) => {
          this.competences = this.organization.competences;
          this.competences.sort(this.compare);
          this.temporaryName = '';
          this.spinner.hide();
          M.toast({html: 'Competência atualizada com sucesso!'});
        }, (error) => {
          this.router.navigate(['home']);
        });
      } else {
        M.toast({html: `Ocorreu algum erro. Por favor, tente novamente!`});
      }
    }
  }

  deleteCompetenceModal(competenceName: string) {
    this.temporaryName = competenceName;
    $('.modal').modal();
    $('select').formSelect();
    $('.deleteCompetence').modal('open');
  }

  deleteCompetence() {
    const comp = this.organization.competences.find(c => c.name === this.temporaryName);
    if (comp) {
      this.spinner.show();
      this.organization.competences = this.organization.competences.filter(c => c.name !== this.temporaryName);
      this.service.updateOrganization(this.organization).subscribe((data) => {
        this.competences = this.organization.competences;
        this.competences.sort(this.compare);
        this.temporaryName = '';
        this.spinner.hide();
        M.toast({html: 'Competência excluída com sucesso!'});
      }, (error) => {
        this.router.navigate(['home']);
      });
    } else {
      M.toast({html: `Ocorreu algum erro ao excluir a competência.`});
    }
  }

}
