import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
import { LocalNotifications } from 'ionic-native';
import { InitDatabase } from '../../providers/init-database';

// import { Sql } from "../providers/Sql";
/*
  Generated class for the Meddetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
// const DB_NAME: string = '__ionicstorage';
// const win: any = window;

@Component({
  selector: 'page-meddetails',
  templateUrl: 'meddetails.html',
  providers: [InitDatabase]
  // providers: [Storage]
})

export class MeddetailsPage {
  medId;
  todo = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: InitDatabase) {
    console.log("Medid" + navParams.get("medId"));
    if (navParams.get("medId") != null) {
      this.loadMedicine(navParams.get("medId"));
    }
  }

  loadMedicine(medId) {
    let bridge = { 'todo': this.todo };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT id, description, dosages, time, alarm FROM alarms WHERE id=?', [medId], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          console.log("Desc:" + res.rows.item(i).description);
          bridge.todo['id'] = res.rows.item(i).id;
          bridge.todo['description'] = res.rows.item(i).description;
          bridge.todo['dosages'] = res.rows.item(i).dosages;
          bridge.todo['datetime'] = res.rows.item(i).datetime;
          bridge.todo['alarm'] = res.rows.item(i).alarm;
        }
      }, function (e) {
      });
    });
  }

  saveMedicine() {
    this.replaceUndefined();
    let todo = this.todo;
    console.log("Saving:" + todo['id']);    
    if (todo['id'] != null) {
      // Changing
      console.log("TODO:" + todo['id']);
      this.db._db.transaction(function (tx) {
        tx.executeSql('UPDATE alarms SET description = ?, dosages = ?, time = ?, alarm = ? WHERE id = ?', [
          todo['description'],
          todo['dosages'],
          todo['time'],
          todo['alarm'],
          todo['id']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error updating the database " + e);
        });
      });
    } else {
      // Creating a new one
      this.db._db.transaction(function (tx) {
        tx.executeSql('INSERT INTO alarms (description, dosages, time, alarm) VALUES (?,?,?,?)', [
          todo['description'],
          todo['dosages'],
          todo['time'],
          todo['alarm']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error to insert in the database " + e);
        });
      });
    }
    this.navCtrl.pop();
  }

  replaceUndefined(){
    if(this.todo['dosages'] == undefined){
      this.todo['dosages'] = null;
    }
    if(this.todo['time'] == undefined){
      this.todo['time'] = null;
    }
    if(this.todo['alarm'] == undefined){
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
    // this.setNotifications();
    this.navCtrl.pop();
  }

  setNotifications() {
    // LocalNotifications.clearAll();
    // LocalNotifications.cancelAll();
    // let storage = new Storage();
    // console.log("Horario:" + this.todo['datetime'].toString());


    // let allAlarms = [];
    // storage.get('medicine').then((val) => {
    //   let hasAlarms = 0;
    //   for (let i in val) {
    //     if (val[i]['alarm'] == true) {
    //       console.log("adding alarm");
    //       let now = new Date();
    //       console.log()
    //       let firstAtDate = new Date(now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + val[i]['datetime'].toString());
    //       allAlarms[hasAlarms] = {
    //         id: val[i]['id'],
    //         title: val[i]['description'],
    //         text: val[i]['dosages'],
    //         at: firstAtDate,
    //         every: "day",
    //         led: "FF0000",
    //         sound: 'file://assets/sounds/alarm_bell.mp3'
    //       };
    //       hasAlarms++;
    //     }
    //   }
    //   console.log("HasC:" + hasAlarms);
    //   if (hasAlarms > 0) {
    //     console.log("Ading alarm because has");
    //     LocalNotifications.schedule(allAlarms);
    //   }
    // });
  }

  // setNotifications_bkp() {
  //   LocalNotifications.clearAll();
  //   LocalNotifications.cancelAll();
  //   let storage = new Storage();
  //   console.log("Horario:" + this.todo['datetime'].toString());


  //   let allAlarms = [];
  //   storage.get('medicine').then((val) => {
  //     let hasAlarms = 0;
  //     for (let i in val) {
  //       if (val[i]['alarm'] == true) {
  //         console.log("adding alarm");
  //         let now = new Date();
  //         console.log()
  //         let firstAtDate = new Date(now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + val[i]['datetime'].toString());
  //         allAlarms[hasAlarms] = {
  //           id: val[i]['id'],
  //           title: val[i]['description'],
  //           text: val[i]['dosages'],
  //           at: firstAtDate,
  //           every: "day",
  //           led: "FF0000",
  //           sound: 'file://assets/sounds/alarm_bell.mp3'
  //         };
  //         hasAlarms++;
  //       }
  //     }
  //     console.log("HasC:" + hasAlarms);
  //     if (hasAlarms > 0) {
  //       console.log("Ading alarm because has");
  //       LocalNotifications.schedule(allAlarms);
  //     }
  //   });
  // }

  testNotification() {
    LocalNotifications.schedule({
      title: this.todo['description'],
      text: this.todo['dosages'],
      led: "FF0000",
      sound: 'file://assets/sounds/alarm_bell.mp3'
    });
  }
}
