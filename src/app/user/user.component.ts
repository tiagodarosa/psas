import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
<<<<<<< HEAD
import { AuthService, SocialUser,FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
=======
import { AuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
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
<<<<<<< HEAD
      // console.log(error);
=======
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
      if (error) {
        this.router.navigate(['organization']);
      } else {
        console.log('An error has occurred while using Google Authorization Service.');
        this.authorizationError = true;
      }
    });
  }

<<<<<<< HEAD
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
=======
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

<<<<<<< HEAD
  signOut(): void {
    this.authService.signOut();
  }



=======
>>>>>>> 5caf4ad23b584424c65f3c809fd185d975ccb9e3
}
