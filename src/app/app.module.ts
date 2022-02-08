import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { AppRoutingModule } from './routing.module';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { SocialLoginModule, AuthServiceConfig} from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { FooterComponent } from './core/footer/footer.component';
import { OrganizationComponent } from './organization/organization.component';
import { TeamComponent } from './team/team.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { OrganizationDetailsComponent } from './organization/organization-details/organization-details.component';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { AssessmentDetailsComponent } from './assessment/assessment-details/assessment-details.component';
import { ApplicationComponent } from './application/application.component';
import { CompetenceComponent } from './competence/competence.component';
import { CookieService } from 'ngx-cookie-service';
import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AnswerComponent } from './answer/answer.component';
import { MemberComponent } from './member/member.component';
import { FormsModule } from '@angular/forms';



const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('929484490456-cc41rqbu22rpl9td26v6i4k299mvje7p')
  }
//   ,{ 
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider('5001152149915134')
//   }
]);


export function provideConfig() {
  return config;
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@Injectable()
export class NoCacheHeadersInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authReq = req.clone({
            setHeaders: {
                'Cache-Control': 'no-cache',
                 Pragma: 'no-cache'
            }
        });
        return next.handle(authReq);
    }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    HomeComponent,
    HelpComponent,
    PrivacyComponent,
    ContactComponent,
    FooterComponent,
    OrganizationComponent,
    TeamComponent,
    AssessmentComponent,
    NotfoundComponent,
    DashboardComponent,
    ProjectComponent,
    OrganizationDetailsComponent,
    TeamDetailsComponent,
    AssessmentDetailsComponent,
    ApplicationComponent,
    CompetenceComponent,
    ProfileComponent,
    AttendanceComponent,
    AnswerComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [
          'localhost:4200',
          'us-south.functions.cloud.ibm.com',
          'https://us-south.functions.cloud.ibm.com/*',
          'https://us-south.functions.cloud.ibm.com/',
          'https://us-south.functions.cloud.ibm.com/api/v1/web/psas_psas/default/teste.json',
          'https://us-south.functions.cloud.ibm.com/api/v1/web/psas_psas/default/',
          'https://us-south.functions.cloud.ibm.com/api/v1/web/psas_psas/default'
        ],
        blacklistedRoutes: []
      }
    }),
    NgxSpinnerModule,
    FormsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
