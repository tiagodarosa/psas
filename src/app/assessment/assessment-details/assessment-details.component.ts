import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-assessment-details',
  templateUrl: './assessment-details.component.html',
  styleUrls: ['./assessment-details.component.css']
})
export class AssessmentDetailsComponent implements OnInit {

  assessment = {
    _id: '',
    _rev: '',
    name: '',
    organizationId: '',
    userCreator: '',
    public: false,
    tool: '',
    status: 'active',
    questions: []
  };

  constructor(
    private route: ActivatedRoute,
    private service: ServicesService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      this.assessment._id = params.get('assessmentId');
      this.getAssessment();
    });
  }

  getAssessment() {
    this.service.findAssessmentById(this.assessment._id).subscribe((data) => {
      const a = Object(data).assessment;
      this.assessment._rev = a._rev;
      this.assessment.name = a.name;
      this.assessment.organizationId = a.organizationId;
      this.assessment.userCreator = a.userCreator;
      this.assessment.public = a.public;
      this.assessment.tool = a.tool;
      this.assessment.status = a.status;
      this.assessment.questions = a.questions;
      this.spinner.hide();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  copyAssessment() {
    this.spinner.show();
    this.assessment.public = false;
    this.assessment.userCreator = undefined;
    this.service.addAssessment(this.assessment).subscribe((data) => {
      this.router.navigate(['assessment']);
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

}
