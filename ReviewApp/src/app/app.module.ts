
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddReviewPage } from '../pages/add-review-page/add-review-page';
import { Reviews } from '../providers/reviews';
import { MapPage } from '../pages/map/map';
import { ListPage } from '../pages/list/list';
import { Locations } from '../providers/locations';
import { GoogleMaps } from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';
import { ReviewPage } from '../pages/review-list-page/review-list-page';
 
import { AngularFireModule } from 'angularfire2';
import { LoginScreen } from '../pages/loginscreen/loginscreen';
import { AuthProvider} from '../providers/auth-provider'  //Added AuthProvider
import { SignupPage } from '../pages/signup/signup'; //Added signup page
import { ResetPasswordPage } from '../pages/reset-password/reset-password'; //Added reset password page


export const firebaseConfig = {
  apiKey: "AIzaSyACh3rPmwkZ0c--dT58K3_K85LHMZIwf0c",
    authDomain: "ionic2loginpage.firebaseapp.com",
    databaseURL: "https://ionic2loginpage.firebaseio.com",
    projectId: "ionic2loginpage",
    storageBucket: "ionic2loginpage.appspot.com",
    messagingSenderId: "139153490469"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddReviewPage,
    MapPage,
    ListPage,
    ReviewPage,
     SignupPage,
     ResetPasswordPage, //Added signup page
    LoginScreen
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddReviewPage,
    MapPage,
    ListPage,
    ReviewPage,
    LoginScreen,
    ResetPasswordPage,
    SignupPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Locations, GoogleMaps, Connectivity, Reviews, AuthProvider]
})
export class AppModule {}
