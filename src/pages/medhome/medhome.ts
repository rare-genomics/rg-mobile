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
      tx.executeSql('SELECT id, description, dosages, time, alarm, image, insurance FROM alarms', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          let temparray = {};
          temparray['id'] = res.rows.item(i).id;
          temparray['description'] = res.rows.item(i).description;
          temparray['dosages'] = res.rows.item(i).dosages;
          temparray['time'] = res.rows.item(i).time;
          temparray['alarm'] = res.rows.item(i).alarm;
          temparray['image'] = res.rows.item(i).image;
          temparray['insurance'] = res.rows.item(i).insurance;
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
      if (this.medications[i].time != null) {
        text += "Time: " + this.medications[i].time + "%0D%0A";
      }
      if (this.medications[i].insurance != null) {
        text += "Insurance: " + this.medications[i].insurance + "%0D%0A";
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
      if (this.medications[i].time != null) {
        text += "<b>Time:</b> " + this.medications[i].time + "<br>";
      }
      if (this.medications[i].insurance != null) {
        text += "<b>Insurance:</b> " + this.medications[i].insurance + "<br>";
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
