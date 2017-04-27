import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileViewPage } from '../profile-view/profile-view';
import { InitDatabase } from '../../providers/init-database';
import { AddConditionPage } from '../add-condition/add-condition';

/*
  Generated class for the PatientProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-patient-profile',
  templateUrl: 'patient-profile.html',
  providers: [InitDatabase]
})
export class PatientProfilePage {

  profileForm = {};
  localdata = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: InitDatabase) {}

  ionViewDidLoad() {
    this.profileForm['profileHolder'] = ["patient", "donor"];
    this.profileForm['conditions'] = ["otc"];
    this.loadProfile();
    console.log('ionViewDidLoad PatientProfilePage');
  }

  loadProfile() {
    let bridge = { 'profileForm': this.profileForm };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT mystory, myupdates, allow_optin_flag FROM profile WHERE id=1', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.profileForm['story'] = res.rows.item(i).mystory;
          bridge.profileForm['updates'] = res.rows.item(i).myupdates;
          bridge.profileForm['permission'] = res.rows.item(i).allow_optin_flag == 1 ? "true" : false;
        }
      }, function (e) {
      });
    });
  }

    updateProfile() {
    let bridge = { 'profileForm': this.profileForm };
    this.db._db.transaction(function (tx) {
      tx.executeSql('UPDATE profile SET mystory = ?, myupdates = ?, allow_optin_flag = ? WHERE id=1', [
        bridge.profileForm['story'],
        bridge.profileForm['updates'],
        (bridge.profileForm['permission'] == undefined || bridge.profileForm['permission'] == "false") ? 0 : 1
      ], function (tx, res) {
      }, function (e) {
        console.log(e.message + " Error updating the database " + e);
      });
    });
    this.navCtrl.push(ProfileViewPage);
  }

  cancelUpdate() {
    this.navCtrl.push(ProfileViewPage);
  }

  addCondition() {
    this.navCtrl.push(AddConditionPage);
    // console.log("Inside Add Condition");
  }

closeWindow() {
    this.navCtrl.pop();;
  }

}
