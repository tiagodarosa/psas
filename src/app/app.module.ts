import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { AppRoutingModule } from './routing.module';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { FooterComponent } from './core/footer/footer.component';
import { OrganizationComponent } from './organization/organization.component';
import { TeamComponent } from './team/team.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('929484490456-cc41rqbu22rpl9td26v6i4k299mvje7p')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('535368723864853')
  }
]);

export function provideConfig() {
  return config;
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
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
    DashboardComponent
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
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
