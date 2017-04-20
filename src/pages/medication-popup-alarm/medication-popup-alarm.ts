import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-medication-popup-alarm',
  templateUrl: 'medication-popup-alarm.html'
})
export class MedicationPopupAlarmPage {
  alarmId;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicationPopupAlarmPage');
  }

}
