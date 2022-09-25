import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CookieService } from 'ngx-cookie-service';
import { ServicesService } from 'src/app/services.service';

declare var require: any;
declare var $: any;

let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.css']
})
export class HistoryChartComponent implements OnInit {

  @Input()
  person: string;

  @Input()
  competence: string;

  
  options: any;
  
  private _organizationId: string;
  private _answers: Array<any>
  private _spotlightCompetences: Array<any>;

  constructor(private service: ServicesService,
              private cookie: CookieService) {
    this._answers = [];
    this._spotlightCompetences = [];
    this._organizationId = this.cookie.get('ORGANIZATIONID');;
    this.loadData();
  }

  ngOnInit(){
  }

  reloadChart(person: string) {
    this.person = person;
    this.loadData();
  }

  private loadData() {
    this.service.findOrganizationProfile(this._organizationId).subscribe(
      {
        next: (data: any) => {
          this._spotlightCompetences = [];
          this._answers = data.answers;
          let compTempArray = [];
          this._answers.forEach(answer => {
            compTempArray.push(answer.questionCompetence);
            if (!this._spotlightCompetences.includes(answer.questionCompetence)) {
              this._spotlightCompetences.push(answer.questionCompetence);
            }
          });
          this.updateHistoryChart(this.person, this.competence);
        }
      }
    );
  }

  private updateHistoryChart(person: string, competence: string) {
    let answ = [];
    console.log(person);
    answ = person !== undefined && person !== '' ? this._answers.filter(a => a.userRated === person) : this._answers;

    const temporary = [];
    const dates = [];
    this._answers.forEach(a => {
      if (!dates.includes(a.endDate)) {
        dates.push(a.endDate);
      }
    });

    this._spotlightCompetences.forEach(function(c, i) {
      temporary[i] = { name: c, showInLegend: true, data: [] };
      dates.forEach(d => {
        let value = 0;
        let count = 0;
        let day = 0;
        let month = 0;
        let year = 0;
        answ.forEach(a => {
          if (a.questionCompetence === c && a.answer !== '' && a.endDate === d) {
            day = new Date(a.endDate).getUTCDate();
            month = new Date(a.endDate).getUTCMonth();
            year = new Date(a.endDate).getUTCFullYear();
            value += Number(a.answer);
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
    competenceSeries.forEach(c => {
      let tempData2 = [];
      let temp = [];
      c.data.forEach(d => {
        const index = temp.findIndex(t => t.date === d[0]);
        if (index === -1) {
          temp.push({date: d[0], values: [d[1]]});
        } else {
          temp[index].values.push(d[1]);
        }
      });
      temp.forEach(t => {
        tempData2.push([t.date, t.values.reduce((a, b) => a + b, 0) / t.values.length]);
      });
      c.data = tempData2;
    });
    console.log(competenceSeries);
    Highcharts.chart('history-chart-id', {
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
        pointFormat: 'Atingiu a média {point.y:.0f} em {point.x:%e/%m/%Y}'
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

}
