
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
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddReviewPage,
    MapPage,
    ListPage
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
    ListPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Locations, GoogleMaps, Connectivity, Reviews]
})
export class AppModule {}
