import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  teamId = '';
  team = {
    _id: '',
    _rev: '',
    name: '',
    projectId: '',
    members: [],
    status: ''
  };
  username = '';
  email = '';
  organizationUsers = [];
  userList = [];

  userProfiles = [
    {value: 'organizationManager', description: 'Gerente da organização'},
    {value: 'projectManager', description: 'Gerente de projetos'},
    {value: 'teamManager', description: 'Gerente de equipes'},
    {value: 'organizationMember', description: 'Membro da organização'}
  ];

  userStatus = [
    {value: 'active', description: 'Ativo'},
    {value: 'inactive', description: 'Inativo'},
    {value: 'deleted', description: 'Excluído'}
  ];

  constructor(
    private route: ActivatedRoute,
    private service: ServicesService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      this.teamId = params.get('teamId');
      this.refresh();
    });
  }

  refresh() {
    this.service.findTeamById(this.teamId).subscribe((data) => {
      const result = Object(data);
      this.team._id = result.team._id || '';
      this.team._rev = result.team._rev;
      this.team.name = result.team.name || '';
      this.team.projectId = result.team.projectId || '';
      this.team.members = result.team.members || [];
      this.team.status = result.team.status || 'active';
      this.service.findProjectById(this.team.projectId).subscribe((data2) => {
        const proj = Object(data2);
        this.service.findOrganizationById(proj.project.organizationId).subscribe((data3) => {
          const org = Object(data3);
          this.organizationUsers = org.users;
          this.filterUsersNotInTeam();
          this.spinner.hide();
        }, (error) => {
          this.router.navigate(['home']);
        });
      }, (error) => {
        this.router.navigate(['home']);
      });
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  editTeamModal() {
    $('.modal').modal();
    $('.deleteOrganization').modal('open');
  }

  updateTeam(teamName: string) {
    this.spinner.show();
    const t = {
      _id: this.teamId,
      _rev: this.team._rev,
      name: teamName,
      projectId: this.team.projectId,
      members: this.team.members,
      status: this.team.status
    };
    this.service.updateTeam(this.teamId, t).subscribe((data) => {
      this.refresh();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  filterUsersNotInTeam() {
    const users = [];
    this.team.members.forEach(function teste(u) {
      users.push(u.email);
    });
    this.userList = this.organizationUsers.filter(user => !users.includes(user.email));
  }

  addMemberModal() {
    console.log(this.userList);
    $('.modal').modal();
    $('select').formSelect();
    $('.addMember').modal('open');
  }

  filterUserProfile(profile: string) {
    try  {
      return this.userProfiles.find(userProfile => userProfile.value === profile).description;
    } catch {
      return profile;
    }
  }

  findName(email: string) {
    try  {
      return this.organizationUsers.find(user => user.email === email).name;
    } catch {
      return '';
    }
  }

  filterUserStatus(status: string) {
    try  {
      return this.userStatus.find(st => st.value === status).description;
    } catch {
      return status;
    }
  }

  addUser(userEmail: string) {
    this.spinner.show();
    const user = {
      email: userEmail,
      status: 'active'
    };
    this.team.members.push(user);
    this.updateTeam(this.team.name);
  }

  deleteUserModal(userName: string, userEmail: string) {
    this.username = userName;
    this.email = userEmail;
    $('.modal').modal();
    $('.deleteUser').modal('open');
  }

  deleteUser(userEmail: string) {
    this.spinner.show();
    let tempUser = this.team.members.find(user => user.email === userEmail);
    const index = this.team.members.indexOf(tempUser);
    tempUser.status = 'deleted';
    this.team.members.splice(index, 1);
    this.team.members.push(tempUser);
    this.updateTeam(this.team.name);
  }

}
