import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, CallNumber } from 'ionic-native';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { MedhomePage } from '../pages/medhome/medhome';
import { CaregiverPage } from '../pages/caregiver/caregiver';
import { PreferencesPage } from '../pages/preferences/preferences';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { RaresharePage } from '../pages/rareshare/rareshare';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild('mycontent') nav: NavController
  rootPage = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.pages = [
      { title: 'My Preferences', component: PreferencesPage },
      { title: 'Get a Diagnosis', component: CaregiverPage },
      { title: 'What is Rare Genomics', component: CaregiverPage },
      { title: '--Our Mission', component: CaregiverPage },
      { title: '-- Who We Are', component: CaregiverPage },
      { title: '-- Rare Disease Facts', component: CaregiverPage },
      { title: '-- Contact Us', component: CaregiverPage },
      { title: 'Patient Resources', component: CaregiverPage },
      { title: '-- RareReach', component: CaregiverPage },
      { title: '-- FAQ', component: CaregiverPage },
      { title: 'Rare Genomics Institute News', component: CaregiverPage }
    ];
  }

  gotoMedicationHome() {
    this.nav.setRoot(MedhomePage);
  }
  gotoCaregiver() {
    this.nav.setRoot(CaregiverPage);
  }
  gotoProfile() {
    this.nav.setRoot(ProfileViewPage);
  }
  gotoRareshare() {
    this.nav.setRoot(RaresharePage);
  }
  gotoHome() {
    this.nav.setRoot(HomePage);
  }
  callEmergency() {
    CallNumber.callNumber("911", true).then(() => console.log('Launched dialer!')).catch(() => console.log('Error launching dialer'));
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
