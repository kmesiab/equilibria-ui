import { Routes } from '@angular/router';
import {
  LanderRedirectComponent
} from "./components/lander-redirect/lander-redirect.component";
import { LoginComponent } from './components/login/login.component';
import {OtpComponent} from "./components/otp/otp.component";
import { SignupComponent } from './components/signup/signup.component';
import {
  UserProfileComponent
} from "./components/user-profile/user-profile.component";
import { PersonalReportComponent } from './components/personal-report/personal-report.component';
import { TherapistDashboardComponent } from './components/therapist-dashboard/therapist-dashboard.component';

export const routes: Routes = [
  {path: '', component: LanderRedirectComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'otp', component: OtpComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'personal-report', component: PersonalReportComponent},
  {path: 'therapist', component: TherapistDashboardComponent},
];
