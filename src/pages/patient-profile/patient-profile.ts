import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileViewPage } from '../profile-view/profile-view';
import { InitDatabase } from '../../providers/init-database';
import { AddConditionPage } from '../add-condition/add-condition';
import { Camera } from 'ionic-native';

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
  profileHolder=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: InitDatabase) {}

  ionViewDidLoad() {
    this.profileForm['conditions'] = ["otc"];
    this.loadProfile();
    console.log('ionViewDidLoad PatientProfilePage');
  }

  loadProfile() {
    let bridge = { 'profileForm': this.profileForm };
    let bindData = { 'profileHolder': this.profileHolder };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT mystory, myupdates, allow_optin_flag, patient, caregiver, donor, type_other FROM profile WHERE id=1', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.profileForm['story'] = res.rows.item(i).mystory;
          bridge.profileForm['updates'] = res.rows.item(i).myupdates;
          bridge.profileForm['permission'] = res.rows.item(i).allow_optin_flag == 1 ? "true" : "false";
          res.rows.item(i).patient != 1 ? null : bindData.profileHolder.push("patient");
          res.rows.item(i).caregiver != 1 ? null : bindData.profileHolder.push("caregiver");
          res.rows.item(i).donor != 1 ? null : bindData.profileHolder.push("donor");
          res.rows.item(i).type_other != 1 ? null : bindData.profileHolder.push("other");
          bridge.profileForm['profileHolder'] = bindData.profileHolder;
        }
      }, function (e) {
      });
    });
  }

    updateProfile() {
    let bridge = { 'profileForm': this.profileForm };
    console.log(bridge.profileForm['permission']);
    this.db._db.transaction(function (tx) {
      tx.executeSql('UPDATE profile SET mystory = ?, myupdates = ?, allow_optin_flag = ?, patient = ?, caregiver = ?, donor = ?, type_other = ? WHERE id=1', [
        bridge.profileForm['story'],
        bridge.profileForm['updates'],
        (bridge.profileForm['permission'] == undefined || bridge.profileForm['permission'] == false) ? 0 : 1,
        (bridge.profileForm['profileHolder'].indexOf("patient") != -1) ? 1 : 0,
        (bridge.profileForm['profileHolder'].indexOf("caregiver") != -1) ? 1 : 0,
        (bridge.profileForm['profileHolder'].indexOf("donor") != -1) ? 1 : 0,
        (bridge.profileForm['profileHolder'].indexOf("other") != -1) ? 1 : 0
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

  runCamera() {
    Camera.getPicture(
      {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: false,
        targetWidth: 360,
        targetHeight: 360
      }
    ).then((imageData) => {
      this.profileForm['image'] = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

closeWindow() {
    this.navCtrl.pop();;
  }

}
