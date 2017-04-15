import { Platform } from 'ionic-angular';
// import { StatusBar, Splashscreen, CallNumber } from 'ionic-native';
// import { Splashscreen, CallNumber } from 'ionic-native';;
import { StatusBar } from 'ionic-native';
import { Splashscreen, CallNumber } from 'ionic-native';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { MedhomePage } from '../pages/medhome/medhome';
import { CaregiverPage } from '../pages/caregiver/caregiver';
import { PreferencesPage } from '../pages/preferences/preferences';
import { PatientProfilePage } from '../pages/patient-profile/patient-profile';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild('mycontent') nav: NavController
  rootPage = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

      this.pages = [
        { title : 'My Preferences', component: PreferencesPage },
        { title : 'Get a Diagnosis', component: CaregiverPage },
        { title : 'What is Rare Genomics', component: CaregiverPage },
        { title : '-- Our Mission', component: CaregiverPage },
        { title : '-- Who We Are', component: CaregiverPage },
        { title : '-- Rare Disease Facts', component: CaregiverPage },
        { title : '-- Contact Us', component: CaregiverPage },
        { title : 'Patient Resources', component: CaregiverPage },
        { title : '-- RareReach', component: CaregiverPage },
        { title : '-- FAQ', component: CaregiverPage },
        { title : 'Rare Genomics Institute News', component: CaregiverPage }
      ];
  }

  gotoMedicationHome() {
    this.nav.push(MedhomePage);
  }
  gotoCaregiver() {
    this.nav.push(CaregiverPage);
  }
  gotoProfile() {
    this.nav.push(PatientProfilePage);
  }
  callEmergency() {
    CallNumber.callNumber("911", true).then(() => console.log('Launched dialer!')).catch(() => console.log('Error launching dialer'));
  }
  openPage(page) {
    // this.rootPage = page.component;
    this.nav.push(page.component);
  }
}
