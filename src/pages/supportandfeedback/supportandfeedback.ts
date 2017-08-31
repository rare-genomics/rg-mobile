import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { EmailComposer } from '@ionic-native/email-composer';
import { RarereachPage } from '../rarereach/rarereach';
import * as PlatformConstant from '../../constants/platform';
import * as ContactInformation from '../../constants/contactInformation';

@Component({
  selector: 'support-and-feedback',
  templateUrl: 'supportandfeedback.html'
})
export class SupportAndFeedbackPage {

  public version;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, 
              private appVersion: AppVersion, private emailComposer: EmailComposer) {
    if (this.platform.is(PlatformConstant.CORDOVA)) {
      this.appVersion.getVersionNumber().then((value) => this.version = value);
    } else {
      this.version = '1.0.0';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad - SupportAndFeedbackPage');
  }

  emailComposerWindow() {
    if (this.platform.is(PlatformConstant.CORDOVA)) {
      this.emailComposer.isAvailable().then(() => {
        this.emailComposer.open({
          to: ContactInformation.contactEmail,
          subject: ContactInformation.subject,
          isHtml: true
        });
      });
    } else {
      window.location.href = `mailto:${ContactInformation.contactEmail}?subject=${ContactInformation.subject}`;
    }    
  }

  helpCenterWindow() {
    this.navCtrl.push(RarereachPage);
  }

  closeWindow() {
    this.navCtrl.pop();
  }

}
