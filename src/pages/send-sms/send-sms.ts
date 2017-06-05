import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SMS } from 'ionic-native';
import { ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the SendSMS page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-send-sms',
  templateUrl: 'send-sms.html'
})
export class SendSMSPage {

  formData = {};
  phoneNumber;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
    this.phoneNumber = navParams.get('phoneNo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendSMSPage');
  }

  sendSMS() {
    let formData = this.formData;
    var options = {
      replaceLineBreaks: true,
      android: {
        intent: ""
      }
    }
    SMS.send(this.phoneNumber, formData['smsText'], options)
      .then(() => {
        this.toastCtrl.create({
          message: "SMS Sent Successfully",
          duration: 3000,
          cssClass: "toast-sms-success",
          position: "middle"
        }).present();
      }, () => {
        this.toastCtrl.create({
          message: "SMS Sending Failed",
          duration: 3000,
          cssClass: "toast-sms-failed",
          position: "middle"
        }).present();
      });

    this.viewCtrl.dismiss();
  }


  close() {
    this.viewCtrl.dismiss();
  }

}
