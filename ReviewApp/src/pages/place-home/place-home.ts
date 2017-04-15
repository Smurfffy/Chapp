import { Component } from '@angular/core';

import { ModalController, NavController } from 'ionic-angular';
import { NewPlacePage } from "../new-place/new-place"; //imports the new place page so users can navigate to it
import { PlacesService } from "../../services/places.service"; //imports the places service
import { PlacePage } from '../place/place'; // imports the place page so users can view the saved place.
import { Place } from '../../model/place.model'; // imports the modal that loads when displaying a saved place.
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

   places: {title: string}[] = []; // displays places by title

  constructor(
    public navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController) {

  }
// When the page loads the saved places are got from stoarage and displayed.
  ionViewWillEnter() {
    this.placesService.getPlaces()
      .then(
        (places) => this.places = places
      );
  }
//When the add button is pressed the app navigates to the page where users can add a new place
  onLoadNewPlace() {
    this.navCtrl.push(NewPlacePage);
  }
//when a place is selected the map is generated.
  onOpenPlace(place: Place) {
    this.modalCtrl.create(PlacePage, place).present();
  }

}
