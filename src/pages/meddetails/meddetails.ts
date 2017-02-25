import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from 'ionic-native';
/*
  Generated class for the Meddetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-meddetails',
  templateUrl: 'meddetails.html',
  providers: [Storage]
})

export class MeddetailsPage {
  medId;
  todo = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage, public params: NavParams) {
    if (params.get("medId") != null) {
      this.medId = params.get("medId");
      let storage = new Storage();
      storage.get('medicine').then((val) => {
        for (let i in val) {
          if (val[i]['id'] == params.get("medId")) {
            this.todo['description'] = val[i]['description'];
            this.todo['dosages'] = val[i]['dosages'];
            this.todo['datetime'] = val[i]['datetime'];
            this.todo['alarm'] = val[i]['alarm'];
          }
        }
      });
    }
  }

  saveMedicine() {
    let storage = new Storage();
    storage.get('medicine').then((val) => {
      if (this.medId) {
        for (let i in val) {
          if (val[i]['id'] == this.medId) {
            val[i]['description'] = this.todo['description'];
            val[i]['dosages'] = this.todo['dosages'];
            val[i]['datetime'] = this.todo['datetime'];
            val[i]['alarm'] = this.todo['alarm'];
            break;
          }
        }
      } else {
        this.medId = Math.floor(Date.now())
        let currentTodo = {
          'id': this.medId,
          'description': this.todo['description'],
          'dosages': this.todo['dosages'],
          'datetime': this.todo['datetime'],
          'alarm': this.todo['alarm']
        };
        if (val == null) {
          let objt = [];
          objt.push(currentTodo);
          val = objt;
        } else {
          val.push(currentTodo);
        }
      }
      storage.set('medicine', val);
    });
    this.setNotifications();
    this.navCtrl.pop();
  }

  deleteMedicine() {
    let storage = new Storage();
    storage.get('medicine').then((val) => {
      let arraySlice = [];
      for (let i in val) {
        if (val[i]['id'] != this.medId) {
          arraySlice.push(val[i]);
        }
      }
      storage.set('medicine', arraySlice);
    });
    this.setNotifications();
    this.navCtrl.pop();
  }

  setNotifications() {
    LocalNotifications.clearAll();
    LocalNotifications.cancelAll();
    let storage = new Storage();
    console.log("Horario:" + this.todo['datetime'].toString());


    let allAlarms = [];
    storage.get('medicine').then((val) => {
      let hasAlarms = 0;
      for (let i in val) {
        if (val[i]['alarm'] == true) {
          console.log("adding alarm");
          let now = new Date();          
          let firstAtDate = new Date(now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + this.todo['datetime'].toString());
          allAlarms[hasAlarms] = {
            id: val[i]['id'],
            title: val[i]['description'],
            text: val[i]['dosages'],
            at: firstAtDate,
            every: "day",
            led: "FF0000",
            sound: 'file://assets/sounds/alarm_bell.mp3'
          };
          hasAlarms++;
        }
      }
      console.log("HasC:" + hasAlarms);
      if (hasAlarms > 0) {
        console.log("Ading alarm because has");
        LocalNotifications.schedule(allAlarms);
      }
    });


    // LocalNotifications.schedule({
    //         id: val[i]['id'],
    //         title: val[i]['description'],
    //         text: val[i]['dosages'],
    //         at: firstAtDate,
    //         every: "day",
    //         led: "FF0000",
    //         sound: 'file://assets/sounds/alarm_bell.mp3'
    //       });
  }

  testNotification() {
    LocalNotifications.schedule({
      title: this.todo['description'],
      text: this.todo['dosages'],
      led: "FF0000",
      sound: 'file://assets/sounds/alarm_bell.mp3'
    });
  }
}
