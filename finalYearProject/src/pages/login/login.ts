import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Authentication } from '../../providers/authentication';
import { HomePage } from '../home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
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

  constructor(public navCtrl: NavController, public authData: Authentication, public formBuilder: FormBuilder, public alertCntrl: AlertController, public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
