import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private router: Router) {}

  routeToSignup(){
    this.router.navigate(["/signup-client"]);

  }

  routeToLogin(){
    this.router.navigate(["/login"])

  }



}
