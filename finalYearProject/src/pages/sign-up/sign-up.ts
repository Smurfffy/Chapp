import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Authentication } from '../../providers/authentication';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';

/*
  Generated class for the SignUp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {
  public signUpForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading;

  constructor(public navCtrl: NavController, public authentication: Authentication, public formBuilder: FormBuilder, public loadingCntrl: LoadingController, public alertCntrl: AlertController) {
    this.signUpForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  signupUser() {
        this.submitAttempt = true;

        if (!this.signUpForm.valid){
            console.log(this.signUpForm.value);
        } else {
            this.authentication.createUsr(this.signUpForm.value.email, 
                this.signUpForm.value.password).then(() => {
                  this.loading.dismiss().then( () =>{
                    this.navCtrl.setRoot(HomePage);
                  });
                }, (error) => {
                    this.loading.dismiss().then( () => {
                        var errorMessage: string = error.message;
                        let alert = this.alertCntrl.create({
                            message: errorMessage,
                            buttons: [{ text: "Ok", role: 'cancel' } ]
                        });

                        alert.present();
                    });
                });

            this.loading = this.loadingCntrl.create({
                dismissOnPageChange: true,
            });
            this.loading.present();
        }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
