import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;


@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css']
})
export class OrganizationDetailsComponent implements OnInit {

  organizationId = '';
  organization = {
    _rev: '',
    name: '',
    users: [],
    competences: [],
    status: ''
  };
  username = '';
  email = '';

  competenceTypes = [
    {value: 'knowledge', description: 'Conhecimento'},
    {value: 'ability', description: 'Habilidade'},
    {value: 'attitude', description: 'Atitude'}
  ];

  userProfiles = [
    {value: 'organizationManager', description: 'Gerente da organização'},
    {value: 'projectManager', description: 'Gerente de projetos'},
    {value: 'teamManager', description: 'Gerente de equipes'},
    {value: 'organizationMember', description: 'Membro da organização'}
  ];

  userStatus = [
    {value: 'active', description: 'Ativo'},
    {value: 'inactive', description: 'Inativo'},
    {value: 'deleted', description: 'Excluído'}
  ];

  constructor(
    private route: ActivatedRoute,
    private service: ServicesService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      this.organizationId = params.get('organizationId');
      this.refresh();
    });
  }

  refresh() {
    this.service.findOrganizationById(this.organizationId).subscribe((data) => {
      const result = Object(data);
      this.organization.competences = result.competences || [];
      this.organization._rev = result._rev;
      this.organization.name = result.name || '';
      this.organization.users = result.users || [];
      this.organization.status = result.status || 'active';
      this.spinner.hide();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  editOrganizationModal() {
    $('.modal').modal();
    $('.deleteOrganization').modal('open');
  }

  updateOrganization(orgName: string) {
    this.spinner.show();
    const org = {
      _id: this.organizationId,
      _rev: this.organization._rev,
      name: orgName,
      users: this.organization.users,
      competences: this.organization.competences,
      status: this.organization.status
    };
    this.service.updateOrganization(org).subscribe((data) => {
      this.refresh();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  addUserModal() {
    $('.modal').modal();
    $('select').formSelect();
    $('.addUser').modal('open');
  }

  filterUserProfile(profile: string) {
    try  {
      return this.userProfiles.find(userProfile => userProfile.value === profile).description;
    } catch {
      return profile;
    }
  }

  filterUserStatus(status: string) {
    try  {
      return this.userStatus.find(st => st.value === status).description;
    } catch {
      return status;
    }
  }

  addUser(userName: string, userEmail: string, userProfile: string) {
    this.spinner.show();
    const user = {
      name: userName,
      email: userEmail,
      profile: userProfile,
      status: 'active'
    };
    this.organization.users.push(user);
    this.updateOrganization(this.organization.name);
  }

  deleteUserModal(userName: string, userEmail: string) {
    this.username = userName;
    this.email = userEmail;
    $('.modal').modal();
    $('.deleteUser').modal('open');
  }

  deleteUser(userEmail: string) {
    this.spinner.show();
    let tempUser = this.organization.users.find(user => user.email === userEmail);
    console.log(tempUser);
    const index = this.organization.users.indexOf(tempUser);
    console.log(index);
    tempUser.status = 'deleted';
    this.organization.users.splice(index, 1);
    this.organization.users.push(tempUser);
    console.log(this.organization);
    this.updateOrganization(this.organization.name);
  }

  addCompetenceModal() {
    $('.modal').modal();
    $('select').formSelect();
    $('.addCompetence').modal('open');
  }

  filterCompetenceType(competenceType: string) {
    return this.competenceTypes.find(competence => competence.value === competenceType).description;
  }

  addCompetence(competenceName: string, competenceType: string, competenceDescription: string) {
    this.spinner.show();
    const competence = {
      name: competenceName,
      type: competenceType,
      description: competenceDescription
    };
    this.organization.competences.push(competence);
    this.updateOrganization(this.organization.name);
  }

}
