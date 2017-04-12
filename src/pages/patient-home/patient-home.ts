import { PatientProfilePage } from '../patient-profile/patient-profile';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the PatientHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-patient-home',
  templateUrl: 'patient-home.html'
})
export class PatientHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientHomePage');
  }

  openProfilePage() {
    this.navCtrl.push(PatientProfilePage);
  }

}
