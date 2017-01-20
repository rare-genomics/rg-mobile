import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnterBirthdayPage } from '../enter-birthday/enter-birthday';

@Component({
  selector: 'page-create-password',
  templateUrl: 'create-password.html'
})
export class CreatePasswordPage {

  constructor(public navCtrl: NavController) { }

  goBack() {
    this.navCtrl.pop();
  }
  enterBirthday() {
    this.navCtrl.push(EnterBirthdayPage);
  }
}
