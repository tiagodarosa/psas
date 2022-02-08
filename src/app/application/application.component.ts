import { Component, OnInit} from '@angular/core';
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
export class ApplicationComponent implements OnInit{
  selectedApplication = null;
  applicationsCount = 0;
  applicationList = [];
  myApplications = [];
  teamList = [];
  assessmentList = [];
  applicationToDelete = '';
  listOfAnswers = [];

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
  userName = '';

  constructor(
    private service: ServicesService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router) { }


  // ngDoCheck usado para esconder o spinner quando todos os dados forem carregados
  // ngDoCheck(): void { if(this.teamList.length && this.assessmentList.length) {this.spinner.hide();} }

  ngOnInit() {
    this.spinner.show();
    this.organizationId = this.cookie.get('ORGANIZATIONID');
    this.organizationName = this.cookie.get('ORGANIZATIONNAME');
    this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
    this.authService.authState.subscribe((user) => {
      this.userEmail = user.email;
      this.userName = user.name;
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
      this.applicationList.forEach(application => {
        if (application.organizationId === this.organizationId) {
           return this.myApplications.push(application);
        }
      });
      
      this.getTeams();
      

      console.log(this.teamList);
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
            if (team.projectId === proj._id && team.projectId !== '') {
              this.teamList.push(team);
            }
          });
        });
      this.getAssessments();
      }, (error) => {
        M.toast({html: 'Não foi possível buscar suas equipes.'});
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
      this.spinner.hide();
    }, (error) => {
      M.toast({html: 'Não foi possível buscar suas avaliações.'});
    });
  }
  
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
    if (this.assessmentList.length > 0 && this.teamList.length > 0) {
      $('select').formSelect();
      $('.modal').modal();
      $('.addApplication').modal('open');
    } else {
      M.toast({html: 'Você não possui avaliações ou equipes para incluir uma aplicação!'});
    }
  }

  attendanceModal(applicationId: string) {
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
    $('select').formSelect();
    $('.modal').modal();
    $('.attendance').modal('open');
  }

  addApplication(name: string, teamId: string, assessmentId: string, type: string, method: string, strategy: string) {
    this.spinner.show();
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
        M.toast({html: 'Ocorreu algum erro ao tentar excluir a aplicação. Por favor, tente novamente!'});
      });
    } else {
      M.toast({html: 'Ocorreu algum erro ao tentar excluir a aplicação. Por favor, tente novamente!'});
    }
  }

}
