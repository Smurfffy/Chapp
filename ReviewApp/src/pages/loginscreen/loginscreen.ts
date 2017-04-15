import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider'; //imports AuthProvider to the page
import { HomePage } from '../home/home'; // imports the home page to the app so it can be navigated to
import { SignupPage } from '../signup/signup' // imports the signup page into our app to be navigated to
import { ResetPasswordPage } from '../reset-password/reset-password' //imports or reset password page into out app to be navigated to.

@Component({
  selector: 'page-home',
  templateUrl: 'loginscreen.html'
})
export class LoginScreen {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: any;
  signupPage = SignupPage;
  resetPasswordPage = ResetPasswordPage
 
  constructor(public navCtrl: NavController, private fb: FormBuilder, public auth: AuthProvider) { 
    this.loginForm = this.fb.group({  
      //Email and password validation done below.
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });
  
        this.email = this.loginForm.controls['email'];     
        this.password = this.loginForm.controls['password'];     
  }
 
 /*
  Our login function for comparing the user details to our firebase database and navigating to out home page if successful
  if not successful and error message is shown
 */
  login(): void { 
      if(this.loginForm.valid) {
        //console.log(this.email.value, this.password.value);
        //alert('Implement authentication');
        var credentials = ({email: this.email.value, password: this.password.value}); //Added next lines
        this.auth.loginWithEmail(credentials).subscribe(data => {
        console.log(data);
          this.navCtrl.setRoot(HomePage);
          }, error=>{             
          console.log(error);
          if (error.code == 'auth/user-not-found')
          {
            alert('User not found'); // The error message that will be show to the users.
          }
          // this.navCtrl.setRoot(HomePage);
        });
      }else{
        
      }
    }

    /*
      the logut function which logs out the current user
    */
     logout(): void {
      this.auth.logout();
    }
}