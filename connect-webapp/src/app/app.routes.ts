import { Routes } from '@angular/router';
import {Tab1Page} from "./components/tab1/tab1.page";
import {Tab2Page} from "./components/tab2/tab2.page";
import {CreateCompanyPage} from "./components/create-company/create-company.page";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Tab1Page },
  // Add more routes for other pages
  { path: 'home', component: Tab2Page },
  {
    path: 'create-company', component: CreateCompanyPage
  },
];
