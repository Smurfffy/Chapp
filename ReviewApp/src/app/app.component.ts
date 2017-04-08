import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

/*
  Instead of the home page we import the login page here so when the app starts the user is prompted to log in before the can 
  start using the app.
*/
//import { HomePage } from '../pages/home/home';
import { LoginScreen } from '../pages/loginscreen/loginscreen'; // The login page is imported here



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginScreen; // This sets the LoginScreen page is the first page the user will see

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // The platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
