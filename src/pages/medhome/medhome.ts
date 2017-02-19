import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MeddetailsPage } from '../meddetails/meddetails';

/*
  Generated class for the Medhome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-medhome',
  templateUrl: 'medhome.html'
})
export class MedhomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedhomePage');
  }

  gotoMeddetails() {    
    this.navCtrl.push(MeddetailsPage);
  }
}
