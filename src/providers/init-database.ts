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
      tx.executeSql('CREATE TABLE IF NOT EXISTS alarms (id INTEGER PRIMARY KEY, description TEXT, dosages REAL, time TIME, alarm BOOLEAN, image TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)');      
      tx.executeSql('CREATE TABLE IF NOT EXISTS caregiver (id INTEGER PRIMARY KEY, name TEXT, email TEXT, telefone TEXT, address TEXT, notes TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)');      
    });
  }
  dropDatabase() {
    console.log("Droping the database");
    this._db.transaction(function (tx) {
      tx.executeSql('DROP TABLE alarms');      
      tx.executeSql('DROP TABLE caregiver');      
    });
    this.createDatabase();
  }
}
