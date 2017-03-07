import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CreateAccountPage } from '../create-account/create-account';
import { MedhomePage } from '../medhome/medhome';
import { InitDatabase } from '../../providers/init-database';
import { ScheduleMedication } from '../../providers/schedule-medication';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [InitDatabase, ScheduleMedication]
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private db: InitDatabase, private schedmed: ScheduleMedication) {
    console.log("Inicia banco de dados");
    this.db.createDatabase();
  }

  ionViewDidLoad() {
    this.schedmed.setAlarms();
  }

  doAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sorry!',
      message: 'That feature has not been implemented yet!',
      buttons: ['Ok']
    });
    alert.present()
  }

  createAccount() {
    this.navCtrl.push(CreateAccountPage);
  }

  gotoMedicationHome() {
    this.navCtrl.push(MedhomePage);
  }

}
