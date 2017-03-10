import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { MedhomePage } from '../pages/medhome/medhome';
import { CaregiverPage } from '../pages/caregiver/caregiver';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage = HomePage;
  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  gotoMedicationHome(){
    this.nav.push(MedhomePage);
  }
  gotoCaregiver(){
    this.nav.push(CaregiverPage);
  }
}
