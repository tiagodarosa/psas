import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService, SocialUser } from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';

const endpoint = 'https://us-south.functions.cloud.ibm.com/api/v1/web/psas_psas/default/teste.json';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  private token = '';
  private httpOptions = {};

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private authService: AuthService) {
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  private getHttpOptions() {
    this.authService.authState.subscribe((user) => {
      if (user != null) {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: user.idToken
          })
        };
      }
    });
  }

  getProducts() {
    this.getHttpOptions();
    return this.http.get(endpoint, this.httpOptions).pipe(
      map(this.extractData));
  }

}
