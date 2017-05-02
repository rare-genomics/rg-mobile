import { Injectable } from '@angular/core';

const win: any = window;

@Injectable()
export class InitDatabase {
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

  createDatabase() {
    console.log("Creating database");
    this._db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS alarms (id INTEGER PRIMARY KEY, description TEXT, dosages REAL, time1 TIME, time2 TIME, time3 TIME, time4 TIME, alarm BOOLEAN, image TEXT, caregiver_id INTEGER, insurance TEXT, pharmacy TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, sync BOOLEAN DEFAULT false)');
      // Missing the logic of the screen -- tx.executeSql('CREATE TABLE IF NOT EXISTS appointment (id INTEGER PRIMARY KEY, description TEXT, dosages REAL, time1 TIME, time2 TIME, time3 TIME, time4 TIME, alarm BOOLEAN, image TEXT, caregiver_id INTEGER, insurance TEXT, pharmacy TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)');      
      tx.executeSql('CREATE TABLE IF NOT EXISTS caregiver (id INTEGER PRIMARY KEY, name TEXT, email TEXT, phone TEXT, address TEXT, notes TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, sync BOOLEAN DEFAULT false)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, email TEXT, password TEXT, birthdate DATE, allow_optin_flag BOOLEAN, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, patient BOOLEAN, caregiver BOOLEAN, donor BOOLEAN, type_other BOOLEAN, publicprofile BOOLEAN, mystory TEXT, myupdates TEXT, picture TEXT, sync BOOLEAN DEFAULT false)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS medication_history (id INTEGER PRIMARY KEY, medication_id INTEGER, medication TEXT, dosages REAL, time DATETIME DEFAULT CURRENT_TIMESTAMP, taken BOOLEAN, mood REAL, sync BOOLEAN DEFAULT false)');
    });
  }
  dropDatabase() {
    this._db.transaction(function (tx) {
      tx.executeSql('DROP TABLE alarms');
      // tx.executeSql('DROP TABLE appointment');
      tx.executeSql('DROP TABLE caregiver');
      tx.executeSql('DROP TABLE profile');
      tx.executeSql('DROP TABLE medication_history');
    });
    this.createDatabase();
  }
}
