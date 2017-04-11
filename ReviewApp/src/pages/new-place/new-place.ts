import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { Geolocation } from 'ionic-native'; //add for cordova but rapped by ionic so it can be used.

import { PlacesService } from "../../services/places.service";

@Component({
  selector: 'page-new-place',
  templateUrl: 'new-place.html'
})
export class NewPlacePage {
 // location: {lat: number, lng: number} = {lat: 0, lng: 0};
 location: any;

  constructor(private placesService: PlacesService, private navCtrl: NavController) {}

  onAddPlace(value: {title: string}) {
    this.placesService.addPlace({title: value.title, location: this.location});
    this.navCtrl.pop();
  }

  onLocateUser() {
    Geolocation.getCurrentPosition() //returns a promise to listen if its successfull or not
      .then(
        (location) => {
          console.log('Location fetched successfully');//check to see if location has worked
         //this.location.lat = location.coords.latitude;
          //this.location.lng = location.coords.longitude;
          this.location = location;
        }
      )
      .catch(
        (error) => console.log('An error occurred')
      );
  }

}
