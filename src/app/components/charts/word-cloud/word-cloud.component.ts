import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
export class WordCloudComponent implements AfterViewInit {
  
  @Input() data: Array<any>;

  options: any;

  constructor() {
    this.loadComponent();
  }

  ngAfterViewInit() {
  }

  reloadChart(data: Array<any>) {
    this.data = data;
    Highcharts.chart('container', this.buildChart());
  }

  private loadComponent() {
    setTimeout(() => {
      if (this.data === undefined || this.data.length === 0)
        this.loadComponent();
      else
        Highcharts.chart('container', this.buildChart());
    }, 500);
  }

  private buildChart(): any {
    return {
      series: [{
        type: 'wordcloud',
        name: 'Ocorrencias',
        data: this.data
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
