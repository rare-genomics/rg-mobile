import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InitDatabase } from '../../providers/init-database';
import { CaregiverDetailsPage } from '../caregiver-details/caregiver-details';

@Component({
  selector: 'page-caregiver',
  templateUrl: 'caregiver.html',
  providers: [InitDatabase]
})
export class CaregiverPage {
  caregivers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: InitDatabase) {
     setInterval(() => {
      this.caregivers.length;
    }, 1000);
  }

  ionViewWillEnter() {
    this.caregivers = [];
    this.loadList();
  }

  loadList() {
    let bridge = { 'caregiver': this.caregivers };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT id, name, telefone FROM caregiver', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          let temparray = {};
          temparray['id'] = res.rows.item(i).id;
          temparray['name'] = res.rows.item(i).name;
          temparray['telefone'] = res.rows.item(i).telefone;
          bridge.caregiver.push(temparray);
        }
      }, function (e) {
      });
    });
  }

  gotoCaregiverDetails() {
    this.navCtrl.push(CaregiverDetailsPage);
  }

  openCare(localId) {
    this.navCtrl.push(CaregiverDetailsPage, {
      'localId': localId
    });
  }
}
