import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-place',
  templateUrl: 'place.html'
})
export class PlacePage {

   lat: number;
  lng: number;
  // creates map to be displayed on the page
 constructor(private viewCtrl: ViewController, private navParams: NavParams) {
    this.lat = this.navParams.data.location.lat;
    this.lng = this.navParams.data.location.lng;
  }
//exits the location page.
  onDismiss() {
    this.viewCtrl.dismiss();
  }
}
