import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('929484490456-cc41rqbu22rpl9td26v6i4k299mvje7p')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Facebook-App-Id')
  }
]);

export function provideConfig() {
  return config;
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
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
