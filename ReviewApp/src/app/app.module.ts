
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

export const firebaseConfig = {
  apiKey: '******',
  authDomain: '******',
  databaseURL: '******',
  storageBucket: '******',
  messagingSenderId: '******'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddReviewPage,
    MapPage,
    ListPage,
    ReviewPage,
    LoginScreen
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddReviewPage,
    MapPage,
    ListPage,
    ReviewPage,
    LoginScreen
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Locations, GoogleMaps, Connectivity, Reviews]
})
export class AppModule {}
