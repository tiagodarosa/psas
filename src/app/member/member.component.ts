import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import Validator from 'validator';
import { getMaxListeners } from 'process';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  members = [];
  organizationId = '';
  organization = {};
  userEmail = '';
  userProfile = '';

  userToDelete = '';

  userProfiles = [
    { value: 'organizationManager', description: 'Gerente da organização' },
    { value: 'projectManager', description: 'Gerente de projetos' },
    { value: 'teamManager', description: 'Gerente de equipes' },
    { value: 'organizationMember', description: 'Membro da organização' }
  ];

  constructor(
    private service: ServicesService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private cookie: CookieService,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.organizationId = this.cookie.get('ORGANIZATIONID');
    console.log(this.organizationId);
    this.authService.authState.subscribe((user) => {
      this.userEmail = user.email;
      this.getOrganization();
    });
  }

  getOrganization() {
    this.service.findOrganizationById(this.organizationId).subscribe((data) => {
      const organization = Object(data);
      this.members = Object(organization).users || [];
      this.organization = Object(organization);
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
      return this.cookie.get('ORGANIZATIONMEMBERPROFILE');
    }
  }

  filterUserProfile(profile: string) {
    try {
      return this.userProfiles.find(userProfile => userProfile.value === profile).description;
    } catch {
      return profile;
    }
  }

  addMemberModal() {
    $('#name').val('');
    $('#email').val('');
    $('select').formSelect();
    $('.modal').modal();
    $('.newMember').modal('open');
  }

  editMemberModal(email: string) {
    const user = this.members.find(u => u.email === email);
    $('#editName').val(user.name);
    $('#editEmail').val(user.email);
    $('#editProfile').val(user.profile);
    M.updateTextFields();
    $('select').formSelect();
    $('.modal').modal();
    $('.editMember').modal('open');
  }

  deleteMemberModal(email: string) {
    if (email === this.userEmail) {
      M.toast({ html: 'Você não pode excluir você mesmo da organização!' });
    } else {
      this.userToDelete = email;
      $('select').formSelect();
      $('.modal').modal();
      $('.deleteMember').modal('open');
    }
  }

  addMember(name: string, email: string, profile: string) {
    if (name !== '' && email !== '' && profile !== '') {
      const user = this.members.find(u => u.email === email);
      const ifmailvalid = Validator.isEmail(email);
      if (user) {
        M.toast({ html: 'O e-mail informado já está cadastrado na organização!' });

      } else if (!ifmailvalid) { 
        M.toast({html: 'Email inválido'});
      }
      else {
        this.spinner.show();
        const u = { name, email, profile, status: 'active' };
        this.members.push(u);
        Object(this.organization).users = this.members;
        this.service.updateOrganization(this.organization).subscribe((data) => {
          this.spinner.hide();
          M.toast({ html: 'Pessoa adicionada com sucesso!' });
        }, (error) => {
          M.toast({ html: 'Ocorreu algum erro ao adicionar a pessoa. Por favor, tente novamente!' });
        });
      }
    } else if ((name === '' || email === '' || profile === '')) {
      M.toast({ html: 'Favor preencher todos os campos!' });
    }
  }

  deleteMember() {
    if (this.userToDelete !== '') {
      let user = this.members.find(u => u.email === this.userToDelete);
      if (user) {
        this.spinner.show();
        user.status = 'deleted';
        this.members = this.members.filter(member => member.email !== this.userToDelete);
        this.members.push(user);
        Object(this.organization).users = this.members;
        this.service.updateOrganization(this.organization).subscribe((data) => {
          this.members = this.members.filter(member => member.email !== this.userToDelete);
          this.spinner.hide();
          this.userToDelete = '';
          M.toast({ html: 'Pessoa excluída com sucesso!' });
        }, (error) => {
          M.toast({ html: 'Ocorreu algum erro ao excluir a pessoa da organização. Por favor, tente novamente!' });
        });
      } else {
        M.toast({ html: 'Estranho... E-mail não encontrado! Por favor, tente novamente!' });
      }
    } else {
      M.toast({ html: 'Estranho... E-mail não encontrado! Por favor, tente novamente!' });
    }
  }

  editMember(name: string, email: string, profile: string) {
    if (name !== '' && email !== '' && profile !== '') {
      let user = this.members.find(u => u.email === email);
      if (user) {
        this.spinner.show();
        user.name = name;
        user.email = email;
        user.profile = profile;
        this.members = this.members.filter(member => member.email !== email);
        this.members.push(user);
        Object(this.organization).users = this.members;
        this.service.updateOrganization(this.organization).subscribe((data) => {
          this.spinner.hide();
          M.toast({ html: 'Informações da pessoa atualizadas com sucesso!' });
        }, (error) => {
          console.error(error);
          M.toast({ html: 'Ocorreu algum erro na edição dos dados da pessoa. Por favor, tente novamente!' });
        });
      } else {
        M.toast({ html: 'Estranho... E-mail não encontrado! Por favor, tente novamente!' });
      }
    } else {
      M.toast({ html: 'Favor preencher todos os campos!' });
    }
  }

}
