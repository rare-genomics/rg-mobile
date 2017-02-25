import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MeddetailsPage } from '../meddetails/meddetails';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Medhome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-medhome',
  templateUrl: 'medhome.html',
  providers: [Storage]
})
export class MedhomePage {
  medications: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidEnter() {
    this.loadList();
  }

  loadList() {
    let storage = new Storage();
    this.medications = [];
    storage.get('medicine').then((val) => {
      for (let i in val) {
        let temparray = {};
        temparray['description'] = val[i]['description'];
        temparray['dosages'] = val[i]['dosages'];
        temparray['datetime'] = val[i]['datetime'];
        temparray['alarm'] = val[i]['alarm'];
        temparray['id'] = val[i]['id'];
        this.medications.push(temparray);
      }
    });
  }

  gotoMeddetails() {
    this.navCtrl.push(MeddetailsPage);
  }

  openMed(medId) {
    this.navCtrl.push(MeddetailsPage, {
      'medId': medId
    });
    console.log("Deve abrir " + medId);
  }

}
