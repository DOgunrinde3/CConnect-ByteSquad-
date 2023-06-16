import { Routes } from '@angular/router';
import {LoginPage} from "./components/login/login.page";
import {SignupClient} from "./components/signup-client/signup-client.page";
import {CreateCompanyPage} from "./components/create-company/create-company.page";
import {RegisterUserPage} from "./components/register-user/register-user.page";
import {Tab3Page} from "./components/tab3/tab3.page";

export const routes: Routes = [
  { path: '', redirectTo: '/signup-client', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  // Add more routes for other pages
  { path: 'signup-client', component: SignupClient },
  {
    path: 'create-company', component: CreateCompanyPage
  },
  {
    path: 'register-user', component: RegisterUserPage
  },
  { path: 'book', component: Tab3Page },

];
