import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './dashboard-v2.component.html',
  styleUrls: ['./dashboard-v2.component.css']
})
export class DashboardV2Component implements OnInit {

  constructor() { }

  ngOnInit() {
    $('select').formSelect();
  }

}
