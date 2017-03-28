import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnterBirthdayPage } from '../enter-birthday/enter-birthday';
import { InitDatabase } from '../../providers/init-database';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-create-password',
  templateUrl: 'create-password.html',
  providers: [InitDatabase]
})
export class CreatePasswordPage {
  localdata = {};
  constructor(public navCtrl: NavController, private db: InitDatabase, public alertCtrl: AlertController) {
    this.loadData();
  }

  loadData() {
    let bridge = { 'localdata': this.localdata };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT password FROM profile WHERE id=1', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.localdata['password'] = res.rows.item(i).password;
          bridge.localdata['password2'] = res.rows.item(i).password;
        }
      }, function (e) {
      });
    });
  }

  replaceUndefined() {
    let RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    if (this.localdata['password'] == undefined || this.localdata['password'] == "") {
      this.doAlert("Missing password");
      return 1;
    } else if (this.localdata['password'].length < 8){
      this.doAlert("Password must be at least 8 characters long");
      return 1;
    } else if(RegExp.exec(this.localdata['password']) == null){
      this.doAlert("Password must include at least one number");
      return 1;
    } else if (this.localdata['password'] != this.localdata['password2'] ) {
      this.doAlert("Password doesn't match");
      return 1;
    }
    
    return 0;
  }

  saveData() {
    if(this.replaceUndefined() == 1){
      return;
    }
    let bridge = this.localdata;
    this.db._db.transaction(function (tx) {
      tx.executeSql('UPDATE profile SET password = ?', [
        bridge['password']
      ], function (tx, res) {
      }, function (e) {
        console.log(e.message + " Error updating the database " + e);
      });
    });
    this.navCtrl.push(EnterBirthdayPage);
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
