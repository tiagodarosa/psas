import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

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
      text: 'Sample Scatter Plot'
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
  }

  getApiResponse(url) {
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
  }
}

