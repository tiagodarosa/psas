import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
declare var M: any;

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
  currentApplicationValid = false;

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

  getAssessments() {
    this.assessments = [];
    this.spinner.show();
    this.service.findAssessmentsFromUser().subscribe((data) => {
      const result = Object(data);
      this.assessmentsCount = Object(result).count;
      const assess = Object(result).assessments;
      assess.forEach(assessment => {
        if (assessment.organizationId === this.organizationId) {
          this.assessments.push(assessment);
        }
      });
      this.assessments.sort(this.compare);
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
      this.assessments.push(this.assessment);
      this.assessments.sort(this.compare);
      this.spinner.hide();
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
      this.assessments = this.assessments.filter(a => a._id !== id);
      this.assessments.sort(this.compare);
      this.spinner.hide();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  editAssessmentModal(assessmentId: string) {
    this.assessmentId = assessmentId;
    this.assessment = this.assessments.find(a => a._id === assessmentId);
    $('#editName').val(this.assessment.name);
    $('#editTool').val(this.assessment.tool);
    M.updateTextFields();
    $('.modal').modal();
    $('select').formSelect();
    $('.editAssessment').modal('open');
  }

  editAssessment(name: string, tool: string) {
    if (this.assessment.name !== name || this.assessment.tool !== tool) {
      this.spinner.show();
      this.assessment.name = name;
      this.assessment.tool = tool;
      this.service.updateAssessment(this.assessment).subscribe((data) => {
        const result = Object(data);
        if (result.status) {
          const rev = result.status.rev;
          this.assessment._rev = rev;
          this.assessments = this.assessments.filter(a => a._id !== this.assessment._id);
          this.assessments.push(this.assessment);
          this.assessments.sort(this.compare);
          this.spinner.hide();
          M.toast({html: 'Avaliação alterada com sucesso!'});
        } else {
          this.spinner.hide();
          M.toast({html: 'Ocorreu algum erro ao modificar a visibilidade da avaliação. Por favor, tente novamente!'});
        }
      }, (error) => {
        M.toast({html: 'Ocorreu algum erro ao editar a avaliação. Por favor, tente novamente!'});
      });
    } else {
      M.toast({html: 'Avaliação alterada com sucesso!'});
    }
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

  assessmentVisibility(assessmentId: string) {
    this.spinner.show();
    this.assessment = this.assessments.find(a => a._id === assessmentId);
    this.assessment.public = !this.assessment.public;
    this.service.updateAssessment(this.assessment).subscribe((data) => {
      const result = Object(data);
      if (result.status) {
        const rev = result.status.rev;
        this.assessment._rev = rev;
        this.assessments = this.assessments.filter(a => a._id !== assessmentId);
        this.assessments.push(this.assessment);
        this.assessments.sort(this.compare);
        this.spinner.hide();
        M.toast({html: 'Visibilidade da avaliação alterada com sucesso!'});
      } else {
        this.spinner.hide();
        M.toast({html: 'Ocorreu algum erro ao modificar a visibilidade da avaliação. Por favor, tente novamente!'});
      }
    }, (error) => {
      this.assessment.public = !this.assessment.public;
      this.spinner.hide();
      M.toast({html: 'Ocorreu algum erro ao modificar a visibilidade da avaliação. Por favor, tente novamente!'});
    });
  }


  editAssessmentQuestionsModal(assessmentId: string) {
    this.assessmentId = assessmentId;
    this.assessment = this.assessments.find(a => a._id === assessmentId);
    // $('#editName').val(this.assessment.name);
    // $('#editTool').val(this.assessment.tool);
    M.updateTextFields();
    $('.modal').modal();
    $('select').formSelect();
    $('.editAssessmentQuestions').modal('open');
  }




}
