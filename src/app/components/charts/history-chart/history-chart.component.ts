import { Component, OnInit } from '@angular/core';
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
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.css']
})
export class HistoryChartComponent implements OnInit {

  options: any;

  constructor() {
    this.buildChart();
  }

  ngOnInit(){
    Highcharts.chart('history-chart-id', this.options);
  }

  private buildChart() {
    this.options = {
      chart: {
        type: 'area'
      },
      xAxis: {},
      yAxis: {},
      series: [
        {
          name: 'SUM Comunicação',
          data: [4, 2, 3]
        },
        {
          name: 'SUM de Qualidade',
          data: [4, 4, 4]
        },
        {
          name: 'SUM de Negociação',
          data: [1, 5, 4]
        },
        {
          name: 'SUM de Conhecimento',
          data: [4, 5, 4]
        },
        {
          name: 'SUM de Relac. interpessoal',
          data: [3, 3, 4]
        },
        {
          name: 'SUM de Responsabilidade',
          data: [2, 5, 4]
        },
        {
          name: 'SUM de Iniciativa',
          data: [3, 2, 1]
        },
        {
          name: 'SUM de Criatividade e inovação',
          data: [1, 5, 4]
        }
      ],
      accessibility: {
        screenReaderSection: {
            beforeChartFormat: ''
        }
      },
      title: {
        text: ''
      }
    }
  }

}
