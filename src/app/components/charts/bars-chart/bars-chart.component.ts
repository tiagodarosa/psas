import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-bars-chart',
  templateUrl: './bars-chart.component.html',
  styleUrls: ['./bars-chart.component.css']
})
export class BarsChartComponent implements OnInit {
  
  @Input() data: { totalDiary: number, totalSent: number, totalReceived: number };

  options: any;

  constructor() { }

  ngOnInit(){
    if (this.data !== undefined)
      Highcharts.chart('bars-chart-id', this.buildChart());
  }

  reloadChart(data: { totalDiary: number, totalSent: number, totalReceived: number }) {
    this.data = data;
    Highcharts.chart('bars-chart-id', this.buildChart());
  }

  private buildChart(): any {
    return {
      chart: {
        type: 'column'
      },
      xAxis: {
        categories: [''],
        //crosshair: true
        title: ''
      },
      yAxis: {
        title: 'Valores'
      },
      series: [
        {
          name: 'Diário',
          data: [this.data.totalDiary]
        },
        {
          name: 'Enviados',
          data: [this.data.totalSent]
        },
        {
          name: 'Recebidos',
          data: [this.data.totalReceived]
        }
      ],
      title: {
        text: ''
      }
    }
  }

}
