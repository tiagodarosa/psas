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
import { ApplicationComponent } from './application/application.component';
import { OrganizationDetailsComponent } from './organization/organization-details/organization-details.component';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { AssessmentDetailsComponent } from './assessment/assessment-details/assessment-details.component';
import { CompetenceComponent } from './competence/competence.component';
import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AnswerComponent } from './answer/answer.component';
import { MemberComponent } from './member/member.component';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { MyJourneyAndFeedbackComponent } from './my-journey-and-feedback/my-journey-and-feedback.component';
import { AddJourneyAndFeedbackComponent } from './my-journey-and-feedback/add-journey-and-feedback/add-journey-and-feedback.component';


const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard-v2', component: DashboardV2Component },
  { path: 'my-journey-and-feedback', component: MyJourneyAndFeedbackComponent },
  { path: 'add-journey-and-feedback', component: AddJourneyAndFeedbackComponent },
  { path: 'help', component: HelpComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'assessment', component: AssessmentComponent },
  { path: 'assessment/:assessmentId', component: AssessmentDetailsComponent },
  { path: 'application', component: ApplicationComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'competence', component: CompetenceComponent },
  { path: 'answer', component: AnswerComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'member', component: MemberComponent },
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
