import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InitDatabase } from '../../providers/init-database';

@Component({
  selector: 'page-notifications-prompt',
  templateUrl: 'notifications-prompt.html',
  providers: [InitDatabase]
})
export class NotificationsPromptPage {

  constructor(public navCtrl: NavController, private db: InitDatabase) { }

  saveData(status) {
    this.db._db.transaction(function (tx) {
      tx.executeSql('UPDATE profile SET notification = ?', [
        status
      ], function (tx, res) {
      }, function (e) {
        console.log(e.message + " Error updating the database " + e);
      });
    });
    this.submitRegistration();
  }

  goBack() {
    this.navCtrl.pop();
  }

  submitRegistration() {
    console.log("At this poing should submit registartion");
  }
}
