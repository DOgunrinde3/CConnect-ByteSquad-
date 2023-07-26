import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {FooterPage} from "../footer/footer.page";
import {HeaderPage} from "../header/header.page";

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.page.html',
  styleUrls: ['./services-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterPage, HeaderPage]
})
export class ServicesPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
