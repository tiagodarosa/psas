import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService, SocialUser } from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';

const endpoint = 'https://61914044.us-south.apiconnect.appdomain.cloud/api/v1';

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

  findOrganizationsFromUser() {
    this.getHttpOptions();
    return this.http.get(endpoint + '/organization', this.httpOptions).pipe(
      map(this.extractData));
  }

  deleteOrganization(id: string) {
    this.getHttpOptions();
    return this.http.delete(endpoint + '/organization/' + id, this.httpOptions).pipe(
      map(this.extractData));
  }

  addOrganization(organizationName: string) {
    this.getHttpOptions();
    const body = {
      name: organizationName
    };
    return this.http.post(endpoint + '/organization', body, this.httpOptions).pipe(
      map(this.extractData));
  }

  updateOrganization(organization: object) {
    this.getHttpOptions();
    const org = Object(organization);
    const body = {
      _id: org._id,
      _rev: org._rev,
      name: org.name,
      users: org.users,
      competences: org.competences,
      status: org.status
    };
    console.log(body);
    return this.http.put(endpoint + '/organization/' + org._id, body, this.httpOptions).pipe(
      map(this.extractData));
  }

  findOrganizationById(id: string) {
    this.getHttpOptions();
    return this.http.get(endpoint + '/organization/' + id, this.httpOptions).pipe(
      map(this.extractData));
  }

}
