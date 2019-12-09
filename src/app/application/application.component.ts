import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
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
  myApplications = [];
  teamList = [];
  assessmentList = [];
  applicationToDelete = '';

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

  status = [
    { value: 'active', description: 'Em andamento' },
    { value: 'complete', description: 'Concluída' },
    { value: 'inactive', description: 'Interrompida' },
    { value: 'closed', description: 'Encerrada' }
  ];

  organizationId = '';
  organizationName = '';
  userProfile = '';
  userEmail = '';

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
      this.getApplications();
    });
    $('select').formSelect();
    $('.modal').modal();
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
      return this.methods.find(t => t.value === method).description;
    } catch {
      return method;
    }
  }

  filterStatus(status: string) {
    try  {
      return this.status.find(t => t.value === status).description;
    } catch {
      return status;
    }
  }

  filterPercentage(application: object) {
    try {
      const totalAnswers = Object(application).answers;
      let totalAnswered = 0;
      totalAnswers.forEach(answer => {
        if (answer.answer !== '') {
          totalAnswered++;
        }
      });
      return Math.round((totalAnswered * 100) / totalAnswers.length);
    } catch {
      return 0;
    }
  }

  filterStrategy(strategy: string) {
    try  {
      return this.strategies.find(t => t.value === strategy).description;
    } catch {
      return strategy;
    }
  }

  getApplications() {
    this.myApplications = [];
    this.service.findApplicationsFromUser().subscribe((data) => {
      const applications = Object(data);
      this.applicationsCount = Object(applications).count;
      this.applicationList = Object(applications).applicationList;
      console.log(this.applicationList);
      this.applicationList.forEach(application => {
        if (application.organizationId === this.organizationId) {
          this.myApplications.push(application);
        }
      });
      this.spinner.hide();
      this.getTeams();
      this.getAssessments();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  getTeams() {
    this.service.findProjectsByOrganizationId(this.organizationId).subscribe((projects) => {
      const projs = Object(projects).projects;
      this.service.findTeamsFromUser().subscribe((data) => {
        const teams = Object(data).teams;
        teams.forEach(team => {
          projs.forEach(proj => {
            if (team.projectId === proj._id) {
              this.teamList.push(team);
            }
          });
        });
      }, (error) => {
        M.toast({html: 'Não foi possível buscar seus times.'});
      });
    });
  }

  getAssessments() {
    this.service.findAssessmentsFromUser().subscribe((data) => {
      this.assessmentList = [];
      const assessments = Object(data).assessments;
      assessments.forEach(assessment => {
        if (assessment.organizationId === this.organizationId) {
          this.assessmentList.push(assessment);
        }
      });
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

  attendanceModal(applicationId: string) {
    $('select').formSelect();
    $('.modal').modal();
    $('.attendance').modal('open');
  }

  addApplication(name: string, teamId: string, assessmentId: string, type: string, method: string, strategy: string) {
    this.spinner.show();
    this.service.addApplication(name, teamId, assessmentId, type, method, strategy).subscribe((data) => {
      this.getApplications();
    }, (error) => {
      M.toast({html: 'Erro'});
    });
  }

  deleteApplicationModal(applicationId: string) {
    if (applicationId !== '') {
      this.applicationToDelete = applicationId;
      $('.modal').modal();
      $('.deleteApplication').modal('open');
    } else {
      M.toast({html: 'Ocorreu algum erro ao tentar excluir a aplicação. Por favor, tente novamente!'});
    }
  }

  deleteApplication() {
    if (this.applicationToDelete !== '') {
      this.spinner.show();
      this.service.deleteApplication(this.applicationToDelete).subscribe((data) => {
        this.getApplications();
      }, (error) => {
        this.spinner.hide();
        M.toast({html: 'Ocorreu algum erro ao tentar excluir a aplicação. Por favor, tente novamente!'});
      });
    } else {
      M.toast({html: 'Ocorreu algum erro ao tentar excluir a aplicação. Por favor, tente novamente!'});
    }
  }

}
