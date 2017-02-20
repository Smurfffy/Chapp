import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Authentication } from '../../providers/authentication';
import { HomePage } from '../home/home';
import { SignUpPage } from '../../pages/sign-up/sign-up';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { EmailValidator } from '../../validators/email';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm: any;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  public loading: any;

  constructor(public nav: NavController, public authData: Authentication, public formBuilder: FormBuilder, public alertCntrl: AlertController, public loadingCtrl: LoadingController, public navParams: NavParams) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  goToResetPassword(){
    this.nav.push(ForgotPasswordPage);
  }

  goToSignUpPage(){
    this.nav.push(SignUpPage);
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  loginUsr() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
