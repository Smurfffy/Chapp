import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Authentication } from '../providers/authentication';
import { HomePage } from '../home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { EmailValidator } from '../validators/email';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
