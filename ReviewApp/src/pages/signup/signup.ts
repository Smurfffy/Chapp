import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider'; //Authentication provider imported so details can be saved to the firebase database
import { HomePage } from '../home/home'; //Home page imported so it can be navigated to
 
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private auth: AuthProvider)
  {
    // Email and password validation done here.
    this.signupForm = this.fb.group({  
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });
  
    this.email = this.signupForm.controls['email'];     
    this.password = this.signupForm.controls['password'];    
  }
 // When the form has been submitted the credentails are saved to the database
  submit(): void { 
    if(this.signupForm.valid) {
        var credentials = ({email: this.email.value, password: this.password.value});
        // User gets registered to the database
        this.auth.registerUser(credentials).subscribe(registerData => {
            console.log(registerData);
            // User in informed of succesful signup
            alert('User is registered and logged in.');
            // navigates to the home page
            this.navCtrl.setRoot(HomePage);
        }, registerError => {
          console.log(registerError);
          if (registerError.code === 'auth/weak-password' || registerError.code === 'auth/email-already-in-use')
          {
            //informs user of either there password being too short or the email is already registered
            alert(registerError.message);
          }
          this.error = registerError;
        });
    }
  } 
}