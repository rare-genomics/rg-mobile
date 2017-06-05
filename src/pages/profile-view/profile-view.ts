import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PatientProfilePage } from '../patient-profile/patient-profile';
import { InitDatabase } from '../../providers/init-database';

/*
  Generated class for the ProfileView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile-view',
  templateUrl: 'profile-view.html',
  providers: [InitDatabase]
})
export class ProfileViewPage {

  profileView = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: InitDatabase) {}

  ionViewDidLoad() {
    this.profileView['conditions'] = "OTC-deficiency";
    this.loadProfileData();
    console.log('ionViewDidLoad ProfileViewPage');
    //  this.loadData();
  }

  // loadData() {
  //   this.db._db.transaction(function (tx) {
  //     tx.executeSql('INSERT INTO profile (id, firstname, lastname, patient, caregiver, publicprofile, mystory, myupdates) VALUES (1, "Elisa", "Jones", 1, 1, 0, "Elisa is a happy 7-year-old girl. She loves soccer, art, and Harry Potter..", "6/15/16 - Elisa came home from the hospital today. Thank you all for the kind letters and flowers.")', [], function (tx, res) {
  //     }, function (e) {
  //     });
  //   });
  // }

  loadProfileData() {
    let bridge = { 'profileView': this.profileView };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT firstname, mystory, myupdates FROM profile WHERE id=1', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.profileView['name'] = res.rows.item(i).firstname;
          bridge.profileView['story'] = res.rows.item(i).mystory;
          bridge.profileView['updates'] = res.rows.item(i).myupdates;
        }
      }, function (e) {
      });
    });
  }

  closeWindow() {
    this.navCtrl.pop();
  }

  editProfile() {
    this.navCtrl.push(PatientProfilePage);
  }

}
