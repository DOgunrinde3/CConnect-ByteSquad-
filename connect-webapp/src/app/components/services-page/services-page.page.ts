import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {FooterPage} from "../footer/footer.page";
import {HeaderPage} from "../header/header.page";
import {Router} from "@angular/router";

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

  showContent1: boolean = false;
  showContent2: boolean = false;
  showContent3: boolean = false;
  showContent4: boolean = false;


  viewContent1() {

    this.showContent1 = !this.showContent1;
  }
  hideContent1() {
    this.showContent1 = !this.showContent1;
  }

  viewContent2() {
    this.showContent2 = !this.showContent2;
  }
  hideContent2() {
    this.showContent2 = !this.showContent2;
  }
  viewContent3() {
    this.showContent3 = !this.showContent3;
  }
  hideContent3() {
    this.showContent3 = !this.showContent3;
  }
  viewContent4() {
    this.showContent4 = !this.showContent4;
  }
  hideContent4() {
    this.showContent4 = !this.showContent4;
  }
}
