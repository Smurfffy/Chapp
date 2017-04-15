import { Component, ElementRef, ViewChild } from '@angular/core';
import { Locations } from '../../providers/locations';
import { GoogleMaps } from '../../providers/google-maps';
import { NavController, Platform } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider';  //Imports the outentication provider so the logout function can be called
 import { LoginScreen }  from '../loginscreen/loginscreen' // Login page imported so it can be navigated to after log out
 import { App } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 
    constructor(public navCtrl: NavController, public app: App , public maps: GoogleMaps, public platform: Platform, public locations: Locations, public auth: AuthProvider) {
 
    }
 
    // Once the page is loaded the map is loaded here
    ionViewDidLoad(){
 
        this.platform.ready().then(() => {
 
            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
            let locationsLoaded = this.locations.load(); //Locations for our markers
 
            Promise.all([
                mapLoaded,
                locationsLoaded
            ]).then((result) => {
 
                let locations = result[1];
 
                // dsplays our marks on the map.
                for(let location of locations){
                    this.maps.addMarker(location.latitude, location.longitude);
                }
            });
        });
    }
    /*
        Logout function for loging the user out of the app and going back to the login page.
    */
    logout(): void {
      this.auth.logout();
      this.app.getRootNav().setRoot(LoginScreen);
    }
}