import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private service: ServicesService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router) { }
;

  organizationId = '';
  organizationName = '';
  userProfile = '';
  userEmail = '';
  spotlightCompetences = [];
  historySelectedCompetences = [];
  teams = [];
  answers = [];
  projects = [];
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

  findProfile() {
    this.service.findProfile(this.organizationId).subscribe((data) => {
      this.spotlightCompetences = Object(data).spotlightCompetences;
      this.answers = Object(data).answers;
      this.historyChartCompetence('');
      console.log(data);
      this.selectTopThreeCompetences(Object(data));
      this.service.findProjectsFromUser().subscribe((proj) => {
        this.updateTeamsList(Object(data).applications, Object(proj).projects);
        this.initializeComponents();
        this.spinner.hide();
      }, (error) => {
        this.router.navigate(['home']);
      });
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  resultChartComparative(spotCompetences, answers) {
    const categories = [];
    const userResultsData = [];
    const otherResultsData = [];
    spotCompetences.forEach(competence => {
      categories.push(competence.questionCompetence);
      userResultsData.push(competence.mean);
      let temp = 0;
      let count = 0;
      answers.forEach(answer => {
        if (answer.questionCompetence === competence.questionCompetence) {
          if (answer.answer !== '') {
            temp = temp + ((answer.answer * 100) / 100);
            count++;
          }
        }
      });
      otherResultsData.push(temp / count);
    });
    this.resultsChart.categories = categories;
    console.log(otherResultsData);

    this.resultsChart.series = [{
        name: 'Você',
        data: userResultsData,
        pointPlacement: 'on'
      }, {
          name: 'Comparativo',
          data: otherResultsData,
          pointPlacement: 'on'
      }];
    this.updateResultsChart();
  }

  sortCompetencesByMean(a, b) {
    const ca = a.mean;
    const cb = b.mean;
    let comparison = 0;
    if (ca > cb) {
      comparison = -1;
    } else if (ca < cb) {
      comparison = 1;
    }
    return comparison;
  }

  selectTopThreeCompetences(profile) {
    if (profile) {
      this.topThreeCompetences = profile.spotlightCompetences;
      this.topThreeCompetences.sort(this.sortCompetencesByMean);
      this.topThreeCompetences = this.topThreeCompetences.slice(0, 3);
      console.log(this.topThreeCompetences);
    }
  }

  updateTeamsList(applications, projs) {
    this.teams = [];
    applications.forEach(application => {
      if (this.teams.length <= 0) {
        this.teams.push(application.team);
      } else {
        const t = this.teams.find(team => team._id === application.team._id);
        if (!t) {
          this.teams.push(application.team);
        }
      }
    });
    this.updateProjectsList(this.teams, projs);
  }

  updateProjectsList(teams, projs) {
    this.projects = [];
    teams.forEach(team => {
      const p = projs.find(proj => proj._id === team.projectId);
      if (p) {
        if (this.projects.length <= 0) {
          this.projects.push(p);
        } else {
          const p2 = this.projects.find(proj => proj._id === team.projectId);
          if (!p2) {
            this.projects.push(p2);
          }
        }
      }
    });
    this.resultChartComparative(this.spotlightCompetences, this.answers);
  }

  comparativeResultsByProject(project: string) {
    console.log(project);
    const ans = [];
    this.answers.forEach(answer => {
      if (answer.projectId === project && answer !== '') {
        ans.push(answer);
      }
    });
    this.resultChartComparative(this.spotlightCompetences, ans);
  }

  historyChartCompetence(competence) {
    if (competence === '') {
      this.updateHistoryChart(this.spotlightCompetences);
    } else {
      const comp = this.spotlightCompetences.find(c => c.questionCompetence === competence);
      if (comp) {
        this.updateHistoryChart([comp]);
      } else {
        this.updateHistoryChart(this.spotlightCompetences);
      }
    }
  }

  updateHistoryChart(competences) {
    const competenceSeries = [];
    competences.forEach(competence => {
      const tempData = [];
      competence.values.forEach(element => {
        const d = new Date(element.date).getUTCDate();
        const m = new Date(element.date).getUTCMonth();
        const y = new Date(element.date).getUTCFullYear();
        tempData.push([Date.UTC(y, m, d), element.value]);
      });
      this.historySelectedCompetences.push(competence.questionCompetence);
      competenceSeries.push({
        name: competence.questionCompetence,
        showInLegend: true,
        data: tempData
      });
    });
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
            month: '%e/%m',
            year: '%b'
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
        pointFormat: 'Atingiu {point.y:.0f}% em {point.x:%e/%m/%y}: '
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
