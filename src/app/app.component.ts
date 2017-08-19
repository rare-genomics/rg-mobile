import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen, CallNumber } from 'ionic-native';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { MedhomePage } from '../pages/medhome/medhome';
import { CaregiverPage } from '../pages/caregiver/caregiver';
// import { PreferencesPage } from '../pages/preferences/preferences';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { RaresharePage } from '../pages/rareshare/rareshare';
import { RarereachPage } from '../pages/rarereach/rarereach';
import { ContactRGIPage } from '../pages/contact-rgi/contact-rgi';
import { TermsandconditionsPage } from '../pages/termsandconditions/termsandconditions';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild('mycontent') nav: NavController
  rootPage = HomePage;

  pages: Array<{ title: string, component: any }>;

  rgiMenuItems: Array<{ title: string, component: any }>;

  settingsMenuItems: Array<{ title: string, component: any }>;

  constructor(platform: Platform, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.pages = [
      { title: 'My Profile', component: ProfileViewPage },
      { title: 'Rareshare', component: RaresharePage },
      { title: 'Get a Diagnosis - RareREACH', component: RarereachPage }
    ];

    this.rgiMenuItems = [
      { title: 'Who we are?', component: RarereachPage },
      { title: 'Rare Genomics FAQs', component: RarereachPage },
      { title: 'Get RGI\'s Newsletter', component: RarereachPage },
      { title: 'Contact Us.', component: ContactRGIPage }
    ];

    this.settingsMenuItems = [
      { title: 'Terms and Conditions', component: TermsandconditionsPage },
      { title: 'Privacy Policy', component: RarereachPage },
      { title: 'My Settings', component: RarereachPage },
      { title: 'Support & Feedback', component: RarereachPage }
    ];  

  }

  gotoMedicationHome() {
    this.nav.setRoot(MedhomePage);
  }
  gotoCaregiver() {
    this.nav.setRoot(CaregiverPage);
  }
  
  callEmergency() {
    CallNumber.callNumber("911", true).then(() => console.log('Launched dialer!')).catch(() => console.log('Error launching dialer'));
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
  signOut() {
    let alert = this.alertCtrl.create({
      message: 'You have now been signed out of the app.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.nav.setRoot(HomePage);
        }
      }
    ]
    });
    alert.present();
  }
}
