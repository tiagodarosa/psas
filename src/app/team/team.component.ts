import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
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

  constructor(private service: ServicesService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.getTeams();
    $('select').formSelect();
    $('.modal').modal();
  }

  getTeams() {
    this.service.findTeamsFromUser().subscribe((data) => {
      const teams = Object(data);
      this.teamsCount = Object(teams).count;
      this.teamsList = Object(teams).teams;
      this.service.findProjectsFromUser().subscribe((proj) => {
        const projs = Object(proj);
        this.projectsCount = Object(projs).count;
        this.projectsList = Object(projs).projects;
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
