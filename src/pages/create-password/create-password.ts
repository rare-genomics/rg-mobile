import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-create-password',
  templateUrl: 'create-password.html'
})
export class CreatePasswordPage {

  constructor(public navCtrl: NavController) { }

  goBack() {
    this.navCtrl.pop();
  }
}
