import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsertypePagePage } from '../usertype/usertype';
import { LoginPage } from '../login/login';
import { InitDatabase } from '../../providers/init-database';
import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-email-address',
  templateUrl: 'email-address.html',
  providers: [InitDatabase]
})
export class EmailAddressPage {
  localdata = {};
  constructor(public navCtrl: NavController, private db: InitDatabase, public alertCtrl: AlertController, public http: Http) {
    this.loadData();
  }

  loadData() {
    let bridge = { 'localdata': this.localdata};
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT email FROM profile WHERE id=1', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.localdata['email'] = res.rows.item(i).email;
          bridge.localdata['emailexist'] = true;
        }
      }, function (e) {
      });
    });
  }

  replaceUndefined() {
    if (this.localdata['email'] == undefined || this.localdata['email'] == "") {
      this.doAlert("Missing e-mail");
      return 1;
    }
    var RegExp = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,24})$/;
    if (RegExp.exec(this.localdata['email']) == null) {
      this.doAlert("Invalid e-mail");
      return 1;
    }
    return 0;
  }

  checkEmail() {
    let body = this.jsonToURLEncoded({
      email: this.localdata['email']
    });
    var link = 'https://mobile.raregenomics.org/api/checkemail';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post(link, body, options)
      .subscribe(data => {
        if (data.status == 201) {          
          this.saveData();
        } else if (data.status == 202) {
          this.navCtrl.push(LoginPage);
        }
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  saveData() {
    if (this.replaceUndefined() == 1) {
      return;
    }
    let bridge = this.localdata;
    if(this.localdata['emailexist'] == true){
      this.db._db.transaction(function (tx) {
        tx.executeSql('UPDATE profile SET email = ?', [
          bridge['email']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error updating the database " + e);
        });
      });
    } else {
      this.db._db.transaction(function (tx) {
        tx.executeSql('INSERT INTO profile (id, email) VALUES (1,?)', [
          bridge['email']
        ], function (tx, res) {
        }, function (e) {
          console.log(e.message + " Error updating the database " + e);
        });
      });
    }
    this.navCtrl.push(UsertypePagePage);
  }

  goBack() {
    this.navCtrl.pop();
  }

  doAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      message: msg,
      buttons: ['Ok']
    });
    alert.present()
  }

  private jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

}
