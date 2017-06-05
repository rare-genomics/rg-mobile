import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PatientProfilePage } from '../patient-profile/patient-profile';

/*
  Generated class for the AddCondition page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-condition',
  templateUrl: 'add-condition.html'
})
export class AddConditionPage {

  formData = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddConditionPage');
  }

    saveCondition() {
    this.navCtrl.push(PatientProfilePage);
  }

  close() {
    this.navCtrl.pop();
  }

}
