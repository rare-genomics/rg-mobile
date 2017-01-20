import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmailAddressPage } from '../email-address/email-address';

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html'
})
export class CreateAccountPage {

  constructor(public navCtrl: NavController) { }

  goBack() {
    this.navCtrl.pop();
  }

  emailAddress() {
    this.navCtrl.push(EmailAddressPage);
  }

}
