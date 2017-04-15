import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Market } from '@ionic-native/market';
import { EmailComposer } from '@ionic-native/email-composer';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private market: Market, private emailComposer: EmailComposer) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  closeWindow() {
    this.navCtrl.pop();;
  }

  openAppStore() {
    console.log('Clicked on Rate on App Store');
    this.market.open('https://play.google.com/store/apps');
  }

  submitFeedback() {
    console.log('Clicked on Submit Feedback');

    // let email = {
    //   to: 'thejaswini.sunilkumar@raregenomics.org',
    //   cc: 'thejaswini.sunilkumar@raregenomics.org',
    //   bcc: ['thejaswini.sunilkumar@raregenomics.org', 'thejaswini.sunilkumar@raregenomics.org'],
    //   subject: 'Feedback',
    //   body: 'Testing',
    //   isHtml: true
    // };

    // this.emailComposer.isAvailable().then((available: boolean) => {
    //   if (available) {
    //     //Now we know we can send
    //     this.emailComposer.open(email);
    //   }
    // });
  }

  callHelpCenter() {
    console.log('Clicked on Help Center');
  }

  viewPrivacyPolicy() {
    console.log('Clicked on Privacy Policy');
  }

  viewTandC() {
    console.log('Clicked on Terms and Condition');
  }

  signOut() {
    console.log('Clicked on Sign out');
  }

}
