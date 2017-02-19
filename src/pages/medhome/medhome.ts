import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MeddetailsPage } from '../meddetails/meddetails';
import { Storage } from '@ionic/storage';
// import { Storage } from '@ionic/storage';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewWillEnter() {
    this.loadList();
  }

  loadList(){
    console.log("lendo lista");
    let storage = new Storage();
    this.medications = [];
    storage.get('medicine').then((val) => {
      for(let i in val){
          this.medications[i] = val[i];
      }
    });
  }
  onPageWillEnter() {
        console.log("Showing the first page!");
  }

  gotoMeddetails() {
    this.navCtrl.push(MeddetailsPage);
  }

  openMed(medId){
    this.navCtrl.push(MeddetailsPage, {
      'medId':medId
    });
    console.log("Deve abrir "+medId);
  }
  
}
