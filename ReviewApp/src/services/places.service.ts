import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { Place } from '../model/place.model'; // Importing the Place class. This is imported to create the place object with

@Injectable() //needs to be added to a service that recieves another service
export class PlacesService {
  private places: Place[] = [];

  constructor (private storage: Storage) {}

  /*
    In our add places function a place is pushed to the array of places and saved in local storage
  */
  addPlace(place: Place) {
    this.places.push(place);
    this.storage.set('places', this.places);
  }

/*
  In our get places function, places are got from local storage .
*/
  getPlaces() {
    return this.storage.get('places')
      .then(
        (places) => {
          this.places = places == null ? [] : places;
          return this.places.slice();
        }
      );
  }
}
