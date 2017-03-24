import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreatePasswordPage } from '../create-password/create-password';
import { InitDatabase } from '../../providers/init-database';

@Component({
  selector: 'page-email-address',
  templateUrl: 'email-address.html',
  providers: [InitDatabase]
})
export class EmailAddressPage {
  localdata = {};
  constructor(public navCtrl: NavController, private db: InitDatabase) {
    this.loadData();
  }

  loadData() {
    let bridge = { 'localdata': this.localdata };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT email FROM profile WHERE id=1', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.localdata['email'] = res.rows.item(i).email;
        }
      }, function (e) {
      });
    });
  }

  replaceUndefined() {
    if (this.localdata['email'] == undefined) {
      this.localdata['email'] = null;
    }
  }

  saveData() {
    this.replaceUndefined();
    let bridge = this.localdata;
    this.db._db.transaction(function (tx) {
      tx.executeSql('UPDATE profile SET email = ?', [
        bridge['email']
      ], function (tx, res) {
      }, function (e) {
        console.log(e.message + " Error updating the database " + e);
      });
    });
  }

  goBack() {
    this.navCtrl.pop();
  }
  createPassword() {
    this.saveData();
    this.navCtrl.push(CreatePasswordPage);
  }
}
