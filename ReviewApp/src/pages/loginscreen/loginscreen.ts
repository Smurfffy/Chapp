import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider'; //added AuthProvider
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup' //Added sign up page
import { ResetPasswordPage } from '../reset-password/reset-password' //Added reset password page

@Component({
  selector: 'page-home',
  templateUrl: 'loginscreen.html'
})
export class LoginScreen {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: any;
  signupPage = SignupPage;  //Added sing up page
  resetPasswordPage = ResetPasswordPage //Added reset password page
 
  constructor(public navCtrl: NavController, private fb: FormBuilder, public auth: AuthProvider) { //Added AuthProvider
    this.loginForm = this.fb.group({  
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });
  
        this.email = this.loginForm.controls['email'];     
        this.password = this.loginForm.controls['password'];     
  }
 
  login(): void { 
        if(this.loginForm.valid) {
          //console.log(this.email.value, this.password.value);
          //alert('Implement authentication');
          var credentials = ({email: this.email.value, password: this.password.value}); //Added next lines
          this.auth.loginWithEmail(credentials).subscribe(data => {
          console.log(data);
           this.navCtrl.setRoot(HomePage);
            }, error=>{             //Added next lines for handling unknown users
            console.log(error);
            if (error.code == 'auth/user-not-found')
            {
              alert('User not found');
            }
           // this.navCtrl.setRoot(HomePage);
          });
        }else{
         
        }
    }
     logout(): void {
      this.auth.logout();
    }

   
}