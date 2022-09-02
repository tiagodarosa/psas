import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: SocialUser;
  public loggedIn: boolean;
  public sidenav: boolean;
  public organizationName = 'PSAS';
  public organizations = [
    { name: 'teste'},
    { name: 'teste2'}
  ];

  constructor(
    private authService: AuthService,
    public jwtHelper: JwtHelperService,
    private router: Router,
    private service: ServicesService,
    private cookie: CookieService,
    private spinner: NgxSpinnerService) {  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['home']);
  }

  ngOnInit() {
    if (this.router.url === '/home' || this.router.url === '/organization') {
      this.sidenav = false;
    } else {
      this.sidenav = true;
      if (this.cookie.check('ORGANIZATIONNAME')) {
        this.organizationName = this.cookie.get('ORGANIZATIONNAME');
      }
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.sidenav === false && this.loggedIn === false) {
        this.router.navigate(['home']);
      }
    });
    $('.dropdown-trigger').dropdown();
  }

  getOrganizations() {
    this.service.findOrganizationsFromUser().subscribe((data) => {
      const orgs = Object(data);
      // this.organizations = Object(orgs).organizationList;
      this.spinner.hide();
      $('.dropdown-trigger').dropdown();
    }, (error) => {
      this.spinner.hide();
    });
  }

}
