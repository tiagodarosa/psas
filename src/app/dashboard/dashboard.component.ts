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
// let Boost = require('highcharts/modules/boost');
// let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

// Boost(Highcharts);
// noData(Highcharts);
More(Highcharts);

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
  userName = '';
  spotlightCompetences = [];
  historySelectedCompetences = [];
  teams = [];
  people = [];
  peopleList = [];
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
        this.userName = user.name;
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

  findName(email) {
    let name = email;
    this.applications.forEach(a => {
      a.team.members.forEach(m => {
        if (m.email === email) {
          name = m.name || email;
        }
      });
    });
    if (name === this.userEmail) {
      name = this.userName;
    }
    return name;
  }

  updatePeople() {
    this.people = [];
    const tempEmail = [];
    this.answers.forEach(a => {
      if (!tempEmail.includes(a.userRated)) {
        tempEmail.push(a.userRated);
        this.people.push({ name: this.findName(a.userRated), email: a.userRated });
      }
    });
    this.peopleList = this.people;
  }

  findProfile() {
    this.service.findOrganizationProfile(this.organizationId).subscribe((data) => {
      this.spotlightCompetences = [];
      this.answers = Object(data).answers;
      this.applications = Object(data).applications;
      this.updateTeams();
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
        this.updatePeople();
        this.initializeComponents();
        this.resultChartComparative(this.spotlightCompetences, this.answers, '', '');
        this.historyChartCompetence('', '', '', '');
        this.updateHighlightsChart('', '', '');
        this.spinner.hide();
      }, (error) => {
        this.router.navigate(['home']);
      });
    }, (error) => {
      this.router.navigate(['home']);
    });
  }



  historyChartCompetence(project, team, person, competence) {
    if (competence === '') {
      this.updateHistoryChart(project, team, person, competence);
    } else {
      const comp = this.spotlightCompetences.find(c => c.questionCompetence === competence);
      if (comp) {
        this.updateHistoryChart(project, team, person, competence);
      } else {
        this.updateHistoryChart(project, team, person, competence);
      }
    }
  }

  filterHistoryTeam(project, team, person, competence) {
    this.peopleList = [];
    if (team === '') {
      this.peopleList = this.people;
    } else {
      const tempEmail = [];
      this.answers.forEach(a => {
        if (a.teamId === team) {
          if (!tempEmail.includes(a.userRated)) {
            tempEmail.push(a.userRated);
            this.peopleList.push({ name: this.findName(a.userRated), email: a.userRated });
          }
        }
      });
    }
    this.initializeComponents();
    this.updateHistoryChart(project, team, person, competence);
  }

  updateHistoryChart(project, team, person, competence) {
    let testando = [];
    if (person !== '') {
      this.answers.forEach(a => {
        if (a.userRated === person) {
          testando.push(a);
        }
      });
    } else {
      testando = this.answers;
    }

    const temporary = [];
    const dates = [];
    this.answers.forEach(a => {
      if (!dates.includes(a.endDate)) {
        dates.push(a.endDate);
      }
    });
    this.spotlightCompetences.forEach(function(c, i) {
      temporary[i] = { name: c, showInLegend: true, data: [] };
      dates.forEach(d => {
        let value = 0;
        let count = 0;
        let day = 0;
        let month = 0;
        let year = 0;
        testando.forEach(a => {
          if (a.questionCompetence === c && a.answer !== '' && a.endDate === d) {
            day = new Date(a.endDate).getUTCDate();
            month = new Date(a.endDate).getUTCMonth();
            year = new Date(a.endDate).getUTCFullYear();
            value = value + ((a.answer * 100) / 100);
            count++;
          }
        });
        temporary[i].data.push([Date.UTC(year, month, day), (value / count)]);
      });
    });

    let competenceSeries = [];
    if (competence !== '') {
      temporary.forEach(t => {
        if (t.name === competence) {
          competenceSeries.push(t);
        }
      });
    } else {
      competenceSeries = temporary;
    }
    Highcharts.chart('history', {
      chart: {
        type: 'area',
        height: '450px',
        backgroundColor: 'transparent'
      },
      title: {
        text: null
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            minute: '%H:%M',
            month: '%e/%m',
            year: '%Y'
        },
        title: {
            text: 'Data'
        }
      },
      yAxis: {
          title: {
              text: 'Porcentagem'
          }
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: 'Atingiu {point.y:.0f}% em {point.x:%e/%m/%Y}'
      },
      plotOptions: {
          area: {
              marker: {
                  enabled: false,
                  symbol: 'circle',
                  radius: 2,
                  states: {
                      hover: {
                          enabled: true
                      }
                  }
              }
          }
      },
      series: competenceSeries
    });
    $('.highcharts-credits').hide();
  }











  updateHighlightsChart(project, team, competence) {
    const temporary = [];
    const k = this.answers;

    const pep = [];
    this.answers.forEach(a => {
      if (!pep.includes(a.userRated)) {
        pep.push(a.userRated);
      }
    });

    this.teams.forEach(function(c, i) {
      temporary[i] = { name: c.name, data: [] };
      pep.forEach(p => {
        let value = 0;
        let count = 0;
        k.forEach(a => {
          if (a.teamId === c._id && a.answer !== '' && a.userRated === p) {
            value = value + ((a.answer * 100) / 100);
            count++;
          }
        });
        temporary[i].data.push({ name: p, value: (value / count)});
      });
    });

    let competenceSeries = [];
    if (competence !== '') {
      temporary.forEach(t => {
        if (t.name === competence) {
          competenceSeries.push(t);
        }
      });
    } else {
      competenceSeries = temporary;
    }

    console.log(competenceSeries);
    /*Highcharts.chart('highlights', {
      chart: {
          type: 'packedbubble',
          height: '460px'
      },
      title: {
          text: ''
      },
      tooltip: {
          useHTML: true,
          pointFormat: '<b>{point.name}:</b> {point.value}'
      },
      plotOptions: {
          packedbubble: {
              minSize: '20%',
              maxSize: '100%',
              zMin: 0,
              zMax: 1000,
              layoutAlgorithm: {
                  gravitationalConstant: 0.05,
                  splitSeries: 'true',
                  seriesInteraction: false,
                  dragBetweenSeries: true,
                  parentNodeLimit: true
              },
              dataLabels: {
                  enabled: true,
                  format: '{point.name}',
                  filter: {
                      property: 'y',
                      operator: '>',
                      value: 250
                  },
                  style: {
                      color: 'black',
                      textOutline: 'none',
                      fontWeight: 'normal'
                  }
              }
          }
      },
      series: [{
          name: 'Oceania',
          data: [{
              name: 'Australia',
              value: 409.4
          },
          {
              name: 'New Zealand',
              value: 34.1
          },
          {
              name: 'Papua New Guinea',
              value: 7.1
          }]
      }, {
          name: 'North America',
          data: [{
              name: 'Costa Rica',
              value: 7.6
          },
          {
              name: 'Honduras',
              value: 8.4
          },
          {
              name: 'Jamaica',
              value: 8.3
          },
          {
              name: 'Panama',
              value: 10.2
          },
          {
              name: 'Guatemala',
              value: 12
          },
          {
              name: 'Dominican Republic',
              value: 23.4
          },
          {
              name: 'Cuba',
              value: 30.2
          },
          {
              name: 'USA',
              value: 5334.5
          }, {
              name: 'Canada',
              value: 566
          }, {
              name: 'Mexico',
              value: 456.3
          }]
      }, {
          name: 'South America',
          data: [{
              name: 'El Salvador',
              value: 7.2
          },
          {
              name: 'Uruguay',
              value: 8.1
          },
          {
              name: 'Bolivia',
              value: 17.8
          },
          {
              name: 'Trinidad and Tobago',
              value: 34
          },
          {
              name: 'Ecuador',
              value: 43
          },
          {
              name: 'Chile',
              value: 78.6
          },
          {
              name: 'Peru',
              value: 52
          },
          {
              name: 'Colombia',
              value: 74.1
          },
          {
              name: 'Brazil',
              value: 501.1
          }, {
              name: 'Argentina',
              value: 199
          },
          {
              name: 'Venezuela',
              value: 195.2
          }]
      }],
      series: competenceSeries
    });*/
    $('.highcharts-credits').hide();
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
          type: 'area',
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
