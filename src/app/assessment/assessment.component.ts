import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
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
  organizationsCount = 0;
  organizationsList = [];
  assessmentName = '';
  assessmentId = '';

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

  constructor(private service: ServicesService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.getAssessments();
  }

  getAssessments() {
    this.spinner.show();
    this.service.findAssessmentsFromUser().subscribe((data) => {
      const a = Object(data);
      this.assessmentsCount = Object(a).count;
      this.assessments = Object(a).assessments;
      this.service.findOrganizationsFromUser().subscribe((orgs) => {
        const o = Object(orgs);
        this.organizationsCount = Object(o).count;
        this.organizationsList = Object(o).organizationList;
        this.spinner.hide();
      }, (error) => {
        this.router.navigate(['home']);
      });
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  filterOrgOfProject(orgId: string) {
    try  {
      return this.organizationsList.find(org => org._id === orgId).name;
    } catch {
      return '';
    }
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

  addAssessment(name: string, orgId: string, tool: string) {
    this.spinner.show();
    this.assessment.name = name;
    this.assessment.organizationId = orgId;
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
