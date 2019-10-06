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

  constructor(public service: ServicesService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.getOrganizations();
  }

  getOrganizations() {
    this.organizations = [];
    this.service.getOrganizations().subscribe((data) => {
      this.spinner.hide();
      console.log(data);
      this.organizations = data;
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    });
  }

}
