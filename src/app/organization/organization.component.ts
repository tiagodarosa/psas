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

  constructor(public service: ServicesService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.getOrganizations();
  }

  getOrganizations() {
    this.service.getOrganizations().subscribe((data) => {
      this.spinner.hide();
      console.log(data);
      this.organizations = Object(data);
      this.organizationsCount = Object(this.organizations).count;
      this.organizationsList = Object(this.organizations).organizationList;
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    });
  }

}
