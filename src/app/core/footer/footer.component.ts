import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public token = '';

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  getToken() {
    this.authService.authState.subscribe((user) => {
      if (user != null) {
        this.token = user.idToken;
      }
    });
  }

}
