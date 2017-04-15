import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Reviews {
 
  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }
 
 //Gets the review data
  getReviews(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
      //Here we are connecting to our hosted Node application containing our API so that app can get the data
      this.http.get('https://fathomless-chamber-74986.herokuapp.com/api/reviews')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
 
  createReview(review){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 //Here we are connecting to our hosted Node application containing our API so that app can post the data
    this.http.post('https://fathomless-chamber-74986.herokuapp.com/api/reviews', JSON.stringify(review), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }
 
  deleteReview(id){
 //Here we are connecting to our hosted Node application containing our API so that app can delete the data
    this.http.delete('https://fathomless-chamber-74986.herokuapp.com/api/reviews/' + id).subscribe((res) => {
      console.log(res.json());
    });    
 
  }
 
}