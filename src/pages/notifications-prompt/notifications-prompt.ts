import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InitDatabase } from '../../providers/init-database';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-notifications-prompt',
  templateUrl: 'notifications-prompt.html',
  providers: [InitDatabase]
})
export class NotificationsPromptPage {

  constructor(public navCtrl: NavController, private db: InitDatabase, public http: Http) { }

  saveData(status) {
    this.db._db.transaction(function (tx) {
      tx.executeSql('UPDATE profile SET allow_optin_flag = ?', [
        status
      ], function (tx, res) {
      }, function (e) {
        console.log(e.message + " Error updating the database " + e);
      });
    });    
    this.submitRegistration();
  }

  goBack() {
    this.navCtrl.pop();
  }

  private jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  sendDataToApi(localData) {
    let body = this.jsonToURLEncoded(localData);
    var link = 'http://localhost:3000/api/registration';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post(link, body, options)
      .subscribe(data => {
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  submitRegistration() {
    let bridge = { jsonToURLEncoded: this.jsonToURLEncoded, sendDataToApi: this.sendDataToApi, http: this.http };
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT id, firstname, lastname, email, password, birthdate, allow_optin_flag FROM profile WHERE id=1', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.sendDataToApi(res.rows.item(i));
        }
      }, function (e) {
      });
    });   
  }
}
