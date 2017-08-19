import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { MedhomePage } from '../medhome/medhome';
import { InitDatabase } from '../../providers/init-database';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [InitDatabase]
})
export class LoginPage {
  localdata = {};
  constructor(private db: InitDatabase, public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) { 
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  private jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  loadData() {
    let bridge = { 'localdata': this.localdata};
    this.db._db.transaction(function (tx) {
      tx.executeSql('SELECT email, password FROM profile WHERE id=1', [], function (tx, res) {
        var len = res.rows.length;
        for (var i = 0; i < len; i++) {
          bridge.localdata['email'] = res.rows.item(i).email;
          bridge.localdata['password'] = res.rows.item(i).password;
          bridge.localdata['emailexist'] = true;
        }
      }, function (e) {
      });
    });
  }

  signIn() {    
    let body = this.jsonToURLEncoded({
      email: this.localdata['email'],
      password: this.localdata['password']
    });
    var link = 'https://mobile.raregenomics.org/api/signin';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post(link, body, options)
      .subscribe(data => {
        if (data.status == 200) {                   
          console.log("Login OK");    
          this.saveData();             
        } else if (data.status == 202) {
          let alert = this.alertCtrl.create({
            title: 'Message',
            subTitle: data.json().message,
            buttons: ['OK']
          });
          alert.present();
        } else if (data.status == 400) {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: data.json().message,
            buttons: ['OK']
          });
          alert.present();
        }
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  saveData() {  
    let bridge = this.localdata;
    let navctrlbridge = this.navCtrl;
    if(this.localdata['emailexist'] == true){
      this.db._db.transaction(function (tx) {
        tx.executeSql('UPDATE profile SET email = ?, password = ? , loggedin = \'true\'', [
          bridge['email'],
          bridge['password']
        ], function (tx, res) {
          navctrlbridge.setRoot(MedhomePage);
        }, function (e) {
          console.log(e.message + " Error updating the database " + e);
        });
      });
    } else {
      this.db._db.transaction(function (tx) {
        tx.executeSql('INSERT INTO profile (id, email, password, loggedin) VALUES (1,?,?,\'true\')', [
          bridge['email'],
          bridge['password']
        ], function (tx, res) {
          navctrlbridge.setRoot(MedhomePage);
        }, function (e) {
          console.log(e.message + " Error updating the database " + e);
        });
      });
    }
  }

  forgotPassword() {
    let body = this.jsonToURLEncoded({
      email: this.localdata['email']
    });
    var link = 'https://mobile.raregenomics.org/api/forgotpassword';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({
      headers: headers
    });
    this.http.post(link, body, options)
      .subscribe(data => {
        if (data.status == 201) {          
          // this.saveData();
          console.log("Email enviado");
        } else if (data.status == 202) {
          this.navCtrl.push(LoginPage);
        }
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

}
