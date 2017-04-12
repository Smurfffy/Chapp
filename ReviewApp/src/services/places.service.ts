import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { Place } from '../model/place.model';

@Injectable() //needs to be added to a service that recieves another service
export class PlacesService {
  private places: Place[] = [];

  constructor (private storage: Storage) {}

  addPlace(place: Place) {
    this.places.push(place);
    this.storage.set('places', this.places);//When a new item is entered it is updated in local storage.
  }

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
