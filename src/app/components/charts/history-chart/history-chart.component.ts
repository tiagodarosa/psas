import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CookieService } from 'ngx-cookie-service';
import { ServicesService } from 'src/app/services.service';

declare var require: any;
declare var $: any;
declare var M: any;

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
export class HistoryChartComponent implements OnInit, AfterViewInit {

  @Input()
  person: string;

  @Input()
  competence: string;

  @Input()
  showData: boolean;

  competenceSeries: Array<any>;
  rows: Array<number>;
  options: any;
  application: any;
  
  private _organizationId: string;
  private _answers: Array<any>
  private _spotlightCompetences: Array<any>;

  constructor(private service: ServicesService,
              private cookie: CookieService) {
    this.competenceSeries = [];
    this._answers = [];
    this._spotlightCompetences = [];
    this.rows = [];
    this.application = {};
    this._organizationId = this.cookie.get('ORGANIZATIONID');
    this.loadData();
  }

  ngOnInit(){
  }

  ngAfterViewInit(): void {
    let dtElems = document.querySelectorAll('.datepicker');
    let selElems = document.querySelectorAll('select');
    M.Datepicker.init(dtElems, {});
    M.FormSelect.init(selElems, {});
  }

  reloadChart(person: string) {
    this.person = person;
    this.loadData();
  }

  getData(index: number, data: any) {
    let arr: Array<any> = data[index];
    return Number(arr[1]).toFixed(1);
  }

  private loadData() {
    this.service.findOrganizationProfile(this._organizationId).subscribe(
      {
        next: (data: any) => {
          this._spotlightCompetences = [];
          this._answers = data.answers;
          this.application = data.applications[0];
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

    if (competence !== '') {
      temporary.forEach(t => {
        if (t.name === competence) {
          this.competenceSeries.push(t);
        }
      });
    } else {
      this.competenceSeries = temporary;
    }
    this.competenceSeries.forEach(c => {
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

    this.rows = this.competenceSeries[0].data.map((el: any) => 1);

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
      series: this.competenceSeries
    });
    $('.highcharts-credits').hide();
  }

}
