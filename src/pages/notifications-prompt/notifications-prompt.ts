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
      tx.executeSql('UPDATE profile SET notification = ?', [
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
    var link = 'http://localhost:3000/api/registration';
    let headers      = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({
      headers: headers
    });
    let body = this.jsonToURLEncoded({
      email: "email",
      password: "word"
    });
    this.http.post(link, body, options)
      .subscribe(data => {
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

}
