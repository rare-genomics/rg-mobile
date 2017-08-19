import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-contact-rgi',
  templateUrl: 'contact-rgi.html'
})

export class ContactRGIPage {
  formData = {};
  contactForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public formBuilder: FormBuilder) {
  
    this.contactForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      description: [''],
      interest: ['']
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactRGIPage');
  }

  // private jsonToURLEncoded(jsonString) {
  //   return Object.keys(jsonString).map(function (key) {
  //     return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
  //   }).join('&');
  // }

 closeWindow() {
    this.navCtrl.pop();
 }

 validate(): boolean {
    if (this.contactForm.valid) {
      return true;
    }

    // figure out the error message
    let errorMsg = '';

    // validate each field
    let fName = this.contactForm.controls['firstName'];
    let lName = this.contactForm.controls['lastName'];
    let mail = this.contactForm.controls['email'];

    console.log(fName.valid);
    console.log(lName);
    console.log(mail);

    if (!(fName.valid) || !(lName.valid) || !(mail.valid)) {
      errorMsg = 'Please enter details on Mandatory fields';
      // if ((fName.errors['required'])) {
      //   errorMsg = 'Please enter details on Mandatory fields';
      // } else if ((fName.errors['pattern']) || (lName.errors['pattern']) || (mail.errors['pattern'])) {
      //   errorMsg = 'Please enter valid data on Mandatory fields';
      // }
    }

    let alert = this.alertCtrl.create({
      subTitle: errorMsg || '!',
      buttons: ['OK']
    });
    alert.present();

    return false;
  }

submitContactInfo() {
  this.submitAttempt = true

  if(this.validate()) {
    let alert = this.alertCtrl.create({
      message: 'Thank you for contacting us!Depending on your interests,we\'ll contact you shortly!.<br/>Sincerely,<br/>Your Raregenomics Team',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}

}
