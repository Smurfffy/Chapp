import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms'
import { Authentication } from '../../providers/authentication';
import { EmailValidator } from '../../validators/email';

/*
  Generated class for the ForgotPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  public forgotPasswordForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public authentication: Authentication, public formBuilder: FormBuilder, public alertCntrl: AlertController) {
    this.forgotPasswordForm = formBuilder.group ({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    })
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  resetPassword(){
    this.submitAttempt = true;

    if (!this.forgotPasswordForm.valid){
        console.log(this.forgotPasswordForm.value);
    } else {
        this.authentication.resetPassword(this.forgotPasswordForm.value.email).then((user) => {
            let alert = this.alertCntrl.create({
                message: "Password Reset Link sent",
                buttons: [{ text: "Ok", role: 'cancel',
                    handler: () => {
                        this.navCtrl.pop();
                    }
                }]
            });
          alert.present();
        }, (error) => {
            var errorMessage: string = error.message;
            let errorAlert = this.alertCntrl.create({
                message: errorMessage,
                buttons: [{ text: "Ok", role: 'cancel' }]
            });
            errorAlert.present();
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
}
