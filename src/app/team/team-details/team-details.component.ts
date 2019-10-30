import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
    members: [],
    status: ''
  };
  username = '';
  email = '';

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
      this.team.members = result.team.members || [];
      this.team.status = result.team.status || 'active';
      this.spinner.hide();
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
      members: this.team.members,
      status: this.team.status
    };
    this.service.updateTeam(this.teamId, t).subscribe((data) => {
      this.refresh();
    }, (error) => {
      this.router.navigate(['home']);
    });
  }

  addMemberModal() {
    $('.modal').modal();
    $('select').formSelect();
    $('.addUser').modal('open');
  }

  filterUserProfile(profile: string) {
    try  {
      return this.userProfiles.find(userProfile => userProfile.value === profile).description;
    } catch {
      return profile;
    }
  }

  filterUserStatus(status: string) {
    try  {
      return this.userStatus.find(st => st.value === status).description;
    } catch {
      return status;
    }
  }

  addUser(userName: string, userEmail: string, userProfile: string) {
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
