import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InitDatabase } from '../../providers/init-database';
import { CallNumber, SMS } from 'ionic-native';

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
    console.log("Loading data:" + localId);
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
          console.log("nome:" + res.rows.item(i).name);
          console.log("Localid:" + localId);
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
      this.db._db.transaction(function (tx) {
        tx.executeSql('INSERT INTO caregiver (name, email, phone, address, notes) VALUES (?,?,?,?,?)', [
          todo['name'],
          todo['email'],
          todo['phone'],
          todo['address'],
          todo['notes']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error to insert in the database " + e);
        });
      });
      // this.db._db.transaction(function (tx) {
      //   tx.executeSql('INSERT INTO caregiver (name) VALUES (?)', [
      //     todo['name']
      //   ], function (tx, res) {
      //   }, function (e) {
      //     console.log(e.message + " Error to insert in the database " + e);
      //   });
      // });
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
    this.db._db.transaction(function (tx) {
      tx.executeSql('UPDATE alarms SET caregiver_id = NULL WHERE caregiver_id = ?', [
        todo['id']
      ], function (tx, res) {
      }, function (e) {
        console.log(e.message + " Error updating the database " + e);
      });
    });
    this.navCtrl.pop();
  }

  makeCall() {
    CallNumber.callNumber(this.todo['phone'], true).then(() => console.log('Launched dialer!')).catch(() => console.log('Error launching dialer'));
  }

  sendSMS() {
    var options = {
      replaceLineBreaks: true,
      android: {
        intent: ""
      }
    }
    SMS.send(this.todo['phone'], 'Test RGI', options)
      .then(() => {
        alert("Sucess");
      }, () => {
        alert("Failed");
      });
  }
}
