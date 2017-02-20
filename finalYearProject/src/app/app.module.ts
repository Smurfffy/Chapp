import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages for the app
import { HomePage } from '../pages/home/home';
import { EventIndexPage } from '../pages/event-index/event-index';
import { EventInfoPage } from '../pages/event-info/event-info';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { LoginPage } from '../pages/login/login';
import { MakeEventPage } from '../pages/make-event/make-event';
import { ProfilePage } from '../pages/profile/profile';
import { SignUpPage } from '../pages/sign-up/sign-up';

//Providers for the app
import { Event } from '../providers/event';
import { Authentication } from '../providers/authentication';
import { ProfileProv } from '../providers/profile-prov';

// AngularFire2
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings
const firebaseConfig = {
    apiKey: "AIzaSyDGHjJehgFMxF8d_23B49MTkNT2ItDLHRI",
    authDomain: "finalyearproject-5c665.firebaseapp.com",
    databaseURL: "https://finalyearproject-5c665.firebaseio.com",
    storageBucket: "finalyearproject-5c665.appspot.com",
    messagingSenderId: "720587302382"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password 
}

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
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
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
