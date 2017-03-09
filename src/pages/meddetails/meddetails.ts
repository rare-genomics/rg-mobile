import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';
import { InitDatabase } from '../../providers/init-database';
import { ScheduleMedication } from '../../providers/schedule-medication';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-meddetails',
  templateUrl: 'meddetails.html',
  providers: [InitDatabase, ScheduleMedication]
})

export class MeddetailsPage {
  medId;
  todo = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: InitDatabase, private schedmed: ScheduleMedication) {
    if (navParams.get("medId") != null) {
      this.loadMedicine(navParams.get("medId"));
    }
  }

  loadMedicine(medId) {
    let bridge = { 'todo': this.todo };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT id, description, dosages, time, alarm, image FROM alarms WHERE id=?', [medId], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          console.log("Desc:" + res.rows.item(i).description);
          bridge.todo['id'] = res.rows.item(i).id;
          bridge.todo['description'] = res.rows.item(i).description;
          bridge.todo['dosages'] = res.rows.item(i).dosages;
          bridge.todo['time'] = res.rows.item(i).time;
          bridge.todo['alarm'] = res.rows.item(i).alarm;
          bridge.todo['image'] = res.rows.item(i).image;          
        }
      }, function (e) {
      });
    });
    console.log("lendo imagem3:" + bridge.todo['image']);
  }

  saveMedicine() {
    this.replaceUndefined();
    let todo = this.todo;
    if (todo['id'] != null) {
      // Changing
      this.db._db.transaction(function (tx) {
        tx.executeSql('UPDATE alarms SET description = ?, dosages = ?, time = ?, alarm = ?, image = ? WHERE id = ?', [
          todo['description'],
          todo['dosages'],
          todo['time'],
          todo['alarm'],
          todo['image'],
          todo['id']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error updating the database " + e);
        });
      });
    } else {
      // Creating a new one
      this.db._db.transaction(function (tx) {
        tx.executeSql('INSERT INTO alarms (description, dosages, time, alarm, image) VALUES (?,?,?,?,?)', [
          todo['description'],
          todo['dosages'],
          todo['time'],
          todo['alarm'],
          todo['image']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error to insert in the database " + e);
        });
      });
    }
    this.schedmed.setAlarms();
    this.navCtrl.pop();
  }

  replaceUndefined() {
    if (this.todo['dosages'] == undefined) {
      this.todo['dosages'] = null;
    }
    if (this.todo['time'] == undefined) {
      this.todo['time'] = null;
    }
    if (this.todo['alarm'] == undefined) {
      this.todo['alarm'] = false;
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
}
