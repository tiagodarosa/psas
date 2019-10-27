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
            'Cache-Control':  'no-cache',
            'If-Modified-Since': '0',
            Pragma: 'no-cache',
            Expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
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

  findProjectsFromUser() {
    this.getHttpOptions();
    return this.http.get(endpoint + '/project', this.httpOptions).pipe(
      map(this.extractData));
  }

  addProject(project: object) {
    this.getHttpOptions();
    const proj = Object(project);
    const body = {
      name: proj.name,
      organizationId: proj.organizationId,
      status: proj.status
    };
    return this.http.post(endpoint + '/project', body, this.httpOptions).pipe(
      map(this.extractData));
  }

  deleteProject(id: string) {
    this.getHttpOptions();
    return this.http.delete(endpoint + '/project/' + id, this.httpOptions).pipe(
      map(this.extractData));
  }

  updateProject(project: object) {
    this.getHttpOptions();
    const proj = Object(project);
    const body = {
      _id: proj._id,
      _rev: proj._rev,
      name: proj.name,
      organizationId: proj.organizationId,
      status: proj.status
    };
    return this.http.put(endpoint + '/project/' + body._id, body, this.httpOptions).pipe(
      map(this.extractData));
  }

}
