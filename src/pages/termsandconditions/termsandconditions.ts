import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmailAddressPage } from '../email-address/email-address';

@Component({
  selector: 'page-termsandconditions',
  templateUrl: 'termsandconditions.html'
})
export class TermsandconditionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsandconditionsPage');
  }

  agree() {
    this.navCtrl.push(EmailAddressPage);
  }

  disagree() {
    this.navCtrl.pop();
  }

}
