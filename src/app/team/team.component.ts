import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
declare var M: any;

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
  organization = {
    users: []
  };
  userEmail = '';
  userProfile = '';
  team = {
    _id: '',
    _rev: '',
    name: '',
    projectId: '',
    projectName: '',
    status: '',
    members: [],
  };
  membersNotInTeam = [];
  temporaryTeamMembers = [];

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
      const projs = Object(data).projects;
      projs.forEach(p => {
        if (p.organizationId === this.organizationId) {
          this.projectsList.push(p);
        }
      });
      const tList = Object(data).teams;
      tList.forEach(t => {
        if (this.projectsList.some(p => p._id === t.projectId)) {
          this.teamsList.push(t);
        }
      });
      this.teamsCount = this.teamsList.length;
      this.projectsCount = this.projectsList.length;
      this.teamsList.sort(this.compare);
      this.organization.users = Object(data).organizations.find(org => org._id === this.organizationId).users;
      this.spinner.hide();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  findName(email: string) {
    try {
      if (email) {
        return this.organization.users.find(u => u.email === email).name || '';
      } else {
        return '';
      }
    } catch {
      return email;
    }
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

  editTeamModal(teamId: string) {
    this.teamId = teamId;
    this.team = this.teamsList.find(team => team._id === teamId);
    $('#editName').val(this.team.name);
    $('#editProject').val(this.team.projectId);
    M.updateTextFields();
    $('.modal').modal();
    $('select').formSelect();
    $('.editTeam').modal('open');
  }

  compare(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  editTeam(name: string, projectId: string) {
    if (this.team.name !== name || this.team.projectId !== projectId) {
      if (name !== '') {
        this.spinner.show();
        this.team.name = name;
        this.team.projectId = projectId;
        this.team.projectName = this.projectsList.find(p => p._id === projectId).name;
        this.service.updateTeam(this.teamId, this.team).subscribe((data) => {
          const result = Object(data);
          if (result.status) {
            const rev = result.status.rev;
            this.team._rev = rev;
            this.teamsList = this.teamsList.filter(t => t._id !== this.teamId);
            this.teamsList.push(this.team);
            this.teamsList.sort(this.compare);
            this.spinner.hide();
            M.toast({html: 'Equipe alterada com sucesso!'});
          } else {
            this.spinner.hide();
            M.toast({html: 'Ocorreu algum erro ao editar a equipe. Por favor, tente novamente!'});
          }
        }, (error) => {
          M.toast({html: 'Ocorreu algum erro ao editar a equipe. Por favor, tente novamente!'});
        });
      } else {
        M.toast({html: 'Favor preencher todos os campos!'});
      }
    } else {
      M.toast({html: 'Equipe alterada com sucesso!'});
    }
  }

  initializeComponents() {
    setTimeout(this.initializeComponents, 200);
    $('select').formSelect();
  }

  addMemberToTeam(email: string) {
    this.temporaryTeamMembers.push(this.organization.users.find(user => user.email === email));
    this.checkMembersNotInTeam(this.temporaryTeamMembers);
    $('select').formSelect();
    M.updateTextFields();
    this.initializeComponents();
  }

  deleteMemberOfTeam(email: string) {
    console.log(email);
    this.temporaryTeamMembers = this.temporaryTeamMembers.filter(user => user.email !== email);
    // this.temporaryTeamMembers.push(this.organization.users.find(user => user.email === email));
    this.checkMembersNotInTeam(this.temporaryTeamMembers);
    $('select').formSelect();
    M.updateTextFields();
    this.initializeComponents();
  }

  checkMembersNotInTeam(teamMembers) {
    this.membersNotInTeam = [];
    this.organization.users.forEach(user => {
      if (!teamMembers.find(member => member.email === user.email)) {
        this.membersNotInTeam.push(user);
      }
    });
  }

  editTeamMembers() {
    console.log(this.temporaryTeamMembers);
    if (this.temporaryTeamMembers.length > 0) {
      this.spinner.show();
      this.team.members = this.temporaryTeamMembers;
      this.service.updateTeam(this.teamId, this.team).subscribe((data) => {
        this.temporaryTeamMembers = [];
        const result = Object(data);
        if (result.status) {
          const rev = result.status.rev;
          this.team._rev = rev;
          this.teamsList = this.teamsList.filter(t => t._id !== this.teamId);
          this.teamsList.push(this.team);
          this.teamsList.sort(this.compare);
          this.spinner.hide();
          M.toast({html: 'Equipe alterada com sucesso!'});
        } else {
          this.spinner.hide();
          M.toast({html: 'Ocorreu algum erro ao editar a equipe. Por favor, tente novamente!'});
        }
      }, (error) => {
        M.toast({html: 'Ocorreu algum erro ao editar a equipe. Por favor, tente novamente!'});
      });
    } else {
      M.toast({html: 'A equipe deve ter pelo menos um membro!'});
    }
  }

  editMembersModal(teamId: string) {
    this.temporaryTeamMembers = [];
    this.teamId = teamId;
    this.team = this.teamsList.find(team => team._id === teamId);
    this.temporaryTeamMembers = JSON.parse(JSON.stringify(this.team.members));
    this.checkMembersNotInTeam(this.temporaryTeamMembers);
    $('select').formSelect();
    M.updateTextFields();
    $('.modal').modal();
    $('.editMembers').modal('open');
    this.initializeComponents();
  }

}
