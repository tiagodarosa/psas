import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'angularx-social-login';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectsList = [];
  projectsCount = 0;
  organizationId = '';
  organizationsList = [];
  organization = {};
  projectName = '';
  userEmail = '';
  userProfile = '';
  projectId = '';

  constructor(
    private service: ServicesService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private cookie: CookieService,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.organizationId = this.cookie.get('ORGANIZATIONID');
    this.authService.authState.subscribe((user) => {
      this.userEmail = user.email;
      this.getProjects();
    });
    $('select').formSelect();
    $('.modal').modal();
    M.AutoInit();
  }

  getProjects() {
    this.projectsList = [];
    this.projectsCount = 0;
    this.projectName = '';
    this.projectId = '';
    this.service.findProjectsByOrganizationId(this.organizationId).subscribe((data) => {
      const projects = Object(data);
      this.projectsList = Object(projects).projects;
      this.projectsCount = this.projectsList.length;
      this.organization = Object(projects).organization;
      this.userProfile = this.getUserProfile(this.organization);
      this.spinner.hide();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  getUserProfile(organization) {
    const users = organization.users;
    const user = users.find(u => u.email === this.userEmail);
    if (user) {
      return user.profile;
    } else {
      return '';
    }
  }

  addProjectModal() {
    this.projectName = '';
    $('select').formSelect();
    M.updateTextFields();
    $('.modal').modal();
    $('.newProject').modal('open');
  }

  addProject(projectName: string) {
    if(projectName === ''){
      M.toast({html:'Projeto inválido'});
    }else{
      this.spinner.show();
      const project = {
        name: projectName,
        organizationId: this.organizationId,
        status: 'active'
      };
      this.service.addProject(project).subscribe((data) => {
        this.getProjects();
        M.toast({html: 'Projeto adicionado com sucesso!'});
      }, (error) => {
        this.router.navigate(['home']);
      });
    }
  }

  deleteProjectModal(projectId: string) {
    const project = this.projectsList.find(proj => proj._id === projectId);
    this.projectId = projectId;
    this.projectName = project.name;
    $('.modal').modal();
    $('.deleteProject').modal('open');
  }

  deleteProject(projectId: string) {
    this.spinner.show();
    this.service.deleteProject(projectId).subscribe((data) => {
      this.getProjects();
      M.toast({html: 'Projeto excluído com sucesso!'});
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  editProjectModal(projectId: string) {
    $('select').formSelect();
    const project = this.projectsList.find(proj => proj._id === projectId);
    this.projectId = projectId;
    this.projectName = project.name;
    $('#projNameEdit').val(project.name);
    M.updateTextFields();
    $('.modal').modal();
    $('.editProject').modal('open');
  }

  updateProject(projectId: string, projName: string) {
    this.spinner.show();
    const project = this.projectsList.find(proj => proj._id === projectId);
    project.name = projName;
    project.organizationId = this.organizationId;
    this.service.updateProject(project).subscribe((data) => {
      this.getProjects();
      M.toast({html: 'Projeto atualizado com sucesso!'});
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

}
