import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnterBirthdayPage } from '../enter-birthday/enter-birthday';

@Component({
  selector: 'page-notifications-prompt',
  templateUrl: 'notifications-prompt.html'
})
export class NotificationsPromptPage {

  constructor(public navCtrl: NavController) { }

  goBack() {
    this.navCtrl.pop();
  }
  enterBirthday() {
    this.navCtrl.push(EnterBirthdayPage);
  }
}
