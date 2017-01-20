import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotificationsPromptPage } from '../notifications-prompt/notifications-prompt';

@Component({
  selector: 'page-enter-birthday',
  templateUrl: 'enter-birthday.html'
})
export class EnterBirthdayPage {

  constructor(public navCtrl: NavController) { }

  goBack() {
    this.navCtrl.pop();
  }
  notificationsPrompt() {
    this.navCtrl.push(NotificationsPromptPage);
  }
}
