import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MeddetailsPage } from '../meddetails/meddetails';
import { InitDatabase } from '../../providers/init-database';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-medhome',
  templateUrl: 'medhome.html',
  providers: [InitDatabase]
})
export class MedhomePage {
  medications = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: InitDatabase, public alertCtrl: AlertController) {
    setInterval(() => {
      this.medications.length;
    }, 1000);
  }

  ionViewWillEnter() {
    this.medications = [];
    this.loadList();
    console.log(this.medications);
  }

  loadList() {
    let bridge = { 'medications': this.medications };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT id, description, dosages, time, alarm FROM alarms', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          let temparray = {};
          temparray['id'] = res.rows.item(i).id;
          temparray['description'] = res.rows.item(i).description;
          temparray['dosages'] = res.rows.item(i).dosages;
          temparray['time'] = res.rows.item(i).time;
          temparray['alarm'] = res.rows.item(i).alarm;
          bridge.medications.push(temparray);
        }
      }, function (e) {
      });
    });
  }

  gotoMeddetails() {
    this.navCtrl.push(MeddetailsPage);
  }

  openMed(medId) {
    this.navCtrl.push(MeddetailsPage, {
      'medId': medId
    });
  }
}
