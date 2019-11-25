import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  organizationId = '';
  organization = {};
  userEmail = '';
  applicationToAnswer = [];
  applicationsByUser = [];
  teamList = [];
  assessmentList = [];

  types = [
    { value: 'initial', description: 'Diagnóstica' },
    { value: 'summative', description: 'Formativa' },
    { value: 'formative', description: 'Somativa' }
  ];

  methods = [
    { value: 'ranking', description: 'Ranking' },
    { value: 'nomination', description: 'Nomeação' },
    { value: 'classification', description: 'Classificação' }
  ];

  strategies = [
    { value: 'self', description: 'Auto avaliação' },
    { value: 'co', description: 'Co-avaliação' },
    { value: '360', description: 'Avaliação 360º' }
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
    this.authService.authState.subscribe((user) => {
      this.userEmail = user.email;
      this.getApplications();
    });
    $('select').formSelect();
    $('.modal').modal();
  }

  getApplications() {
    this.service.findApplicationsFromUser().subscribe((data) => {
      const applications = Object(data);
      this.organization = applications.organizations.find(o => o._id === this.organizationId);
      console.log(this.organization);
      const applicationList = Object(applications).applicationList;
      applicationList.forEach(application => {
        if (this.checkApplicationWaitingForAnswer(application) > 0 && application.organizationId === this.organizationId) {
          this.applicationToAnswer.push(application);
          this.convertApplicationByUser(application);
        }
      });
      this.spinner.hide();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  convertApplicationByUser(application: object) {
    const answers = Object(application).answers;
    const assessment = Object(application).assessment;
    answers.forEach(answer => {
      if (answer.userEvaluator === this.userEmail && answer.questionOrder === 0) {
        const item = {
          applicationId: Object(application)._id,
          type: Object(application).type,
          method: Object(application).method,
          strategy: Object(application).strategy,
          applicationName: Object(application).name,
          userRated: answer.userRated,
          questionsCount: assessment.questions.length
        };
        this.applicationsByUser.push(item);
      }
    });
  }

  checkApplicationWaitingForAnswer(application: object) {
    const answers = Object(application).answers;
    let missing = 0;
    answers.forEach(answer => {
      if (answer.userEvaluator === 'tiagodarosa@me.com' && answer.answer === '') {
        missing++;
      }
    });
    return missing;
  }

  addApplicationModal() {
    if (this.assessmentList.length > 0 && this.teamList.length > 0) {
      $('select').formSelect();
      $('.modal').modal();
      $('.addApplication').modal('open');
    } else {
      M.toast({html: 'Você não possui avaliações ou times para incluir uma aplicação!'});
    }
  }

  addApplication(name: string, teamId: string, assessmentId: string, type: string, method: string, strategy: string) {
    this.spinner.show();
    this.service.addApplication(name, teamId, assessmentId, type, method, strategy).subscribe((data) => {
      this.getApplications();
    }, (error) => {
      M.toast({html: 'Erro'});
    });
  }

  filterType(type: string) {
    try  {
      return this.types.find(t => t.value === type).description;
    } catch {
      return type;
    }
  }

  filterMethod(method: string) {
    try  {
      return this.methods.find(m => m.value === method).description;
    } catch {
      return method;
    }
  }

  filterStrategy(strategy: string) {
    try  {
      return this.strategies.find(s => s.value === strategy).description;
    } catch {
      return strategy;
    }
  }

  filterName(user: string) {
    try  {
      const members = Object(this.organization).users;
      return members.find(m => m.email === user).name;
    } catch {
      return user;
    }
  }

}
