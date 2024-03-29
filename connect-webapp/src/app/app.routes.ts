import {RouterModule, Routes} from '@angular/router';
import {LoginPage} from "./components/login/login.page";
import {SignupClient} from "./components/signup-client/signup-client.page";
import {HomePage} from "./components/home/home.page";

import {NgModule} from "@angular/core";
import { IonicStorageModule } from '@ionic/storage-angular';
import {BioPage} from "./components/bio/bio.page";
import {DoctorBioPage} from "./components/doctor-bio/doctor-bio.page";
import {UserAuthGuard} from "./services/guard/user-auth.guard";
import {BookAppointmentPage} from "./components/book-appointment/book-appointment.page";
import {NgCalendarModule} from "ionic7-calendar";
import {DatePipe} from "@angular/common";
import {StaffSignupClient} from "./components/staff-signup-client/staff-signup-client.page";
import {ManageAppointmentPage} from "./components/manage-appointment/manage-appointment.page";
import {NoAuthGuard} from "./services/guard/no-auth-guard";
import {ManageApptStaffPage} from "./components/staff-appt/staff-appt.page";
import {StaffAuthGuard} from "./services/guard/staff-auth.guard";
import {ServicesPagePage} from "./components/services-page/services-page.page";
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginPage, canActivate: [NoAuthGuard]},
  // Add more routes for other pages
  { path: 'signup', component: SignupClient, canActivate: [NoAuthGuard] },
  { path: 'signup-staff', component: StaffSignupClient, canActivate: [NoAuthGuard] },

  { path: 'book', component: BookAppointmentPage, canActivate: [UserAuthGuard] },
  {
    path: 'bio', component: BioPage, canActivate: [UserAuthGuard]
  },
  {
    path: 'doctor-bio', component: DoctorBioPage, canActivate: [StaffAuthGuard]
  },
  {
    path: 'home', component: HomePage
  },
  {
    path: 'services', component: ServicesPagePage
  },

  {
    path: 'manage-appointments', component: ManageAppointmentPage, canActivate: [UserAuthGuard]
  },
  {
    path: 'staff-appointments', component: ManageApptStaffPage, canActivate: [StaffAuthGuard]
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes),  IonicStorageModule.forRoot(), NgCalendarModule, DatePipe],
  exports: [RouterModule, IonicStorageModule, NgCalendarModule, DatePipe],
})

export class AppRoutes {}
