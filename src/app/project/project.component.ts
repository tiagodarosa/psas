import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectsList = [];
  projectsCount = 0;
  organizationsList = [];
  projectName = '';
  projectId = '';
  projectOrganizationId = '';

  constructor(private service: ServicesService, private spinner: NgxSpinnerService, private router: Router) { }

  async ngOnInit() {
    this.spinner.show();
    this.getOrganizationsAndProjects();
    $('select').formSelect();
    $('.modal').modal();
  }

  getOrganizationsAndProjects() {
    this.projectsList = [];
    this.projectsCount = 0;
    this.organizationsList = [];
    this.projectName = '';
    this.projectId = '';
    this.projectOrganizationId = '';
    this.service.findOrganizationsFromUser().subscribe((data) => {
      const organizations = Object(data);
      this.organizationsList = Object(organizations).organizationList;
      this.service.findProjectsFromUser().subscribe((dataProject) => {
        const projects = Object(dataProject);
        this.projectsList = Object(projects).projects;
        this.projectsCount = this.projectsList.length;
        this.spinner.hide();
      }, (error) => {
        this.router.navigate(['home']);
      });
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  filterOrgOfProject(orgId: string) {
    try  {
      return this.organizationsList.find(org => org._id === orgId).name;
    } catch {
      return '';
    }
  }

  addProjectModal() {
    this.projectName = '';
    $('select').formSelect();
    $('.modal').modal();
    $('.newProject').modal('open');
  }

  addProject(projectName: string, orgId: string) {
    this.spinner.show();
    const project = {
      name: projectName,
      organizationId: orgId,
      status: 'active'
    };
    this.service.addProject(project).subscribe((data) => {
      this.getOrganizationsAndProjects();
    }, (error) => {
      this.router.navigate(['home']);
    });
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
      this.getOrganizationsAndProjects();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  editProjectModal(projectId: string) {
    $('select').formSelect();
    const project = this.projectsList.find(proj => proj._id === projectId);
    this.projectId = projectId;
    this.projectName = project.name;
    this.projectOrganizationId = project.organizationId;
    $('.modal').modal();
    $('.editProject').modal('open');
  }

  updateProject(projectId: string, projName: string, orgId: string) {
    this.spinner.show();
    const project = this.projectsList.find(proj => proj._id === projectId);
    project.name = projName;
    project.organizationId = orgId;
    this.service.updateProject(project).subscribe((data) => {
      this.getOrganizationsAndProjects();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

}
