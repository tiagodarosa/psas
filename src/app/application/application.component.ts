import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  applicationsCount = 0;
  applicationList = [];
  applicationToAnswer = [];
  myApplications = [];
  applicationFromOrgs = [];
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

  constructor(private service: ServicesService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.getApplications();
    $('select').formSelect();
    $('.modal').modal();
  }

  getApplications() {
    this.service.findApplicationsFromUser().subscribe((data) => {
      const applications = Object(data);
      this.applicationsCount = Object(applications).count;
      this.applicationList = Object(applications).applicationList;
      this.applicationList.forEach(application => {
        if (application.userCreator === 'tiagodarosa@me.com') {
          this.myApplications.push(application);
        } else {
          this.applicationFromOrgs.push(application);
        }
        if (this.checkApplicationWaitingForAnswer(application) > 0) {
          this.applicationToAnswer.push(application);
        }
      });
      this.spinner.hide();
      this.getTeams();
      this.getAssessments();
    }, (error) => {
      this.router.navigate(['home']);
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

  getTeams() {
    this.service.findTeamsFromUser().subscribe((data) => {
      const teams = Object(data);
      this.teamList = Object(teams).teams;
    }, (error) => {
      M.toast({html: 'Não foi possível buscar seus times.'});
    });
  }

  getAssessments() {
    this.service.findAssessmentsFromUser().subscribe((data) => {
      const assessments = Object(data);
      this.assessmentList = Object(assessments).assessments;
    }, (error) => {
      M.toast({html: 'Não foi possível buscar suas avaliações.'});
    });
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

}
