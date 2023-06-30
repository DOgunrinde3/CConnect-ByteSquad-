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
export const routes: Routes = [
  { path: '', redirectTo: '/signup-client', pathMatch: 'full' },
  { path: 'login', component: LoginPage, canActivate: [loggedInGuard]},
  // Add more routes for other pages
  { path: 'signup-client', component: SignupClient, canActivate: [loggedInGuard] },
  { path: 'book', component: BookAppointmentPage, canActivate: [notLoggedInGuard] },
  {
    path: 'bio', component: BioPage, canActivate: [notLoggedInGuard]
  },
  {
    path: 'home', component: HomePage
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes),  IonicStorageModule.forRoot(), NgCalendarModule],
  exports: [RouterModule, IonicStorageModule, NgCalendarModule],
})

export class AppRoutes {}
