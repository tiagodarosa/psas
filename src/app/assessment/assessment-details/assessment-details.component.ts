import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
<<<<<<< HEAD


=======
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
declare var $: any;
declare var M: any;

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

  organization = {
    _id: '',
    _rev: '',
    name: '',
    users: [],
    competences: [],
    status: ''
  };

  q = {
    name: '',
    description: '',
    competenceName: '',
    significance: 0
  };

  alternative = {
    description: '',
    option: '',
    percentage: 0
  };

  tools = [
    { value: 'rubric', description: 'Rubrica' },
    { value: 'questionnaire', description: 'Questionário' }
  ];

  publicOptions = [
    { value: true, description: 'Sim' },
    { value: false, description: 'Não' }
  ];

  currentQuestion = null;
  organizationId = '';
  organizationName = '';
  userProfile = '';
  userEmail = '';

  constructor(
    private route: ActivatedRoute,
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
      this.route.paramMap.subscribe(params => {
        this.assessment._id = params.get('assessmentId');
        this.getAssessment();
      });
    });
  }

  initializeComponents() {
    setTimeout(this.initializeComponents, 200);
    $('select').formSelect();
    $('.collapsible').collapsible();
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
      this.service.findOrganizationById(this.assessment.organizationId).subscribe((org) => {
        const result = Object(org);
        this.organization._id = result._id;
        this.organization._rev = result._rev;
        this.organization.name = result.name;
        this.organization.competences = result.competences;
        this.organization.users = result.users;
        this.organization.status = result.status;
        this.spinner.hide();
        $('select').formSelect();
        this.initializeComponents();
      }, (error) => {
        this.router.navigate(['home']);
      });
      $('select').formSelect();
      $('.collapsible').collapsible();
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

  addQuestion() {
    const newQuestion = {
      order: this.assessment.questions.length,
      competenceName: this.organization.competences[0].name,
      description: '',
      items: [],
      name: '',
      significance: 0
    };
    this.assessment.questions.push(newQuestion);
    this.initializeComponents();
  }

  editQuestionModal(question: number) {
    const que = this.assessment.questions[question];
    this.q.name = que.name;
    this.q.description = que.description;
    this.q.competenceName = que.competenceName;
    this.q.significance = que.significance;
    $('.modal').modal();
    $('select').formSelect();
    $('.addEditQuestion').modal('open');
  }

  collapsible() {
    $('.collapsible').collapsible();
    M.updateTextFields();
  }

  deleteAlternative(question: number, item: number) {
<<<<<<< HEAD
    if(confirm(`Deseja realmente deletar a alternativa ${item+1}?`)){
      this.assessment.questions[question].items.splice(item, 1);
    }
  }

  deleteQuestion(question: number) {
    if(confirm(`Deseja realmente deletar a questão ${question+1}?`)){
      this.assessment.questions.splice(question, 1);
    }
=======
    this.assessment.questions[question].items.splice(item, 1);
  }

  deleteQuestion(question: number) {
    this.assessment.questions.splice(question, 1);
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
  }

  addAlternative(question: number) {
    const newAlternative = {
      order: this.assessment.questions[question].items.length,
      description: '',
      option: '',
      percentage: ''
    };
    this.assessment.questions[question].items.push(newAlternative);
  }

  addEditQuestion(qname: string, competence: string, sig: number) {
    const q = {
      name: qname,
      description: '',
      significance: sig,
      competenceName: competence,
      items: []
    };
    this.assessment.questions.push(q);
  }

  save() {
    this.spinner.show();
<<<<<<< HEAD
    console.log(this.assessment);
    this.service.updateAssessment(this.assessment).subscribe((data) => {
      this.getAssessment();
      this.router.navigate(['assessment']);
      M.toast({html: 'Questões da avaliação salvas com sucesso!'});
=======
    this.service.updateAssessment(this.assessment).subscribe((data) => {
      this.getAssessment();
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

<<<<<<< HEAD

  copy(){
    this.spinner.show();
    console.log(this.assessment);
    this.service.addAssessment(this.assessment).subscribe((data) => {
      this.getAssessment();
      this.router.navigate(['assessment']);
    }, (error) => {
      this.router.navigate(['home']);
    }); 

  
  }

=======
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
  changeQuestionName(question: number) {
    const field = '#questionName' + question;
    this.assessment.questions[question].name = $(field).val();
  }

  changeQuestionCompetence(question: number) {
    const field = '#competenceName' + question;
    this.assessment.questions[question].competenceName = $(field).val();
    console.log(field);
    console.log(this.assessment.questions[question].competenceName);
  }

  changeQuestionSignificance(question: number) {
    const field = '#significance' + question;
    this.assessment.questions[question].significance = $(field).val();
  }

  changeQuestionItemPercentage(question: number, item: number) {
    const field = '#itemPercentage' + question + item;
    this.assessment.questions[question].items[item].percentage = $(field).val();
  }

  changeQuestionItemDescription(question: number, item: number) {
    const field = '#itemDescription' + question + item;
    this.assessment.questions[question].items[item].description = $(field).val();
    console.log(field);
  }

}
