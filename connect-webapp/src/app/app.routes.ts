import {RouterModule, Routes} from '@angular/router';
import {LoginPage} from "./components/login/login.page";
import {SignupClient} from "./components/signup-client/signup-client.page";
import {Tab3Page} from "./components/tab3/tab3.page";
import {HomePage} from "./components/home/home.page";

import {NgModule} from "@angular/core";
import { IonicStorageModule } from '@ionic/storage-angular';
import {BioPage} from "./components/bio/bio.page";
import {loggedInGuard, notLoggedInGuard} from "./services/auth.guard";
import {BookAppointmentPage} from "./components/book-appointment/book-appointment.page";
import {NgCalendarModule} from "ionic7-calendar";
import {DatePipe} from "@angular/common";
import {StaffSignupClient} from "./components/staff-signup-client/staff-signup-client.page";
export const routes: Routes = [
  { path: '', redirectTo: '/signup-client', pathMatch: 'full' },
  { path: 'login', component: LoginPage, canActivate: [loggedInGuard]},
  // Add more routes for other pages
  { path: 'signup-client', component: SignupClient, canActivate: [loggedInGuard] },
  { path: 'staff-signup', component: StaffSignupClient, canActivate: [loggedInGuard] },

  { path: 'book', component: BookAppointmentPage, canActivate: [notLoggedInGuard] },
  {
    path: 'bio', component: BioPage, canActivate: [notLoggedInGuard]
  },
  {
    path: 'home', component: HomePage
  },
  {
    path: 'confirm-appointment',
    loadComponent: () => import('./components/confirm-appointment/confirm-appointment.page').then( m => m.ConfirmAppointmentPage)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./components/notifications/notifications.page').then( m => m.NotificationsPage)
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes),  IonicStorageModule.forRoot(), NgCalendarModule, DatePipe],
  exports: [RouterModule, IonicStorageModule, NgCalendarModule, DatePipe],
})

export class AppRoutes {}
