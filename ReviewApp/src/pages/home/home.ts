import { Component } from "@angular/core";
import { NavController, ModalController } from 'ionic-angular';
import { AddReviewPage } from '../add-review-page/add-review-page';
import { Reviews } from '../../providers/reviews';

//map imports
import { MapPage } from '../map/map';
import { ListPage } from '../list/list';
import { ReviewPage } from '../review-list-page/review-list-page';
 

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any = MapPage;
  tab2Root: any = ListPage;
  tab3Root: any = ReviewPage;
 
  
 
  reviews: any;
 
  constructor(public nav: NavController, public reviewService: Reviews, public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
 
    this.reviewService.getReviews().then((data) => {
      console.log(data);
      this.reviews = data;
    });
 
  }
 
  addReview(){
 
    let modal = this.modalCtrl.create(AddReviewPage);
 
    modal.onDidDismiss(review => {
      if(review){
        this.reviews.push(review);
        this.reviewService.createReview(review);        
      }
    });
 
    modal.present();
 
  }
 
  deleteReview(review){
 
    //Remove locally
      let index = this.reviews.indexOf(review);
 
      if(index > -1){
        this.reviews.splice(index, 1);
      }   
 
    //Remove from database
    this.reviewService.deleteReview(review._id);
  }
 
}