import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InitDatabase } from '../../providers/init-database';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-notifications-prompt',
  templateUrl: 'notifications-prompt.html',
  providers: [InitDatabase]
})
export class NotificationsPromptPage {
  shouldgotologin = [0];
  timer;
  constructor(public navCtrl: NavController, private db: InitDatabase, public http: Http) { 
     this.timer = setInterval(()=>{
        if(this.shouldgotologin[0] == 1){
          this.navCtrl.setRoot(LoginPage);   
          clearInterval(this.timer);
        }
      }, 1000);
}

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

  submitRegistration() {
    let bridge = { db: this.db, jsonToURLEncoded: this.jsonToURLEncoded, http: this.http, shouldgotologin: this.shouldgotologin};
    new Promise(function (resolve, reject) {
      bridge.db._db.transaction(function (tx) {
        tx.executeSql('SELECT id, firstname, lastname, email, password, birthdate, allow_optin_flag, patient, caregiver FROM profile WHERE id=1', [], function (tx, res) {
          var len = res.rows.length;
          for (var i = 0; i < len; i++) {
              let body = bridge.jsonToURLEncoded(res.rows.item(i));
              var link = 'https://mobile.raregenomics.org/api/registration';
              let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
              let options = new RequestOptions({
                headers: headers
              });
                bridge.http.post(link, body, options).subscribe(data => {
                  resolve();
                }, error => {
                  console.log(JSON.stringify(error.json()));
                });
          }
        }, function (e) {
        });
      });
    }).then(function(result) {
      bridge.shouldgotologin[0] = 1;
         return result;
   })
  }
}
