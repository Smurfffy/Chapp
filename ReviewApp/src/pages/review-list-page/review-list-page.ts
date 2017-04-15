import { Component } from "@angular/core";
import { NavController, ModalController } from 'ionic-angular';
import { AddReviewPage } from '../add-review-page/add-review-page'; // imports the add review page to be navigated to
import { Reviews } from '../../providers/reviews'; //imports the review provider where we connect to our API.
 
@Component({
  selector: 'ReviewPage',
  templateUrl: 'review-list-page.html'
})
export class ReviewPage {
 
  reviews: any;

 /* doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.reviewService.getReviews().then((data) => {
      console.log(data);
      this.reviews = data;
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 5000);
  } Here is our attmpt at refreshing the page */
 
  constructor(public nav: NavController, public reviewService: Reviews, public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
    //Gets the reviews from the node server and displays them in the app
    this.reviewService.getReviews().then((data) => {
      console.log(data);
      this.reviews = data;
    });
  }
 
  addReview(){
    //Creates the modal for adding review
    let modal = this.modalCtrl.create(AddReviewPage);
    //when the modal has been dismissed the review is pushed to the Node server to be stored in the database.
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
    //Remove from database by sending data to the node server.
    this.reviewService.deleteReview(review._id);
  }
}