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
import { LoginPage } from '../pages/login/login';
import { MedicationPopupAlarmPage } from '../pages/medication-popup-alarm/medication-popup-alarm';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { AddConditionPage } from '../pages/add-condition/add-condition';
import { RaresharePage } from '../pages/rareshare/rareshare';
import { RarereachPage } from '../pages/rarereach/rarereach';
import { PatientPagePage } from '../pages/curatedtool/patient/patient';
import { UsertypePagePage } from '../pages/usertype/usertype';

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
    LoginPage,
    MedicationPopupAlarmPage,
    ProfileViewPage,
    AddConditionPage,
    RaresharePage,
    RarereachPage,
    PatientPagePage,
    UsertypePagePage
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
    LoginPage,
    MedicationPopupAlarmPage,
    ProfileViewPage,
    AddConditionPage,
    RaresharePage,
    RarereachPage,
    PatientPagePage,
    UsertypePagePage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    // initDatabase
  ]
})
export class AppModule { }