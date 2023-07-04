import { Component, OnInit } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, ModalController, NavParams, ToastController} from '@ionic/angular';
import {DoctorModel} from "../../model/doctor.model";
import {AppointmentTypeEnum} from "../../model/appointment-type.enum";
import {AppointmentService} from "../../services/appointment.service";
import {StaffService} from "../../services/staff.service";
import {Router} from "@angular/router";
import {AppointmentModel} from "../../model/appointment.model";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NotificationsPage implements OnInit {




  constructor(public navParams: NavParams,
              public viewController: ModalController,
              private appointmentService: AppointmentService,
              private datePipe: DatePipe,
              private staffService: StaffService,
              private router: Router,
              private toastController: ToastController) {

  }


  ngOnInit() {
  }





  async presentToast(position: 'top' | 'middle' | 'bottom', message: any, color: any, icon) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      icon: icon,
      color:color

    });

    await toast.present();
  }


}
