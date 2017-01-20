import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) { }

  doAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sorry!',
      message: 'That feature has not been implemented yet!',
      buttons: ['Ok']
    });
    alert.present()
  }

}
