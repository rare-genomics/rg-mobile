import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmailAddressPage } from '../email-address/email-address';
import { InitDatabase } from '../../providers/init-database';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
  providers: [InitDatabase]
})
export class CreateAccountPage {
  localdata = {};
  exists = false;
  constructor(public navCtrl: NavController, private db: InitDatabase, public alertCtrl: AlertController) {
    this.loadData();
  }

  loadData() {
    let bridge = { 'localdata': this.localdata, 'exists': this.exists };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT firstname, lastname FROM profile WHERE id=1', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.localdata['firstname'] = res.rows.item(i).firstname;
          bridge.localdata['lastname'] = res.rows.item(i).lastname;
          bridge.exists = true;
        }
      }, function (e) {
      });
    });
  }

  replaceUndefined() {
    if (this.localdata['firstname'] == undefined || this.localdata['firstname'] == "") {
      this.doAlert("Missing first name");
      return 1;
    }
    if (this.localdata['lastname'] == undefined || this.localdata['lastname'] == "") {
      this.doAlert("Missing last name");
      return 1;
    }
    return 0;
  }

  saveData() {
    if (this.replaceUndefined() == 1) {
      return;
    }
    let bridge = this.localdata;
    if (this.exists) {
      this.db._db.transaction(function (tx) {
        tx.executeSql('UPDATE profile SET firstname = ?, lastname = ? WHERE id = 1', [
          bridge['firstname'],
          bridge['lastname']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error updating the database " + e);
        });
      });
    } else {
      this.db._db.transaction(function (tx) {
        tx.executeSql('INSERT INTO profile (id, firstname, lastname) VALUES (1, ?, ?)', [
          bridge['firstname'],
          bridge['lastname']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error updating the database " + e);
        });
      });
    }
    this.navCtrl.push(EmailAddressPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

  doAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      message: msg,
      buttons: ['Ok']
    });
    alert.present()
  }

}
