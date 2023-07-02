import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, ModalController, NavParams, } from '@ionic/angular';


@Component({
  selector: 'app-confirm-appointment',
  templateUrl: './confirm-appointment.page.html',
  styleUrls: ['./confirm-appointment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConfirmAppointmentPage {

  options: any;
  pageReady: boolean = false;

  constructor(public navParams: NavParams, public viewController: ModalController) {
    if (navParams.data) {
      this.options = navParams.data;
      this.pageReady = true;
    }
  }


  confirmOnClick() {
    this.viewController.dismiss({confirm: true});
  }

  cancelOnClick() {
    this.viewController.dismiss({confirm: false});
  }

}
