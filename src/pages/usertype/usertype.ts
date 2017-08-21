import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreatePasswordPage } from '../create-password/create-password';
import { InitDatabase } from '../../providers/init-database';

@Component({
  selector: 'page-usertype',
  templateUrl: 'usertype.html',
  providers: [InitDatabase]
})
export class UsertypePagePage {
  localdata = {};
  constructor(private db: InitDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.loadData();
  }

  loadData() {
    let bridge = { 'localdata': this.localdata };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT patient, caregiver FROM profile WHERE id=1', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.localdata['patient'] = res.rows.item(i).patient;
          bridge.localdata['caregiver'] = res.rows.item(i).caregiver;
        }
      }, function (e) {
      });
    });
  }

  saveData() {
    let bridge = this.localdata;
    this.db._db.transaction(function (tx) {
      tx.executeSql('UPDATE profile SET patient = ?, caregiver = ?', [
        bridge['patient'],
        bridge['caregiver']
      ], function (tx, res) {
      }, function (e) {
        console.log(e.message + " Error updating the database " + e);
      });
    });
    this.navCtrl.push(CreatePasswordPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

}
