import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare var $: any;
declare var M: any;

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
let VariablePie = require('highcharts/modules/variable-pie');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
VariablePie(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private service: ServicesService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private cookie: CookieService,
    private http: HttpClient,
    private router: Router) { }


  organizationId = '';
  organizationName = '';
  userProfile = '';
  userEmail = '';
  spotlightCompetences = [];
  historySelectedCompetences = [];
  teams = [];
  answers = [];
  projects = [];
  applications = [];
  topThreeCompetences = [];
  resultsChart = {
    categories: [],
    series: []
  };

  ngOnInit() {
    this.spinner.show();
    this.organizationId = this.cookie.get('ORGANIZATIONID');
    this.organizationName = this.cookie.get('ORGANIZATIONNAME');
    this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
    this.authService.authState.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        this.findProfile();
      } else {
        this.router.navigate(['home']);
      }
    });
    M.AutoInit();
    $('.indicator').addClass('light-blue');
    $('select').formSelect();
  }

  initializeComponents() {
    setTimeout(this.initializeComponents, 200);
    $('select').formSelect();
  }

  updateTeams() {
    this.teams = [];
    const tempIds = [];
    this.applications.forEach(app => {
      if (!tempIds.includes(app.team._id)) {
        tempIds.push(app.team._id);
        this.teams.push({ name: app.team.name, _id: app.team._id, projectId: app.team.projectId });
      }
    });
  }

  updateProjects(projects) {
    this.projects = [];
    const tempIds = [];
    this.teams.forEach(team => {
      if (!tempIds.includes(team.projectId)) {
        tempIds.push(team.projectId);
        projects.forEach(proj => {
          if (proj._id === team.projectId) {
            this.projects.push({ name: proj.name, _id: proj._id });
          }
        });
      }
    });
  }

  findProfile() {
    this.service.findOrganizationProfile(this.organizationId).subscribe((data) => {
      this.spotlightCompetences = [];
      this.answers = Object(data).answers;
      this.applications = Object(data).applications;
      this.updateTeams();
      // this.historyChartCompetence('');
      let compTempArray = [];
      this.answers.forEach(answer => {
        compTempArray.push(answer.questionCompetence);
        if (!this.spotlightCompetences.includes(answer.questionCompetence)) {
          this.spotlightCompetences.push(answer.questionCompetence);
        }
      });
      // this.selectTopThreeCompetences(Object(data));
      this.service.findProjectsFromUser().subscribe((proj) => {
        // this.updateTeamsList(Object(data).applications, Object(proj).projects);
        this.updateProjects(Object(proj).projects);
        this.initializeComponents();
        this.resultChartComparative(this.spotlightCompetences, this.answers, '', '');
        this.spinner.hide();
      }, (error) => {
        this.router.navigate(['home']);
      });
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  resultChartComparative(spotCompetences, answers, project, team) {
    const categories = [];
    const userResultsData = [];
    const otherResultsData = [];
    const temporary = [];
    this.resultsChart = {
      categories: [],
      series: []
    };

    // Filtra todas as equipes
    let tempTeams = [];
    if (team === '') {
      this.answers.forEach(answer => {
        if (!tempTeams.includes(answer.teamId)) {
          tempTeams.push(answer.teamId);
        }
      });
    } else {
      tempTeams.push(team);
    }

    // Para cada time monta a soma da competencia
    // tslint:disable-next-line: only-arrow-functions
    tempTeams.forEach(function(t, i) {
      temporary[i] = { teamId: t , competences: []};
      spotCompetences.forEach(c => {
        let temp3 = 0;
        let count3 = 0;
        answers.forEach(a => {
          if (a.teamId === t && a.questionCompetence === c && a.answer !== '') {
            temp3 = temp3 + ((a.answer * 100) / 100);
            count3++;
          }
        });
        temporary[i].competences.push({ competence: c, mean: (temp3 / count3)});
      });
    });
    console.log(temporary);
    this.resultsChart.categories = spotCompetences;

    temporary.forEach(temp => {
      const competenceValues = [];
      temp.competences.forEach(c => {
        competenceValues.push(c.mean);
      });
      this.resultsChart.series.push( {
        name: this.findTeamName(temp.teamId),
        data: competenceValues,
        pointPlacement: 'on'
      });
    });

    this.updateResultsChart();
  }

  comparativeResultsByTeam(teamId) {
    console.log(teamId);
    this.resultChartComparative(this.spotlightCompetences, this.answers, '', teamId);
  }

  findTeamName(teamId) {
    let teamName = teamId;
    this.applications.forEach(app => {
      if (app.team._id === teamId) {
        teamName = app.team.name;
      }
    });
    return teamName;
  }

  updateResultsChart() {
    Highcharts.chart('results', {
      chart: {
          polar: true,
          type: 'line',
          height: '450px',
      },
      title: {
          text: null,
          x: -80
      },
      pane: {
          size: '80%'
      },
      xAxis: {
          categories: this.resultsChart.categories,
          tickmarkPlacement: 'on',
          lineWidth: 0
      },
      yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
      },
      tooltip: {
          shared: true,
          pointFormat: '<span style="color:{series.color}">{series.name}: {point.y:,.0f}%<br/>'
      },
      legend: {
          align: 'right',
          verticalAlign: 'middle',
          layout: 'vertical'
      },
      series: this.resultsChart.series,
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      align: 'center',
                      verticalAlign: 'bottom',
                      layout: 'horizontal'
                  },
                  pane: {
                      size: '70%'
                  }
              }
          }]
      }
    });
    $('.highcharts-credits').hide();
  }

}
