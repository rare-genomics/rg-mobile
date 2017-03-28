import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateAccountPage } from '../create-account/create-account';

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
    this.navCtrl.push(CreateAccountPage);
  }

  disagree() {
    this.navCtrl.pop();
  }

}
