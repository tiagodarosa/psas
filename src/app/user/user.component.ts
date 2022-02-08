import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService, SocialUser,FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;
  public authorizationError: boolean;

  constructor(private authService: AuthService, public router: Router) { }

  env = environment;

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((error) => {
      // console.log(error);
      if (error) {
        this.router.navigate(['organization']);
      } else {
        console.log('An error has occurred while using Google Authorization Service.');
        this.authorizationError = true;
      }
    });
  }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((error) =>{
  //     if (error){
  //       this.router.navigate(['organization'])
  //     } else{
  //       console.log('An error has occured while using Facebook Authorization Service');
  //       this.authorizationError = true;
  //     }
  //   });
  // }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }



}
