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
  selector: 'app-comparison-of-results',
  templateUrl: './comparison-of-results.component.html',
  styleUrls: ['./comparison-of-results.component.css']
})
export class ComparisonOfResultsComponent implements OnInit {

  options: any;

  constructor() {
    this.buildChart();
  }

  ngOnInit(){
    Highcharts.chart('comparisson-of-results', this.options);
  }

  private buildChart() {
    this.options = {
      chart: {
        polar: true,
        type: 'line'
      },
      xAxis: {
        categories: ['Comunicação', 'Respeito', 'Liderança'],
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'circle',
        lineWidth: 0,
        min: 0
      },
      series: [
        {
          pointPlacement: 'on',
          name: 'Auto',
          data: [4,2,3]
        },
        {
          pointPlacement: 'on',
          name: 'Líder',
          data: [4,4,4]
        },
        {
          pointPlacement: 'on',
          name: 'Pares',
          data: [5, 5, 4]
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
