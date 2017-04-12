import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Preferences page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html'
})
export class PreferencesPage {

  formData = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencesPage');
  }

  closeWindow() {
    this.navCtrl.pop();
  }

  provideCGAccess(isChecked) {

    console.log('&&&&&&&&&&&' + isChecked);
    // if(isChecked)
    // {
    //   this.formData['CGUsername'].readonly = false;
    //   this.formData['CGPassword'].readonly = false;
    // }

  }

}
