import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let WordCloud = require('highcharts/modules/wordcloud');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
WordCloud(Highcharts);

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit {
  
  options: any;

  constructor() {
    this.buildChart();
  }

  ngOnInit(){
    Highcharts.chart('container', this.options);
  }

  private buildChart() {
    this.options = {
      series: [{
        type: 'wordcloud',
        name: 'Ocorrencias',
        data: [
          {
            name: 'Comprometimento',
            weight: 10
          },
          {
            name: 'Empatia',
            weight: 3
          },
          {
            name: 'Resiliência',
            weight: 19
          },
          {
            name: 'Persistência',
            weight: 30
          },
          {
            name: 'Paciência',
            weight: 18
          },
          {
            name: 'Amor',
            weight: 2
          },
          {
            name: 'Respeito',
            weight: 10
          },
        ]
      }],
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
