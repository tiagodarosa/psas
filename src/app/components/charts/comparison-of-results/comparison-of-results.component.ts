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
  selector: 'app-comparison-of-results',
  templateUrl: './comparison-of-results.component.html',
  styleUrls: ['./comparison-of-results.component.css']
})
export class ComparisonOfResultsComponent implements OnInit {

  @Input() data: { competences: Array<string>, autoResults: Array<any>, leaderResults: Array<any>, pairResults: Array<any> };

  options: any;

  constructor() {
    
  }

  ngOnInit(){
    if (this.data !== undefined)
      Highcharts.chart('comparisson-of-results', this.buildChart());
  }

  reloadChart(data: { competences: Array<string>, autoResults: Array<any>, leaderResults: Array<any>, pairResults: Array<any> }) {
    this.data = data;
    Highcharts.chart('comparisson-of-results', this.buildChart());
  }

  private buildChart(): any {
    return {
      chart: {
        polar: true
      },
      xAxis: {
        categories: this.data.competences || [],
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        gridLineInterpolation: 'circle',
        lineWidth: 0,
        min: 0,
        max: 4
      },
      series: [
        {
          pointPlacement: 'on',
          name: 'Auto',
          type: 'area',
          data: this.data.autoResults
        },
        {
          pointPlacement: 'on',
          name: 'Líder',
          type: 'area',
          data: this.data.leaderResults
        },
        {
          pointPlacement: 'on',
          name: 'Pares',
          type: 'area',
          data: this.data.pairResults
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
