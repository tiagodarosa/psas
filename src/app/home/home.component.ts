import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teste = {};
  public user: SocialUser;
  public loggedIn: boolean;

  constructor(private authService: AuthService, public service: ServicesService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.spinner.hide();
  }

  pqAvaliarCompetencias() {
    console.log('oi');
  }

  pqAvaliarPares() {
    console.log('oi');
  }

}
