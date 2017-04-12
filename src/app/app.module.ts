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
<<<<<<< HEAD
import { ContactRGIPage } from '../pages/contact-rgi/contact-rgi';


=======
import { PatientHomePage } from '../pages/patient-home/patirment-home';
import { PatientProfilePage } from '../pages/patient-profile/patient-profile';
import { PreferencesPage } from '../pages/preferences/preferences';
>>>>>>> cbbf03e5cdf9d21772cfd3dbf4a6ec6c71f3c26f

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
<<<<<<< HEAD
    ContactRGIPage
=======
    PatientHomePage,
    PatientProfilePage,
    PreferencesPage
>>>>>>> cbbf03e5cdf9d21772cfd3dbf4a6ec6c71f3c26f
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
<<<<<<< HEAD
    ContactRGIPage
=======
    PatientHomePage,
    PatientProfilePage,
    PreferencesPage
>>>>>>> cbbf03e5cdf9d21772cfd3dbf4a6ec6c71f3c26f
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    // initDatabase
  ]
})
export class AppModule { }