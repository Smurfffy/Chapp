import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { EventIndexPage } from '../pages/event-index/event-index';
import { EventInfoPage } from '../pages/event-info/event-info';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { LoginPage } from '../pages/login/login';
import { MakeEventPage } from '../pages/make-event/make-event';
import { ProfilePage } from '../pages/profile/profile';
import { SignUpPage } from '../pages/sign-up/sign-up';

//Providers
import { Event } from '../providers/event';
import { Authentication } from '../providers/authentication';
import { ProfileProv } from '../providers/profile-prov';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventIndexPage,
    EventInfoPage,
    ForgotPasswordPage,
    LoginPage,
    MakeEventPage,
    ProfilePage,
    SignUpPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventIndexPage,
    EventInfoPage,
    ForgotPasswordPage,
    LoginPage,
    MakeEventPage,
    ProfilePage,
    SignUpPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Event,
    Authentication,
    ProfileProv
  ]
})
export class AppModule {}
