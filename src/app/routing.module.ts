import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { OrganizationComponent } from './organization/organization.component';
import { ProjectComponent } from './project/project.component';
import { TeamComponent } from './team/team.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrganizationDetailsComponent } from './organization/organization-details/organization-details.component';
import { TeamDetailsComponent } from './team/team-details/team-details.component';


const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'help', component: HelpComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'assessment', component: AssessmentComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'organization/:organizationId', component: OrganizationDetailsComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'team', component: TeamComponent },
  { path: 'team/:teamId', component: TeamDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
