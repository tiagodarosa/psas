import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from '../services.service';
import MyJourneyAndFeedbackData from '../shared/data/my-journey-and-feedback-data';

declare var $: any;

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './dashboard-v2.component.html',
  styleUrls: ['./dashboard-v2.component.css']
})
export class DashboardV2Component implements OnInit {

  wcData: Array<any>;

  private _organizationId: string;

  constructor(private router: Router,
              private cookie: CookieService,
              private spinner: NgxSpinnerService,
              private authService: AuthService,
              private service: ServicesService) {
    this._organizationId = this.cookie.get('ORGANIZATIONID');
    this.wcData = [];
  }

  ngOnInit() {
    $('select').formSelect();
    this.loadWordCloudData();
  }

  onDetailsJourneyAndFeedback() {
    this.router.navigate(['details-journey-and-feedback']);
  }

  private loadWordCloudData() {
    this.wcData = [];
    this.authService.authState.subscribe((user) => {
      const param: MyJourneyAndFeedbackData = new MyJourneyAndFeedbackData();
      param.informationType = 2;
      param.recipient = user.email;
      this.service.findJourneyAndFeedback(param).subscribe(
        (response: any) => {
          response.docs.forEach((el: any) => {
            if (el.params.relatedSkills !== undefined) {
              el.params.relatedSkills.forEach((el:string) => {
                const relSklTemp = this.wcData.find(it => it.name === el);
                if (relSklTemp !== undefined) relSklTemp.weight++;
                else this.wcData.push({ name: el, weight: 1 });
              });
            }
          });
        }
      )
    });
  }

}
