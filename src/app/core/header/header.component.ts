import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: SocialUser;
  public loggedIn: boolean;
  public home: boolean;

  constructor(private authService: AuthService, public jwtHelper: JwtHelperService, private router: Router) {  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['home']);
  }

  ngOnInit() {
    if (this.router.url === '/home') {
      this.home = true;
    } else {
      this.home = false;
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.home === false && this.loggedIn === false) {
        this.router.navigate(['home']);
      }
    });
  }

}
