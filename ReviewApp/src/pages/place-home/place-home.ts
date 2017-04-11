import { Component } from '@angular/core';

import { ModalController, NavController } from 'ionic-angular';
import { NewPlacePage } from "../new-place/new-place";
import { PlacesService } from "../../services/places.service";
//import { PlacePage } from '../place-hom/place';
import { Place } from '../../model/place.model';
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

  constructor(
    public navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController) {

  }

  ionViewWillEnter() {
    this.placesService.getPlaces()
      .then(
        (places) => this.places = places
      );
  }

  onLoadNewPlace() {
    this.navCtrl.push(NewPlacePage);
  }

  onOpenPlace(place: Place) {
    //this.modalCtrl.create(PlacePage, place).present();
  }

}
