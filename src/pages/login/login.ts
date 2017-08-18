import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  localdata = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  private jsonToURLEncoded(jsonString) {
    return Object.keys(jsonString).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
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
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
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
