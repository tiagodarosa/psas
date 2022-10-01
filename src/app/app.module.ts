import { DatePipe } from '@angular/common';
import { HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AnswerComponent } from './answer/answer.component';
import { AppComponent } from './app.component';
import { ApplicationComponent } from './application/application.component';
import { AssessmentDetailsComponent } from './assessment/assessment-details/assessment-details.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { CompetenceComponent } from './competence/competence.component';
import { BarsChartComponent } from './components/charts/bars-chart/bars-chart.component';
import { ComparisonOfResultsComponent } from './components/charts/comparison-of-results/comparison-of-results.component';
import { HistoryChartComponent } from './components/charts/history-chart/history-chart.component';
import { WordCloudComponent } from './components/charts/word-cloud/word-cloud.component';
import { NineBoxChartComponent } from './components/nine-box-chart/nine-box-chart.component';
import { UserOverviewComponent } from './components/nine-box-chart/user-overview/user-overview.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';
import { AddJourneyAndFeedbackComponent } from './my-journey-and-feedback/add-journey-and-feedback/add-journey-and-feedback.component';
import { DetailsJourneyAndFeedbackComponent } from './my-journey-and-feedback/details-journey-and-feedback/details-journey-and-feedback.component';
import { MyJourneyAndFeedbackComponent } from './my-journey-and-feedback/my-journey-and-feedback.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { OrganizationDetailsComponent } from './organization/organization-details/organization-details.component';
import { OrganizationComponent } from './organization/organization.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { QuestionnaireResultComponent } from './questionnaire-result/questionnaire-result.component';
import { AppRoutingModule } from './routing.module';
import { CustomDateParserFormatter } from './shared/formatter/custom-date-parser-formatter';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { TeamComponent } from './team/team.component';
import { UserComponent } from './user/user.component';

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
    DashboardV2Component,
    ProjectComponent,
    OrganizationDetailsComponent,
    TeamDetailsComponent,
    AssessmentDetailsComponent,
    ApplicationComponent,
    CompetenceComponent,
    ProfileComponent,
    AttendanceComponent,
    AnswerComponent,
    MemberComponent,
    NineBoxChartComponent,
    WordCloudComponent,
    BarsChartComponent,
    ComparisonOfResultsComponent,
    HistoryChartComponent,
    MyJourneyAndFeedbackComponent,
    AddJourneyAndFeedbackComponent,
    DetailsJourneyAndFeedbackComponent,
    UserOverviewComponent,
    QuestionnaireResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
          'https://us-south.functions.cloud.ibm.com/api/v1/web/psas_psas/default',
          'https://us-south.functions.cloud.ibm.com/api/v1/namespaces/7cce1250-d66c-4a8e-a0e4-a83a70a2d77b/'
        ],
        blacklistedRoutes: []
      }
    }),
    NgxSpinnerModule,
    NgbModule
  ],
  providers: [
    DatePipe,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: NgbDateParserFormatter,
      useClass: CustomDateParserFormatter
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
