/*
  This is the home page that is navigated to once the user is loged in, it created the tabs for navigation and imports all the pages
*/

import { Component } from "@angular/core";
import { NavController, ModalController } from 'ionic-angular';
import { AddReviewPage } from '../add-review-page/add-review-page'; // Adds the add review page to be loaded into a modal 
import { Reviews } from '../../providers/reviews'; // Imports the provider
import { MapPage } from '../map/map'; // imports the review page to be opened from a tab
import { ListPage } from '../list/list'; // imports the list page to be opened from a tab
import { ReviewPage } from '../review-list-page/review-list-page'; // imports the review page to be opened from a tab
import { PlaceHomePage } from '../place-home/place-home';


@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any = MapPage; // sets the map page to be in tab1
   tab2Root: any = PlaceHomePage;
  tab3Root: any = ListPage; // sets the list page to be in tab 2
  tab4Root: any = ReviewPage; // sets the review page to be in tab 3
  reviews: any; // review variable for creating and deleting reviews
 
  constructor(public nav: NavController, public reviewService: Reviews, public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
    // gets the reviews from the database
    this.reviewService.getReviews().then((data) => {
      console.log(data);
      this.reviews = data;
    });
  }
 
  addReview(){
 
    let modal = this.modalCtrl.create(AddReviewPage); // opens a modal with the add review page
 
    modal.onDidDismiss(review => {
      if(review){
        this.reviews.push(review);
        this.reviewService.createReview(review);        
      }
    });
    modal.present();
  }
 
  deleteReview(review){
 
    //Remove the review locally
      let index = this.reviews.indexOf(review);
 
      if(index > -1){
        this.reviews.splice(index, 1);
      }   
    //Removes the review from the database
    this.reviewService.deleteReview(review._id);
  }
}