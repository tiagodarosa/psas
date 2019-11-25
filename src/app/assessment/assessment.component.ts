import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  assessmentsCount = 0;
  assessments = [];
  publicAssessmentsCount = 0;
  publicAssessments = [];
  organizationAssessmentsCount = 0;
  organizationAssessments = [];
  assessmentName = '';
  assessmentId = '';
  organizationId = '';
  userEmail = '';
  userProfile = '';
  organizationName = '';

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

  tools = [
    {value: 'rubric', description: 'Rubrica'},
    {value: 'questionnaire', description: 'Questionário'}
  ];

  constructor(
    private service: ServicesService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.organizationId = this.cookie.get('ORGANIZATIONID');
    this.organizationName = this.cookie.get('ORGANIZATIONNAME');
    this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
    this.authService.authState.subscribe((user) => {
      this.userEmail = user.email;
      this.getAssessments();
    });
    $('select').formSelect();
    $('.modal').modal();
  }

  getAssessments() {
    this.spinner.show();
    this.service.findAssessmentsFromUser().subscribe((data) => {
      const a = Object(data);
      this.assessmentsCount = Object(a).count;
      const assess = Object(a).assessments;
      assess.forEach(a => {
        if (a.organizationId === this.organizationId) {
          this.assessments.push(a);
        }
      });
      this.spinner.hide();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  filterTool(tool: string) {
    try  {
      return this.tools.find(t => t.value === tool).description;
    } catch {
      return tool;
    }
  }

  addAssessmentModal() {
    $('.modal').modal();
    $('select').formSelect();
    $('.addAssessment').modal('open');
  }

  addAssessment(name: string, tool: string) {
    this.spinner.show();
    this.assessment.name = name;
    this.assessment.organizationId = this.organizationId;
    this.assessment.tool = tool;
    this.service.addAssessment(this.assessment).subscribe((data) => {
      this.getAssessments();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  deleteAssessmentModal(name: string, id: string) {
    this.assessmentName = name;
    this.assessmentId = id;
    $('.modal').modal();
    $('select').formSelect();
    $('.deleteAssessment').modal('open');
  }

  deleteAssessment(id: string) {
    this.spinner.show();
    this.service.deleteAssessment(id).subscribe((data) => {
      this.getAssessments();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  copyAssessmentModal() {
    this.spinner.show();
    $('.modal').modal();
    $('.collapsible').collapsible({ accordion: false });
    $('select').formSelect();
    $('.tabs').tabs();
    $('.copyAssessment').modal('open');
    this.service.findAllPublicAssessments().subscribe((data) => {
      const a = Object(data);
      this.publicAssessmentsCount = Object(a).count;
      this.publicAssessments = Object(a).assessments;
      this.spinner.hide();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  copyAssessment(id: string) {
    console.log(id);
    this.spinner.hide();
  }

}
