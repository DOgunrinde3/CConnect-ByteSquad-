import {RouterModule, Routes} from '@angular/router';
import {LoginPage} from "./components/login/login.page";
import {SignupClient} from "./components/signup-client/signup-client.page";
import {Tab3Page} from "./components/tab3/tab3.page";
import {NgModule} from "@angular/core";
import {BioPage} from "./components/bio/bio.page";
export const routes: Routes = [
  { path: '', redirectTo: '/signup-client', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  // Add more routes for other pages
  { path: 'signup-client', component: SignupClient },
  { path: 'book', component: Tab3Page },
  {
    path: 'bio', component: BioPage
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutes {}
