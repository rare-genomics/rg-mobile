import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InitDatabase } from '../../providers/init-database';

@Component({
  selector: 'page-caregiver-details',
  templateUrl: 'caregiver-details.html',
  providers: [InitDatabase]
})
export class CaregiverDetailsPage {
  localId;
  todo = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: InitDatabase) {
    if (navParams.get("localId") != null) {
      this.loadData(navParams.get("localId"));
    }
  }
  loadData(localId) {
    let bridge = { 'todo': this.todo };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT id, name, email, phone, address, notes FROM caregiver WHERE id=?', [localId], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.todo['id'] = res.rows.item(i).id;
          bridge.todo['name'] = res.rows.item(i).name;
          bridge.todo['email'] = res.rows.item(i).email;
          bridge.todo['phone'] = res.rows.item(i).phone;
          bridge.todo['address'] = res.rows.item(i).address;
          bridge.todo['notes'] = res.rows.item(i).notes;
        }
      }, function (e) {
      });
    });
  }

  saveData() {
    this.replaceUndefined();
    let todo = this.todo;
    if (todo['id'] != null) {
      // Changing
      this.db._db.transaction(function (tx) {
        tx.executeSql('UPDATE caregiver SET name = ?, email = ?, phone = ?, address = ?, notes = ? WHERE id = ?', [
          todo['name'],
          todo['email'],
          todo['phone'],
          todo['address'],
          todo['notes'],
          todo['id']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error updating the database " + e);
        });
      });
    } else {
      // Creating a new one
      // this.db._db.transaction(function (tx) {
      //   tx.executeSql('INSERT INTO caregiver (name, email, phone, address, notes) VALUES (?,?,?,?,?)', [
      //     todo['name'],
      //     todo['email'],
      //     todo['phone'],
      //     todo['address'],
      //     todo['notes']
      //   ], function (tx, res) {
      //   }, function (e) {
      //     console.log(e.message + " Error to insert in the database " + e);
      //   });
      // });
      this.db._db.transaction(function (tx) {
        tx.executeSql('INSERT INTO caregiver (name) VALUES (?)', [
          todo['name']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error to insert in the database " + e);
        });
      });
    }
    this.navCtrl.pop();
  }

  replaceUndefined() {
    if (this.todo['email'] == undefined) {
      this.todo['email'] = null;
    }
    if (this.todo['phone'] == undefined) {
      this.todo['phone'] = null;
    }
    if (this.todo['address'] == undefined) {
      this.todo['address'] = null;
    }
    if (this.todo['notes'] == undefined) {
      this.todo['notes'] = null;
    }
  }

  deleteData() {
    let todo = this.todo;
    this.db._db.transaction(function (tx) {
      tx.executeSql('DELETE FROM caregiver WHERE id = ?', [
        todo['id']
      ], function (tx, res) {
      }, function (e) {
        console.log(e.message + " Error updating the database " + e);
      });
    });
    this.navCtrl.pop();
  }
}
