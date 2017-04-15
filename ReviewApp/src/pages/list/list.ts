import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Locations } from '../../providers/locations'; // Importes the Locations provider to be used in our list page.
 
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
 
 //Locations class declared in constructor.
  constructor(public navCtrl: NavController, public locations: Locations) {}
 
  ionViewDidLoad() {
    console.log('Hello ListPage Page');
  }
 
}