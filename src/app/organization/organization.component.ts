import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from '../services.service';

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

  constructor(public service: ServicesService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.getOrganizations();
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

  deleteOrganization(id: string) {
    this.spinner.show();
    this.service.deleteOrganization(id).subscribe((data) => {
      this.getOrganizations();
    }, (error) => {
      console.log('ohoh, mostrar mensagem de erro pro usuario');
      this.spinner.hide();
    });
  }

  addOrganization(name: string) {
    console.log(name);
    this.spinner.show();
    this.service.addOrganization(name).subscribe((data) => {
      this.getOrganizations();
    }, (error) => {
      console.log('ohoh, mostrar mensagem de erro pro usuario');
      this.spinner.hide();
    });
  }

}
