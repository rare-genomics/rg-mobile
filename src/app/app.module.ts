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
import { PatientHomePage } from '../pages/patient-home/patirment-home';
import { PatientProfilePage } from '../pages/patient-profile/patient-profile';
import { PreferencesPage } from '../pages/preferences/preferences';

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
    PatientHomePage,
    PatientProfilePage,
    PreferencesPage
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
    PatientHomePage,
    PatientProfilePage,
    PreferencesPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    // initDatabase
  ]
})
export class AppModule { }