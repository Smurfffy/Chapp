
/*
  This is our App.module.ts page. here we need to import all the compontents we created for our app.
  It is important to import the components here otherwise we will not be able to use them in our app.
  Any extra pages, providers, or npm packages we created or intalled are imported here.
  We also connect to our firebase database for authentication here
*/
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddReviewPage } from '../pages/add-review-page/add-review-page'; // Our add review page is imported here
import { Reviews } from '../providers/reviews'; // Our provider for reviews is imported here
import { MapPage } from '../pages/map/map'; // Our Google maps page is imported here
import { ListPage } from '../pages/list/list'; // Our locations list page is imported here
import { Locations } from '../providers/locations'; // Or provider for locations is imported here
import { GoogleMaps } from '../providers/google-maps'; // Our Google maps provider page is imported here 
import { Connectivity } from '../providers/connectivity'; // 
import { ReviewPage } from '../pages/review-list-page/review-list-page'; // our reviews page is imported here
import { AngularFireModule } from 'angularfire2'; // Angular fire is imported here to connect to our firebase database
import { LoginScreen } from '../pages/loginscreen/loginscreen'; // our login page is imported here 
import { AuthProvider} from '../providers/auth-provider'  // Our authentication provider is imported here 
import { SignupPage } from '../pages/signup/signup'; // our signup page is imported here 
import { ResetPasswordPage } from '../pages/reset-password/reset-password'; // Our reset password page is imported here.

import { PlaceHomePage } from '../pages/place-home/place-home';
import { NewPlacePage } from '../pages/new-place/new-place';
import { PlacesService } from '../services/places.service';


/*
  Below we configure our app to connect to our firebase server which has the database for user authenticaion.
*/
export const firebaseConfig = {
  apiKey: "AIzaSyACh3rPmwkZ0c--dT58K3_K85LHMZIwf0c",
    authDomain: "ionic2loginpage.firebaseapp.com",
    databaseURL: "https://ionic2loginpage.firebaseio.com",
    projectId: "ionic2loginpage",
    storageBucket: "ionic2loginpage.appspot.com",
    messagingSenderId: "139153490469"
};

/*
  now that everything is imported we declare the classes in the app here.
*/
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddReviewPage,
    MapPage,
    ListPage,
    ReviewPage,
    SignupPage,
    ResetPasswordPage,
    LoginScreen,
    PlaceHomePage,
    NewPlacePage
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
    SignupPage,
    PlaceHomePage,
    NewPlacePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Locations, GoogleMaps, Connectivity, Reviews, AuthProvider, PlacesService]
})
export class AppModule {}
