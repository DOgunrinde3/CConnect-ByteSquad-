import { Component, OnInit } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, ModalController, NavParams, ToastController,} from '@ionic/angular';
import {AppointmentTypeEnum} from "../../model/appointment-type.enum";
import {AppointmentService} from "../../services/appointment.service";
import {DoctorModel} from "../../model/doctor.model";
import {AppointmentModel} from "../../model/appointment.model";
import {Router} from "@angular/router";
import {StaffService} from "../../services/staff.service";
import {AppointmentStatusEnum} from "../../model/appointment-status.enum";


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
  formattedDate: any;
  selectedDate: any;
  selectedTime: any;
  selectedDateValue: Date;
  selectedService = null;
  selectedDoctor: DoctorModel;
  doctors: DoctorModel[];
  appointmentTypes = Object.values(AppointmentTypeEnum);


  constructor(public navParams: NavParams,
              public viewController: ModalController,
              private appointmentService: AppointmentService,
              private datePipe: DatePipe,
              private staffService: StaffService,
              private router: Router,
              private toastController: ToastController) {
    if (navParams.data) {
      this.options = navParams.data;
       this.formattedDate = this.datePipe.transform(this.options.appointment.appointmentDate, 'mediumDate');
       this.selectedDate = this.options.appointment.appointmentDate;
       this.selectedTime = this.options.appointment.appointmentTime;
       this.selectedDateValue = this.options.selectedDateValue;
       this.staffService.getAllStaff().subscribe((value)=> {this.doctors = value});
      this.pageReady = true;
    }
  }


  confirmOnClick() {

    if(this.selectedService === null){
       this.presentToast("top", "Please select a service", 'danger', 'close-outline');

    }

    else {


      let bookAppointment: AppointmentModel = {
        id: null,
        doctor: this.selectedDoctor?.firstName + " " + this.selectedDoctor?.lastName,
        patientId: this.options.appointment.patientId,
        appointmentDate: this.selectedDate,
        appointmentTime: this.selectedTime,
        appointmentType: this.selectedService,
        appointmentStatus: AppointmentStatusEnum.PENDING
      }



      this.appointmentService.bookAppointment(bookAppointment).subscribe(
        () => {
          this.presentToast("top", 'Appointment Created', 'success', "checkmark-outline");
          this.router.navigate(['/manage-appointments', {date: this.selectedDateValue}]);
        },
        error => {
          this.presentToast("top", error.message, 'danger', 'close-outline');
          // Handle errors if necessary
        }
      )
      this.viewController.dismiss({confirm: true});
    }

  }

  cancelOnClick() {
    this.presentToast("top", "Cancelled", 'danger', 'close-outline');
    this.viewController.dismiss({confirm: false});
  }

  filterSelect(){
    this.appointmentTypes = this.selectedDoctor === null ? Object.values(AppointmentTypeEnum) : this.selectedDoctor.services;
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
