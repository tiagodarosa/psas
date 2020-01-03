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


  public options: any = {
    chart: {
      type: 'scatter',
      height: 400
    },
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter() {
        return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) + 'y: ' + this.y.toFixed(2);
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter() {
          return Highcharts.dateFormat('%e %b %y', this.value);
        }
      }
    },
    series: [
      {
        name: 'Normal',
        turboThreshold: 500000,
        data: []
      },
      {
        name: 'Abnormal',
        turboThreshold: 500000,
        data: []
      }
    ]
  };

  subscription: Subscription;

  constructor(
    private service: ServicesService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private cookie: CookieService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    // Set 10 seconds interval to update data again and again
    // const source = interval(5000);
    this.spinner.hide();
    const apiLink = 'https://api.myjson.com/bins/13lnf4';
    M.AutoInit();

    /*this.subscription = source.subscribe(val => this.getApiResponse(apiLink).then(
      data => {
        const updatedNormalData = [];
        const updatedAbnormalData = [];
        Object(data).forEach(row => {
          const tempRow = [
            new Date(row.timestamp),
            row.value
          ];
          row.Normal === 1 ? updatedNormalData.push(tempRow) : updatedAbnormalData.push(tempRow);
        });
        this.options.series[0].data = updatedNormalData;
        this.options.series[1].data = updatedAbnormalData;
        Highcharts.chart('teste', this.options);
      },
      error => {
        console.log('Something went wrong.');
      })
    );*/
    // this.getApiResponse(apiLink);

    /*Highcharts.chart('competences', {
      chart: {
        type: 'variablepie',
        backgroundColor: 'transparent'
      },
      title: {
        text: null
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}"></span> <b> {point.name}</b><br/>{point.y}%'
      },
      series: [{
          minPointSize: 10,
          innerSize: '60%',
          zMin: 0,
          name: 'countries',
          showInLegend: false,
          dataLabels: {
            enabled: false
          },
          data: [{
              name: 'Conhecimentos',
              y: 33,
              z: 10
          }, {
              name: 'Habilidades',
              y: 33,
              z: 10
          }, {
              name: 'Atitudes',
              y: 34,
              z: 10
          }]
      }]
    });
    $('.highcharts-credits').hide();*/


    /*Highcharts.chart('competences', {
      chart: {
          type: 'packedbubble',
          height: '90%',
          backgroundColor: 'transparent'
      },
      title: {
          text: null
      },
      tooltip: {
          useHTML: true,
          pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
      },
      plotOptions: {
          packedbubble: {
              minSize: '20%',
              maxSize: '100%',
              zMin: 0,
              zMax: 1000,
              layoutAlgorithm: {
                  gravitationalConstant: 0.05,
                  splitSeries: true,
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
          name: 'Conhecimentos',
          showInLegend: false,
          color: '#448AFF',
          data: [{
              name: 'Java',
              value: 767.1
          }, {
              name: 'Trabalho em equipe',
              value: 20.7
          }]
      }, {
          name: 'Habilidades',
          showInLegend: false,
          color: '#4CAF50',
          data: [{
              name: 'Rapidez',
              value: 8.2
          },
          {
              name: 'Cameroon',
              value: 9.2
          }]
      }, {
          name: 'Atitudes',
          showInLegend: false,
          color: '#FF9800',
          data: [{
              name: 'Cordialidade',
              value: 409.4
          },
          {
              name: 'New Zealand',
              value: 34.1
          }]
      }]
    });
    $('.highcharts-credits').hide();

  }*/

  /*getApiResponse(url) {
    return this.http.get(url, {})
      .toPromise().then(res => {
        // return res;
        const updatedNormalData = [];
        const updatedAbnormalData = [];
        Object(res).forEach(row => {
          const tempRow = [
            new Date(row.timestamp),
            row.value
          ];
          row.Normal === 1 ? updatedNormalData.push(tempRow) : updatedAbnormalData.push(tempRow);
        });
        this.options.series[0].data = updatedNormalData;
        this.options.series[1].data = updatedAbnormalData;
        Highcharts.chart('teste', this.options);
        this.spinner.hide();
        }
      );
  }*/
  }
}
