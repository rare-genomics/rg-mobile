import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotificationsPromptPage } from '../notifications-prompt/notifications-prompt';
import { InitDatabase } from '../../providers/init-database';

@Component({
  selector: 'page-enter-birthday',
  templateUrl: 'enter-birthday.html',
  providers: [InitDatabase]
})
export class EnterBirthdayPage {
  localdata = {};
  constructor(public navCtrl: NavController, private db: InitDatabase) {
    this.loadData();
  }

  loadData() {
    let bridge = { 'localdata': this.localdata };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT birthday FROM profile WHERE id=1', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.localdata['birthday'] = res.rows.item(i).email;
        }
      }, function (e) {
      });
    });
  }

  replaceUndefined() {
    if (this.localdata['birthday'] == undefined) {
      this.localdata['birthday'] = null;
    }
  }

  saveData() {
    this.replaceUndefined();
    let bridge = this.localdata;
    this.db._db.transaction(function (tx) {
      tx.executeSql('UPDATE profile SET birthday = ?', [
        bridge['birthday']
      ], function (tx, res) {
      }, function (e) {
        console.log(e.message + " Error updating the database " + e);
      });
    });
  }

  goBack() {
    this.navCtrl.pop();
  }
  notificationsPrompt() {
    this.saveData();
    this.navCtrl.push(NotificationsPromptPage);
  }
}
