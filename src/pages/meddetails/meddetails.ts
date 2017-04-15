import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';
import { InitDatabase } from '../../providers/init-database';
import { ScheduleMedication } from '../../providers/schedule-medication';
import { CaregiverDetailsPage } from '../caregiver-details/caregiver-details';
import { Camera } from 'ionic-native';
import { Printer, PrintOptions } from 'ionic-native';

@Component({
  selector: 'page-meddetails',
  templateUrl: 'meddetails.html',
  providers: [InitDatabase, ScheduleMedication]
})

export class MeddetailsPage {
  medId;
  todo = {};
  caregivers = [];
  havePrint = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: InitDatabase, private schedmed: ScheduleMedication) {
    this.loadCaregivers();
    if (navParams.get("medId") != null) {
      this.loadMedicine(navParams.get("medId"));
    }
    this.checkPrinter();
  }

  loadCaregivers() {
    let bridge = { 'caregivers': this.caregivers };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT id, name FROM caregiver', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          let temparray = {};
          temparray['id'] = res.rows.item(i).id;
          temparray['name'] = res.rows.item(i).name;
          bridge.caregivers.push(temparray);
        }
      }, function (e) {
      });
    });
  }

  loadMedicine(medId) {
    let bridge = { 'todo': this.todo };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT id, description, dosages, time1, time2, time3, time4, alarm, image, caregiver_id, insurance, pharmacy FROM alarms WHERE id=?', [medId], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          console.log("Desc:" + res.rows.item(i).description);
          bridge.todo['id'] = res.rows.item(i).id;
          bridge.todo['description'] = res.rows.item(i).description;
          bridge.todo['dosages'] = res.rows.item(i).dosages;
          bridge.todo['time1'] = res.rows.item(i).time1;
          bridge.todo['time2'] = res.rows.item(i).time2;
          bridge.todo['time3'] = res.rows.item(i).time3;
          bridge.todo['time4'] = res.rows.item(i).time4;
          bridge.todo['alarm'] = res.rows.item(i).alarm;
          bridge.todo['image'] = res.rows.item(i).image;
          bridge.todo['caregiver_id'] = res.rows.item(i).caregiver_id;
          bridge.todo['insurance'] = res.rows.item(i).insurance;
          bridge.todo['pharmacy'] = res.rows.item(i).pharmacy;
        }
      }, function (e) {
      });
    });
  }

  save() {
    this.replaceUndefined();
    let todo = this.todo;
    if (todo['id'] != null) {
      // Changing
      this.db._db.transaction(function (tx) {
        tx.executeSql('UPDATE alarms SET description = ?, dosages = ?, time1 = ?, time2 = ?, time3 = ?, time4 = ?, alarm = ?, image = ?, caregiver_id = ?, insurance = ?, pharmacy = ? WHERE id = ?', [
          todo['description'],
          todo['dosages'],
          todo['time1'],
          todo['time2'],
          todo['time3'],
          todo['time4'],
          todo['alarm'],
          todo['image'],
          todo['caregiver_id'],
          todo['insurance'],
          todo['pharmacy'],
          todo['id']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error updating the database " + e);
        });
      });
    } else {
      // Creating a new one
      this.db._db.transaction(function (tx) {
        tx.executeSql('INSERT INTO alarms (description, dosages, time1, time2, time3, time4, alarm, image, caregiver_id, insurance, pharmacy) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [
          todo['description'],
          todo['dosages'],
          todo['time1'],
          todo['time2'],
          todo['time3'],
          todo['time4'],
          todo['alarm'],
          todo['image'],
          todo['caregiver_id'],
          todo['insurance'],
          todo['pharmacy']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error to insert in the database " + e);
        });
      });
    }
    this.schedmed.setAlarms();
    this.navCtrl.pop();
  }

  closeWindow(){
    this.navCtrl.pop();
  }
  
  replaceUndefined() {
    if (this.todo['dosages'] == undefined) {
      this.todo['dosages'] = null;
    }
    if (this.todo['time1'] == undefined) {
      this.todo['time1'] = null;
    }
    if (this.todo['time2'] == undefined) {
      this.todo['time2'] = null;
    }
    if (this.todo['time3'] == undefined) {
      this.todo['time3'] = null;
    }
    if (this.todo['time4'] == undefined) {
      this.todo['time4'] = null;
    }
    if (this.todo['alarm'] == undefined) {
      this.todo['alarm'] = false;
    }
    if (this.todo['image'] == undefined) {
      this.todo['image'] = null;
    }
    if (this.todo['caregiver_id'] == undefined) {
      this.todo['caregiver_id'] = null;
    }
    if (this.todo['insurance'] == undefined) {
      this.todo['insurance'] = null;
    }
    if (this.todo['pharmacy'] == undefined) {
      this.todo['pharmacy'] = null;
    }
  }

  deleteMedicine() {
    let todo = this.todo;
    this.db._db.transaction(function (tx) {
      tx.executeSql('DELETE FROM alarms WHERE id = ?', [
        todo['id']
      ], function (tx, res) {
      }, function (e) {
        console.log(e.message + " Error updating the database " + e);
      });
    });
    this.schedmed.setAlarms();
    this.navCtrl.pop();
  }

  testNotification() {
    LocalNotifications.schedule({
      title: this.todo['description'],
      text: this.todo['dosages'],
      led: "FF0000",
      sound: 'file://assets/sounds/alarm_bell.mp3'
    });
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
      this.todo['image'] = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  contactCaregiver() {
    this.navCtrl.push(CaregiverDetailsPage, {
      'localId': this.todo['caregiver_id']
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
    text += "Description: " + this.todo['description'] + "%0D%0A";
    if (this.todo['dosages'] != null) {
      text += "Dosages: " + this.todo['dosages'] + "%0D%0A";
    }
    if (this.todo['insurance'] != null) {
      text += "Insurance details: " + this.todo['insurance'] + "%0D%0A";
    }
    if (this.todo['pharmacy'] != null) {
      text += "Pharmacy: " + this.todo['pharmacy'] + "%0D%0A";
    }

    return text;
  }

  makePrint() {
    // Here we can use html tags to make the printed version
    let text = "";
    text += "<b>Description:</b> " + this.todo['description'] + "<br>";
    if (this.todo['dosages'] != null) {
      text += "<b>Dosages:</b> " + this.todo['dosages'] + "<br>";
    }
    if (this.todo['insurance'] != null) {
      text += "<b>Insurance details:</b> " + this.todo['insurance'] + "<br>";
    }
    if (this.todo['pharmacy'] != null) {
      text += "<b>Pharmacy:</b> " + this.todo['pharmacy'] + "<br>";
    }
    return text;
  }

  print() {
    let options: PrintOptions = {};
    Printer.print(this.makePrint(), options);
  }
}
