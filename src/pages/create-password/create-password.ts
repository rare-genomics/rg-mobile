import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnterBirthdayPage } from '../enter-birthday/enter-birthday';
import { InitDatabase } from '../../providers/init-database';

@Component({
  selector: 'page-create-password',
  templateUrl: 'create-password.html',
  providers: [InitDatabase]
})
export class CreatePasswordPage {
  localdata = {};
  constructor(public navCtrl: NavController, private db: InitDatabase) {
    this.loadData();
  }

  loadData() {
    let bridge = { 'localdata': this.localdata };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT password FROM profile WHERE id=1', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.localdata['password'] = res.rows.item(i).email;
        }
      }, function (e) {
      });
    });
  }

  replaceUndefined() {
    if (this.localdata['password'] == undefined) {
      this.localdata['password'] = null;
    }
  }

  saveData() {
    this.replaceUndefined();
    let bridge = this.localdata;
    this.db._db.transaction(function (tx) {
      tx.executeSql('UPDATE profile SET password = ?', [
        bridge['password']
      ], function (tx, res) {
      }, function (e) {
        console.log(e.message + " Error updating the database " + e);
      });
    });
  }

  goBack() {
    this.navCtrl.pop();
  }
  enterBirthday() {
    this.saveData();
    this.navCtrl.push(EnterBirthdayPage);
  }
}
