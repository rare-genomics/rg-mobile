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
    this._db.transaction(function (tx) {
      tx.executeSql("SELECT id, description, dosages, time, alarm FROM alarms WHERE alarm='true' AND time > 0", [], function (tx, res) {
        var len = res.rows.length;
        let allAlarms = [];
        let hasAlarms = 0;
        for (var i = 0; i < len; i++) {
          let date1 = new Date();
          let day = date1.getDate();
          for (let iii = 0; iii < alarmAhead; iii++) {
            date1.setHours(res.rows.item(i).time.split(":")[0]);
            date1.setMinutes(res.rows.item(i).time.split(":")[1]);
            date1.setSeconds(0);
            // let id_local = res.rows.item(i).id + "_" + iii;
            allAlarms[hasAlarms] = {
              id: hasAlarms,
              title: res.rows.item(i).description,
              text: res.rows.item(i).dosages,
              at: date1,
              led: "FF0000",
              sound: 'file://assets/sounds/alarm_bell.mp3'
            };
            date1 = new Date(date1.setDate(day++));
            hasAlarms++;
          }
        }
        if (hasAlarms > 0) {
          console.log(allAlarms);
          LocalNotifications.schedule(allAlarms);
        }
      }, function (e) {
      });
    });
  }
}
