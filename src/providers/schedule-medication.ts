import { Injectable } from '@angular/core';
import { LocalNotifications } from 'ionic-native';

const win: any = window;
const alarmAhead = 30; // How many days the alarm should be set upfront

@Injectable()
export class ScheduleMedication {
  public _db: any;
  constructor() {
    if (win.sqlitePlugin) {
      this._db = win.sqlitePlugin.openDatabase({
        name: '__RareGenomics',
        location: 2,
        createFromLocation: 0
      });

    } else {
      console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
      this._db = win.openDatabase('__RareGenomics', '1.0', 'database', 5 * 1024 * 1024);
    }
  }

  setAlarms() {
    console.log("Setting alarams");
    LocalNotifications.cancelAll();
    // Time 1
    this._db.transaction(function (tx) {
      tx.executeSql("SELECT id, description, dosages, time1, alarm FROM alarms WHERE alarm='true' AND time1 > 0", [], function (tx, res) {
        var len = res.rows.length;
        let allAlarms = [];
        let hasAlarms = 0;
        let dateNow = new Date();
        for (var i = 0; i < len; i++) {
          let tomorrow = new Date();
          for (let iii = 0; iii < alarmAhead; iii++) {
            tomorrow.setHours(res.rows.item(i).time1.split(":")[0]);
            tomorrow.setMinutes(res.rows.item(i).time1.split(":")[1]);
            tomorrow.setSeconds(0);
            if (tomorrow >= dateNow) {
              allAlarms[hasAlarms] = {
                id: hasAlarms,
                title: res.rows.item(i).description,
                text: res.rows.item(i).dosages,
                at: new Date(tomorrow),
                led: "FF0000",
                sound: 'file://assets/sounds/alarm_bell.mp3'
              };
              hasAlarms++;
            }
            tomorrow.setDate(tomorrow.getDate() + 1);
          }
        }
        if (hasAlarms > 0) {
          LocalNotifications.schedule(allAlarms);
        }
      }, function (e) {
      });      
    });
    // Time 2
    this._db.transaction(function (tx) {
      tx.executeSql("SELECT id, description, dosages, time2, alarm FROM alarms WHERE alarm='true' AND time2 > 0", [], function (tx, res) {
        var len = res.rows.length;
        let allAlarms = [];
        let hasAlarms = 0;
        let dateNow = new Date();
        for (var i = 0; i < len; i++) {
          let tomorrow = new Date();
          for (let iii = 0; iii < alarmAhead; iii++) {
            tomorrow.setHours(res.rows.item(i).time2.split(":")[0]);
            tomorrow.setMinutes(res.rows.item(i).time2.split(":")[1]);
            tomorrow.setSeconds(0);
            if (tomorrow >= dateNow) {
              allAlarms[hasAlarms] = {
                id: hasAlarms,
                title: res.rows.item(i).description,
                text: res.rows.item(i).dosages,
                at: new Date(tomorrow),
                led: "FF0000",
                sound: 'file://assets/sounds/alarm_bell.mp3'
              };
              hasAlarms++;
            }
            tomorrow.setDate(tomorrow.getDate() + 1);
          }
        }
        if (hasAlarms > 0) {
          LocalNotifications.schedule(allAlarms);
        }
      }, function (e) {
      });      
    });
    // Time 3
    this._db.transaction(function (tx) {
      tx.executeSql("SELECT id, description, dosages, time3, alarm FROM alarms WHERE alarm='true' AND time3 > 0", [], function (tx, res) {
        var len = res.rows.length;
        let allAlarms = [];
        let hasAlarms = 0;
        let dateNow = new Date();
        for (var i = 0; i < len; i++) {
          let tomorrow = new Date();
          for (let iii = 0; iii < alarmAhead; iii++) {
            tomorrow.setHours(res.rows.item(i).time3.split(":")[0]);
            tomorrow.setMinutes(res.rows.item(i).time3.split(":")[1]);
            tomorrow.setSeconds(0);
            if (tomorrow >= dateNow) {
              allAlarms[hasAlarms] = {
                id: hasAlarms,
                title: res.rows.item(i).description,
                text: res.rows.item(i).dosages,
                at: new Date(tomorrow),
                led: "FF0000",
                sound: 'file://assets/sounds/alarm_bell.mp3'
              };
              hasAlarms++;
            }
            tomorrow.setDate(tomorrow.getDate() + 1);
          }
        }
        if (hasAlarms > 0) {
          LocalNotifications.schedule(allAlarms);
        }
      }, function (e) {
      });      
    });
    // Time 4
    this._db.transaction(function (tx) {
      tx.executeSql("SELECT id, description, dosages, time4, alarm FROM alarms WHERE alarm='true' AND time4 > 0", [], function (tx, res) {
        var len = res.rows.length;
        let allAlarms = [];
        let hasAlarms = 0;
        let dateNow = new Date();
        for (var i = 0; i < len; i++) {
          let tomorrow = new Date();
          for (let iii = 0; iii < alarmAhead; iii++) {
            tomorrow.setHours(res.rows.item(i).time4.split(":")[0]);
            tomorrow.setMinutes(res.rows.item(i).time4.split(":")[1]);
            tomorrow.setSeconds(0);
            if (tomorrow >= dateNow) {
              allAlarms[hasAlarms] = {
                id: hasAlarms,
                title: res.rows.item(i).description,
                text: res.rows.item(i).dosages,
                at: new Date(tomorrow),
                led: "FF0000",
                sound: 'file://assets/sounds/alarm_bell.mp3'
              };
              hasAlarms++;
            }
            tomorrow.setDate(tomorrow.getDate() + 1);
          }
        }
        if (hasAlarms > 0) {
          LocalNotifications.schedule(allAlarms);
        }
      }, function (e) {
      });      
    });
  }     
}
