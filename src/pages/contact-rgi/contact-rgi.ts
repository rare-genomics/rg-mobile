import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact-rgi',
  templateUrl: 'contact-rgi.html'
})

export class ContactRGIPage {
  formData = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactRGIPage');
  }

  // private jsonToURLEncoded(jsonString) {
  //   return Object.keys(jsonString).map(function (key) {
  //     return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
  //   }).join('&');
  // }

  sendDataToApi() {
    // let body = this.jsonToURLEncoded(localData);
    // var link = 'http://localhost:3000/api/registration';
    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    // let options = new RequestOptions({
    //   headers: headers
    // });
    // this.http.post(link, body, options)
    //   .subscribe(data => {
    //   }, error => {
    //     console.log(JSON.stringify(error.json()));
    //   });
  }

}
