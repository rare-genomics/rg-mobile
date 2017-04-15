import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TermsandconditionsPage } from '../pages/termsandconditions/termsandconditions';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { EmailAddressPage } from '../pages/email-address/email-address';
import { CreatePasswordPage } from '../pages/create-password/create-password';
import { EnterBirthdayPage } from '../pages/enter-birthday/enter-birthday';
import { NotificationsPromptPage } from '../pages/notifications-prompt/notifications-prompt';

import { MedhomePage } from '../pages/medhome/medhome';
import { MeddetailsPage } from '../pages/meddetails/meddetails';
import { CaregiverPage } from '../pages/caregiver/caregiver';
import { CaregiverDetailsPage } from '../pages/caregiver-details/caregiver-details';
import { SendSMSPage } from '../pages/send-sms/send-sms';
import { ContactRGIPage } from '../pages/contact-rgi/contact-rgi';
import { PatientHomePage } from '../pages/patient-home/patient-home';
import { PatientProfilePage } from '../pages/patient-profile/patient-profile';
import { PreferencesPage } from '../pages/preferences/preferences';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { SettingsPage } from '../pages/settings/settings';
import { Market } from '@ionic-native/market';
import { EmailComposer } from '@ionic-native/email-composer';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TermsandconditionsPage,
    CreateAccountPage,
    EmailAddressPage,
    CreatePasswordPage,
    EnterBirthdayPage,
    NotificationsPromptPage,
    MedhomePage,
    MeddetailsPage,
    CaregiverPage,
    CaregiverDetailsPage,
    SendSMSPage,
    ContactRGIPage,
    PatientHomePage,
    PatientProfilePage,
    PreferencesPage,
    ProfileViewPage,
    ContactUsPage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TermsandconditionsPage,
    CreateAccountPage,
    EmailAddressPage,
    CreatePasswordPage,
    EnterBirthdayPage,
    NotificationsPromptPage,
    MedhomePage,
    MeddetailsPage,
    CaregiverPage,
    CaregiverDetailsPage,
    SendSMSPage,
    ContactRGIPage,
    PatientHomePage,
    PatientProfilePage,
    PreferencesPage,
    ProfileViewPage,
    ContactUsPage,
    SettingsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    Market,
    EmailComposer
    // initDatabase
  ]
})
export class AppModule { }