import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider'; //Imports authentication provider to compare details to the firebase database.
import { LoginScreen } from '../loginscreen/loginscreen'; // Imports the login screen to be navigated back to once the form has been submited
 
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  resetPasswordForm: FormGroup;
  email: AbstractControl;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private auth: AuthProvider)
  {
    // validets the email address
    this.resetPasswordForm = this.fb.group({  
          'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])]
      });
  
      this.email = this.resetPasswordForm.controls['email'];     
  }
 //If the email is regesters a reset password link will be sent to them by email. if not and error message is shown.
  submit(): void { 
    if(this.resetPasswordForm.valid) {
      //value checked, if true email is sent and user is returned to login screen
        this.auth.resetPassword(this.email.value).subscribe(registerData => {
            alert('Password recovery link is sent.');
            this.navCtrl.setRoot(LoginScreen);
        }, registerError => {
          console.log(registerError); //If there is an error the user is informed
          if (registerError.code === 'auth/user-not-found')
          {
            alert(registerError.message);
          }
      });
    }
    
  }

  
}