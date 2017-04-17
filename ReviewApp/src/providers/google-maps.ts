import { Injectable } from '@angular/core';
import { Connectivity } from './connectivity';
import { Geolocation } from 'ionic-native'; // Geolocation is got, needs special plugin for building with cordova.

declare var google;

@Injectable()
export class GoogleMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;

  constructor(public connectivityService: Connectivity) {

  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps(); //Loads the map when a connection is got.

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if(typeof google == "undefined" || typeof google.maps == "undefined"){
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
        //If the user is online the map is initalised and then displayed
        if(this.connectivityService.isOnline()){
          window['mapInit'] = () => {
            this.initMap().then(() => {
              resolve(true);
            });
            this.enableMap();
          }
          let script = document.createElement("script");
          script.id = "googleMaps";
          //Api keys required for google maps, not necessary nut it seems some problems might arise if not properly used.
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
          }
          document.body.appendChild(script);  
        } 
      }
      else { // If already connected, load the map with no issues
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
      }
      this.addConnectivityListeners(); // Listens to see if the user goes offline so the map gets disabled
    });
  }

  /*
    Map is initialized here
  */
  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      //Uses the geolocation(Ionic or Cordova plugin for devices) and displays your current location on the map.
      Geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        // Map options on position around user, zoom and if it displays a roadmap or the sattlie view etc...
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);
        google.maps.event.addListener(this.map, 'click', (event) => { //What happens when the map is tapped on
          this.clearMarkers(); // Clears markers on map onces its tapped (Might uncomment this later)
          let geocoder = new google.maps.Geocoder; //Converts lat-log into an actual address.
          let infowindow = new google.maps.InfoWindow; // Loads the info window aobve the marker once tapped.
          let distanceToYou = this.getDistanceBetweenPoints( // This gets the distance between you and the location and displays it in the app
            event.latLng,
            position,
            'km'
          ).toFixed(2);
          this.geocodeLatLng(event.latLng,geocoder,infowindow,distanceToYou);
        });
      });
    });
  }

  /*
    This function is called when the user is offline, or goes offline. the map is disabled and a please connect message is diplayed
  */
  disableMap(): void {
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
  }

  /*
    This function is called when the user is online, or goes online. The map is then displayed
  */
  enableMap(): void {
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
  }

  /*
    This fucntion adds a listener to the app to track if the user is online or offline
  */
  addConnectivityListeners(): void {
    document.addEventListener('online', () => {

      console.log("online"); //User being online logged to the console

      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps(); // Loads the map for the online users
        } 
        else {
          if(!this.mapInitialised){ // Map is initialised for the user
            this.initMap();
          }
          this.enableMap();
        }
      }, 2000);
    }, false);

    document.addEventListener('offline', () => {
      console.log("offline"); // User is logged as offline in the app
      this.disableMap(); //Map gets disabled
    }, false);
  }

  /*
  This is our function for adding markers to the map
  */
  addMarker(lat: number, lng: number): void {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({ //Marker is created on the app
      map: this.map,
      animation: google.maps.Animation.DROP, //Plays animation
      position: latLng //Gets the Lat and Long of the app
    });
    this.markers.push(marker); //Saves the marker
  }

  /*
    This translates the latitude and longitude to an actual readable address on the app
  */
  geocodeLatLng(latLng: any,geocoder: any, infowindow:any,distanceToYou: any): void{
    geocoder.geocode({'location': latLng}, (results, status) => {
      if (status === 'OK') {
        if (results[1]) {
          let marker = new google.maps.Marker({
            position: latLng,
            animation: google.maps.Animation.DROP,
            map: this.map
          }); // Creates the marker, pushes it to local stoarage
          this.markers.push(marker);
          //This is the information displayed in the markers text box
          infowindow.setContent(results[1].formatted_address+'<p style="color: red;">'+distanceToYou+" km from your location</p>"); 
          infowindow.open(this.map, marker); //Displays the text box
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  // This funciton Removes the markers from the map, but keeps them in the array.
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  // Clears the markers
  clearMarkers() {
    this.setMapOnAll(null);
    this.markers = [];
  }

  // This function gets the distance between the user and the marker they created on the app.
  getDistanceBetweenPoints(start, end, units){

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    }; // Creates an acutal radius of the earth so distance is accuratly mesured

    let R = earthRadius[units || 'km'];
    let lat1 = start.lat(); //Marker lat
    let lon1 = start.lng(); //Marker long
    let lat2 = end.coords.latitude; //User lat
    let lon2 = end.coords.longitude; //User long

    // This is where all the maths is done to calculate the distance using the two points and the radius of the earth.
    // Google maps documentation very helpful when it comes to understnding this and for formulas.
    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    console.log('distanceToYou '+d);
    return d;
  }
  toRad(x){
    return x * Math.PI / 180;
  }
}  