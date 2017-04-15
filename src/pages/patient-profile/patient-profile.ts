import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileViewPage } from '../profile-view/profile-view'

/*
  Generated class for the PatientProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-patient-profile',
  templateUrl: 'patient-profile.html'
})
export class PatientProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientProfilePage');
  }

  onChange(SelectedValue){
    console.log("Selected profile", SelectedValue);
}

previewProfile() {
  this.navCtrl.push(ProfileViewPage);
}

closeWindow() {
    this.navCtrl.pop();;
  }

}
