import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from '../services.service';
import { AuthService, SocialUser } from 'angularx-social-login';
declare var $: any;

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizations = {};
  organizationsCount = 0;
  organizationsList = [];
  organizationId = '';
  organizationName = '';
  organizationUsers = [];
  organizationCompetences = [];
  email = '';
  user: SocialUser;

  constructor(private authService: AuthService, public service: ServicesService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.email = user.email;
    });
    this.getOrganizations();
    $('select').formSelect();
    $('.modal').modal();
  }

  findOrganizationById(id: string) {
    this.service.findOrganizationById(id).subscribe((data) => {
      console.log(data);
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }

  getOrganizations() {
    this.service.findOrganizationsFromUser().subscribe((data) => {
      this.organizations = Object(data);
      this.organizationsCount = Object(this.organizations).count;
      this.organizationsList = Object(this.organizations).organizationList;
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }

  deleteOrganizationModal(organizationId: string) {
    const organization = this.organizationsList.find(org => org._id === organizationId);
    this.organizationId = organizationId;
    this.organizationName = organization.name;
    $('.modal').modal();
    $('.deleteOrganization').modal('open');
  }

  deleteOrganization(id: string) {
    this.spinner.show();
    this.service.deleteOrganization(id).subscribe((data) => {
      this.getOrganizations();
    }, (error) => {
      console.log('ohoh, mostrar mensagem de erro pro usuario');
      this.spinner.hide();
    });
  }

  addOrganizationModal() {
    this.organizationName = '';
    $('.modal').modal();
    $('.newOrganization').modal('open');
  }

  addOrganization(name: string) {
    this.spinner.show();
    this.service.addOrganization(name).subscribe((data) => {
      this.getOrganizations();
    }, (error) => {
      console.log('ohoh, mostrar mensagem de erro pro usuario');
      this.spinner.hide();
    });
  }

  editCompetences(organizationId) {
    const organization = this.organizationsList.find(org => org._id === organizationId);
    this.organizationName = organization.name;
    this.organizationCompetences = organization.competences;
    $('.editCompetences').modal('open');
  }

  editUsers(organizationId) {
    const organization = this.organizationsList.find(org => org._id === organizationId);
    this.organizationName = organization.name;
    this.organizationUsers = organization.users;
    $('.editUsers').modal('open');
  }

}
