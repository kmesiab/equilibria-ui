import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {OtpComponent} from "./components/otp/otp.component";
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'otp', component: OtpComponent}
];
