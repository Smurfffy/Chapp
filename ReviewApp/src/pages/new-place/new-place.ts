import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { Geolocation } from 'ionic-native';

import { PlacesService } from "../../services/places.service"; // importes the places service

@Component({
  selector: 'page-new-place',
  templateUrl: 'new-place.html'
})
export class NewPlacePage {
  location: {lat: number, lng: number} = {lat: 0, lng: 0}; // Gets the latitude and logitude for the location.
  //location: any;

  constructor(private placesService: PlacesService, private navCtrl: NavController) {}
//Adds the location to our storage on our device
  onAddPlace(value: {title: string}) {
    this.placesService.addPlace({title: value.title, location: this.location});
    this.navCtrl.pop();
  }
// When the locate me button is pressed the device gets the locations coordinates and saves them.
  onLocateUser() {
    Geolocation.getCurrentPosition()
      .then(
        (location) => {
          console.log('Location fetched successfully'); // tells the user the location has be saved.
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
        }
      )
      .catch(
        (error) => console.log('An error occurred')
      );
  }

}
