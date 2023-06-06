import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, FormsModule],
})
export class Tab1Page {
  email: string = "";
  password: string = "";


  constructor() {}

  login() {
    // Perform login logic here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // You can send a request to your backend for authentication
    // and handle the response accordingly
  }
}
