import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewPlacePage } from "../new-place/new-place";
import { PlacesService } from "../../services/places.service";
/*
  Generated class for the PlaceHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-place-home',
  templateUrl: 'place-home.html'
})
export class PlaceHomePage {

   places: {title: string}[] = [];

  constructor(public navCtrl: NavController, private placesService: PlacesService) {

  }

  ionViewWillEnter() {
    this.places = this.placesService.getPlaces();
  }

  onLoadNewPlace() {
    this.navCtrl.push(NewPlacePage);
  }

}
