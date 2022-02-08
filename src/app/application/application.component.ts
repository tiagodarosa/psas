<<<<<<< HEAD
import { Component, OnInit} from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
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
<<<<<<< HEAD
export class ApplicationComponent implements OnInit{
  selectedApplication = null;
=======
export class ApplicationComponent implements OnInit {

>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
  applicationsCount = 0;
  applicationList = [];
  myApplications = [];
  teamList = [];
  assessmentList = [];
  applicationToDelete = '';
<<<<<<< HEAD
  listOfAnswers = [];
=======
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3

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
<<<<<<< HEAD
  userName = '';
=======
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3

  constructor(
    private service: ServicesService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router) { }

<<<<<<< HEAD

  // ngDoCheck usado para esconder o spinner quando todos os dados forem carregados
  // ngDoCheck(): void { if(this.teamList.length && this.assessmentList.length) {this.spinner.hide();} }

=======
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
  ngOnInit() {
    this.spinner.show();
    this.organizationId = this.cookie.get('ORGANIZATIONID');
    this.organizationName = this.cookie.get('ORGANIZATIONNAME');
    this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
    this.authService.authState.subscribe((user) => {
      this.userEmail = user.email;
<<<<<<< HEAD
      this.userName = user.name;
=======
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
      this.getApplications();
    });
    $('select').formSelect();
    $('.modal').modal();
<<<<<<< HEAD

    
  }
  



=======
  }
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3

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

<<<<<<< HEAD
  

=======
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
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
<<<<<<< HEAD
      this.applicationList.forEach(application => {
        if (application.organizationId === this.organizationId) {
           return this.myApplications.push(application);
        }
      });
      
      this.getTeams();
      

      console.log(this.teamList);
=======
      console.log(this.applicationList);
      this.applicationList.forEach(application => {
        if (application.organizationId === this.organizationId) {
          this.myApplications.push(application);
        }
      });
      this.spinner.hide();
      this.getTeams();
      this.getAssessments();
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
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
<<<<<<< HEAD
            if (team.projectId === proj._id && team.projectId !== '') {
=======
            if (team.projectId === proj._id) {
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
              this.teamList.push(team);
            }
          });
        });
<<<<<<< HEAD
      this.getAssessments();
      }, (error) => {
        M.toast({html: 'Não foi possível buscar suas equipes.'});
=======
      }, (error) => {
        M.toast({html: 'Não foi possível buscar seus times.'});
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
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
<<<<<<< HEAD
      this.spinner.hide();
=======
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
    }, (error) => {
      M.toast({html: 'Não foi possível buscar suas avaliações.'});
    });
  }
<<<<<<< HEAD
  
  checkApplicationWaitingForAnswer(answers) {
    let missing = 0;
    answers.forEach(answer => {
      if (answer.userEvaluator === this.userEmail && answer.answer === '') {
        missing++;
      }
    });
    return missing;
  }

  checkMember(answers, user) {
    let missing = 0;
    answers.forEach(answer => {
      if(answer.userEvaluator === this.userEmail && answer.userEvaluator === user) {
        return this.userName
      } else { M.toast({html: 'Usuário inválido'})
      return 0;
    }
    });
  }




  addApplicationModal() {
    console.log(this.teamList.length);
=======

  addApplicationModal() {
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
    if (this.assessmentList.length > 0 && this.teamList.length > 0) {
      $('select').formSelect();
      $('.modal').modal();
      $('.addApplication').modal('open');
    } else {
<<<<<<< HEAD
      M.toast({html: 'Você não possui avaliações ou equipes para incluir uma aplicação!'});
=======
      M.toast({html: 'Você não possui avaliações ou times para incluir uma aplicação!'});
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
    }
  }

  attendanceModal(applicationId: string) {
<<<<<<< HEAD
    console.log(applicationId)
    const application = this.applicationList.find(app => app._id === applicationId);
    this.listOfAnswers = [];
    application.answers.forEach(i => {
      if (i.questionOrder === 0) {
        let missing = 0;
        application.answers.forEach(j => {
          if (i.userEvaluator === j.userEvaluator && i.userRated === j.userRated) {
            if (j.answer === '') {
              missing++;
            }
          }
        });
        this.listOfAnswers.push({
          userEvaluator: i.userEvaluator,
          userRated: i.userRated,
          missing: missing
        });
      }
    });
=======
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
    $('select').formSelect();
    $('.modal').modal();
    $('.attendance').modal('open');
  }

  addApplication(name: string, teamId: string, assessmentId: string, type: string, method: string, strategy: string) {
    this.spinner.show();
<<<<<<< HEAD
    if(name == ""){
      console.log(name)
      alert('Aplicação inválida, nome em branco.');
    } else if((confirm('Após iniciada a avaliação, não é possível sua edição. Você esta certo de que sua aplicação de avaliação esta correta?'))) {
      this.service.addApplication(name, teamId, assessmentId, type, method, strategy).subscribe((data) => {
        this.getApplications();
      }, (error) => {
        M.toast({html: 'Erro'});
      });
    }
    this.spinner.hide();
=======
    this.service.addApplication(name, teamId, assessmentId, type, method, strategy).subscribe((data) => {
      this.getApplications();
    }, (error) => {
      M.toast({html: 'Erro'});
    });
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
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
<<<<<<< HEAD
=======
        this.spinner.hide();
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
        M.toast({html: 'Ocorreu algum erro ao tentar excluir a aplicação. Por favor, tente novamente!'});
      });
    } else {
      M.toast({html: 'Ocorreu algum erro ao tentar excluir a aplicação. Por favor, tente novamente!'});
    }
  }

}
