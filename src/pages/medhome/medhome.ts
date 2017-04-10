import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MeddetailsPage } from '../meddetails/meddetails';
import { InitDatabase } from '../../providers/init-database';
import { AlertController } from 'ionic-angular';
import { Printer, PrintOptions } from 'ionic-native';

@Component({
  selector: 'page-medhome',
  templateUrl: 'medhome.html',
  providers: [InitDatabase]
})
export class MedhomePage {
  medications = [];
  havePrint = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: InitDatabase, public alertCtrl: AlertController) {
    setInterval(() => {
      this.medications.length;
      this.havePrint;
    }, 1000);
    this.checkPrinter();
  }

  ionViewWillEnter() {
    this.medications = [];
    this.loadList();
  }

  loadList() {
    let bridge = { 'medications': this.medications };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT id, description, dosages, time1, time2, time3, time4, alarm, image, insurance, pharmacy FROM alarms', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          let temparray = {};
          temparray['id'] = res.rows.item(i).id;
          temparray['description'] = res.rows.item(i).description;
          temparray['dosages'] = res.rows.item(i).dosages;
          temparray['time1'] = res.rows.item(i).time1;
          temparray['time2'] = res.rows.item(i).time2;
          temparray['time3'] = res.rows.item(i).time3;
          temparray['time4'] = res.rows.item(i).time4;
          temparray['alarm'] = res.rows.item(i).alarm;
          temparray['image'] = res.rows.item(i).image;
          temparray['insurance'] = res.rows.item(i).insurance;
          temparray['pharmacy'] = res.rows.item(i).pharmacy;
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

  checkPrinter() {
    Printer.isAvailable().then((imageData) => {
      this.havePrint = true;
    }, (err) => {
      this.havePrint = false;
    });
  }

  makeEmail() {
    // E-mail new line fail depending on the mail client
    let text = "";    
    for (let i = 0; i < this.medications.length; i++) {
      text += "Description: " + this.medications[i].description + "%0D%0A";
      if (this.medications[i].dosages != null) {
        text += "Dosages: " + this.medications[i].dosages + "%0D%0A";
      }
      if (this.medications[i].time1 != null) {
        text += "Time1: " + this.medications[i].time1 + "%0D%0A";
      }
      if (this.medications[i].time2 != null) {
        text += "Time2: " + this.medications[i].time2 + "%0D%0A";
      }
      if (this.medications[i].time3 != null) {
        text += "Time3: " + this.medications[i].time3 + "%0D%0A";
      }
      if (this.medications[i].time4 != null) {
        text += "Time4: " + this.medications[i].time4 + "%0D%0A";
      }
      if (this.medications[i].insurance != null) {
        text += "Insurance: " + this.medications[i].insurance + "%0D%0A";
      }
      if (this.medications[i].pharmacy != null) {
        text += "Pharmacy: " + this.medications[i].pharmacy + "%0D%0A";
      }
      text += "%0D%0A"
    }    
    return text;
  }

  makePrint() {
    // Here we can use html tags to make the printed version
    let text = "";
    for (let i = 0; i < this.medications.length; i++) {
      text += "<b>Description:</b> " + this.medications[i].description + "<br>";
      if (this.medications[i].dosages != null) {
        text += "<b>Dosages:</b> " + this.medications[i].dosages + "<br>";
      }
      if (this.medications[i].time1 != null) {
        text += "Time1: " + this.medications[i].time1 + "%0D%0A";
      }
      if (this.medications[i].time2 != null) {
        text += "Time2: " + this.medications[i].time2 + "%0D%0A";
      }
      if (this.medications[i].time3 != null) {
        text += "Time3: " + this.medications[i].time3 + "%0D%0A";
      }
      if (this.medications[i].time4 != null) {
        text += "Time4: " + this.medications[i].time4 + "%0D%0A";
      }
      if (this.medications[i].insurance != null) {
        text += "<b>Insurance:</b> " + this.medications[i].insurance + "<br>";
      }
      if (this.medications[i].pharmacy != null) {
        text += "<b>Pharmacy:</b> " + this.medications[i].pharmacy + "<br>";
      }
      text += "<br>"
    }    
    return text;
  }

  print() {
    let options: PrintOptions = {};
    Printer.print(this.makePrint(), options);
  }
}
