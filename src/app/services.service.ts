import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService, SocialUser } from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';

const endpoint = 'https://61914044.us-south.apiconnect.appdomain.cloud/psas/v1';

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

  private getUserEmail() {
    this.authService.authState.subscribe((user) => {
      if (user != null) {
        console.log(user);
        return user.email;
      }
    });
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

  findProjectById(id: string) {
    this.getHttpOptions();
    return this.http.get(endpoint + '/project/' + id, this.httpOptions).pipe(
      map(this.extractData));
  }

  findProjectsByOrganizationId(organizationId: string) {
    this.getHttpOptions();
    return this.http.get(endpoint + '/project/findByOrganizationId/' + organizationId, this.httpOptions).pipe(
      map(this.extractData));
  }

  findTeamsFromUser() {
    this.getHttpOptions();
    return this.http.get(endpoint + '/team', this.httpOptions).pipe(
      map(this.extractData));
  }

  addTeam(teamName: string, projId: string) {
    this.getHttpOptions();
    const body = {
      name: teamName,
      projectId: projId,
      members: {
        email: this.getUserEmail(),
        status: 'active'
      }
    };
    return this.http.post(endpoint + '/team', body, this.httpOptions).pipe(
      map(this.extractData));
  }

  deleteTeam(id: string) {
    this.getHttpOptions();
    return this.http.delete(endpoint + '/team/' + id, this.httpOptions).pipe(
      map(this.extractData));
  }

  findTeamById(id: string) {
    this.getHttpOptions();
    return this.http.get(endpoint + '/team/' + id, this.httpOptions).pipe(
      map(this.extractData));
  }

  updateTeam(teamId: string, team: object) {
    this.getHttpOptions();
    const t = Object(team);
    const body = t;
    return this.http.put(endpoint + '/team/' + teamId, body, this.httpOptions).pipe(
      map(this.extractData));
  }

  findAssessmentsFromUser() {
    this.getHttpOptions();
    return this.http.get(endpoint + '/assessment', this.httpOptions).pipe(
      map(this.extractData));
  }

  findAllPublicAssessments() {
    this.getHttpOptions();
    return this.http.get(endpoint + '/assessment/findAllPublic', this.httpOptions).pipe(
      map(this.extractData));
  }

  addAssessment(assessment: object) {
    this.getHttpOptions();
    const a = Object(assessment);
    const body = {
      _id: a._id,
      _rev: a._rev,
      name: a.name,
      organizationId: a.organizationId,
      userCreator: a.userCreator || this.getUserEmail(),
      public: a.public || false,
      tool: a.tool || 'rubric',
      status: a.status || 'active',
      questions: a.questions || []
    };
    return this.http.post(endpoint + '/assessment/', body, this.httpOptions).pipe(
      map(this.extractData));
  }

  deleteAssessment(id: string) {
    this.getHttpOptions();
    return this.http.delete(endpoint + '/assessment/' + id, this.httpOptions).pipe(
      map(this.extractData));
  }

  findAssessmentById(id: string) {
    this.getHttpOptions();
    return this.http.get(endpoint + '/assessment/' + id, this.httpOptions).pipe(
      map(this.extractData));
  }

  updateAssessment(assessment: object) {
    this.getHttpOptions();
    const a = Object(assessment);
    const body = {
      _id: a._id,
      _rev: a._rev,
      name: a.name,
      organizationId: a.organizationId,
      userCreator: a.userCreator || this.getUserEmail(),
      public: a.public || false,
      tool: a.tool || 'rubric',
      status: a.status || 'active',
      questions: a.questions || []
    };
    return this.http.put(endpoint + '/assessment/' + body._id, body, this.httpOptions).pipe(
      map(this.extractData));
  }

  findApplicationsFromUser() {
    this.getHttpOptions();
    return this.http.get(endpoint + '/application', this.httpOptions).pipe(
      map(this.extractData));
  }

  addApplication(name: string, teamId: string, assessmentId: string, type: string, method: string, strategy: string) {
    const body = {
      name,
      teamId,
      assessmentId,
      type,
      method,
      strategy
    };
    this.getHttpOptions();
    return this.http.post(endpoint + '/application', body, this.httpOptions).pipe(
      map(this.extractData));
  }

  deleteApplication(id: string) {
    this.getHttpOptions();
    return this.http.delete(endpoint + '/application/' + id, this.httpOptions).pipe(
      map(this.extractData));
  }

  saveAnswers(applicationId: string, answersArray) {
    this.getHttpOptions();
    const body = {
      answers: answersArray
    };
    return this.http.put(endpoint + '/application/saveAnswers/' + applicationId, body, this.httpOptions).pipe(
      map(this.extractData));
  }

  findProfile(organizationId: string) {
    this.getHttpOptions();
    return this.http.get(endpoint + '/dashboard/findProfile/' + organizationId, this.httpOptions).pipe(
      map(this.extractData));
  }

  findOrganizationProfile(organizationId: string) {
    this.getHttpOptions();
    return this.http.get(endpoint + '/dashboard/findOrganizationProfile/' + organizationId, this.httpOptions).pipe(
      map(this.extractData));
  }

}
