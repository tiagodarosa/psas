import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamsCount = 0;
  teamsList = [];
  teamId = '';
  teamName = '';
  teamProjectId = '';
  projectsCount = 0;
  projectsList = [];
  organizationId = '';
  organizationName = '';
  userEmail = '';
  userProfile = '';

  constructor(
    private service: ServicesService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.organizationId = this.cookie.get('ORGANIZATIONID');
    this.organizationName = this.cookie.get('ORGANIZATIONNAME');
    this.userProfile = this.cookie.get('ORGANIZATIONMEMBERPROFILE');
    this.authService.authState.subscribe((user) => {
      this.userEmail = user.email;
      this.getTeams();
    });
    $('select').formSelect();
    $('.modal').modal();
  }

  getTeams() {
    this.teamsList = [];
    this.projectsList = [];
    this.service.findTeamsFromUser().subscribe((data) => {
      const teams = Object(data);
      this.service.findProjectsFromUser().subscribe((proj) => {
        const projs = Object(proj).projects;
        projs.forEach(p => {
          if (p.organizationId === this.organizationId) {
            this.projectsList.push(p);
          }
        });
        const tList = Object(teams).teams;
        tList.forEach(t => {
          if (this.projectsList.some(p => p._id === t.projectId)) {
            this.teamsList.push(t);
          }
        });
        this.teamsCount = this.teamsList.length;
        this.projectsCount = this.projectsList.length;
        this.spinner.hide();
      }, (error) => {
        this.router.navigate(['home']);
      });
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  findProjectName(projectId: string) {
    const project = this.projectsList.find(p => p._id === projectId);
    return project.name || '';
  }

  deleteTeamModal(teamId: string) {
    const team = this.teamsList.find(t => t._id === teamId);
    this.teamId = teamId;
    this.teamName = team.name;
    $('.modal').modal();
    $('.deleteTeam').modal('open');
  }

  deleteTeam(teamId: string) {
    this.spinner.show();
    this.service.deleteTeam(teamId).subscribe((data) => {
      this.getTeams();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  addTeamModal() {
    this.teamId = '';
    this.teamName = '';
    $('.modal').modal();
    $('select').formSelect();
    $('.addTeam').modal('open');
  }

  addTeam(name: string, projectId: string) {
    this.spinner.show();
    this.service.addTeam(name, projectId).subscribe((data) => {
      this.getTeams();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

}
