import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, Validators} from '@angular/forms';
import {IonicModule, ModalController, NavController, NavParams} from '@ionic/angular';
import {HeaderPage} from "../header/header.page";
import {DoctorModel} from "../../model/doctor.model";
import {AppointmentModel} from "../../model/appointment.model";
import {CalendarComponent, CalendarMode, NgCalendarModule} from "ionic7-calendar";
import {FooterPage} from "../footer/footer.page";

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.page.html',
  styleUrls: ['./book-appointment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderPage, NgCalendarModule, FooterPage]
})
export class BookAppointmentPage implements OnInit {

  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  calendar = {
    mode: 'month' as CalendarMode
  };
  appointmentAvailable: boolean = false;
  selectedShiftTime: string[];
  selectedDate: string;
  selectedTime: string | undefined;

  doctorProfile: DoctorModel;

  appointmentTimeShifts: string[];
  allAppointments: AppointmentModel[];



  constructor(public navCtrl: NavController,
              public modalController: ModalController) {

  }

  ngOnInit(){

      //this.doctorProfile = this.navParams.data;
     // this.getAllFutureAppointmentsForDoctor(this.doctorProfile.doctorId)


    // else navigate back w error saying we could not find doctor...
  }

  onDateSelected(date) {
    this.getAvailableTimes(date);
    /** Check here if appointment is available or not **/
    this.appointmentAvailable = true;
    this.selectedDate = date;

  }

  getAvailableTimes(date: any){

    this.allAppointments.map(
      appointment => {if(appointment.appointmentDate === date.toString()){
        this.selectedShiftTime = this.appointmentTimeShifts
          .filter(availableAppointmentTime => availableAppointmentTime !== appointment.appointmentTime);
      }

      }
    )

  }

  getAllFutureAppointmentsForDoctor(doctorId: string): AppointmentModel[]{
    // api call to get all future doctor appointment
   return this.allAppointments = [
      {doctorId: "1", appointmentDate: "Evening", appointmentTime: "6.00 PM "},
      {doctorId: "1", appointmentDate: "Night", appointmentTime: "9.00 PM "}
    ];

  }


  shiftSelected($event: any) {
    let shift = this.appointmentTimeShifts.find((value => {
      return value == $event.value
    }));

    //this.selectedShiftTime = shift;
  }

  // timeOnClick(time: string) {
  //   this.selectedTime = time;
  //   this.openConfirmatModal(this.selectedDate, this.selectedTime);
  // }

  // private openConfirmatModal(selectedDate: string, selectedTime: string) {
  //
  //
  //   let appointment: AppointmentInterface = {
  //     doctorProfile: this.doctorProfile, appointment_time: selectedTime,
  //     appointment_date: this.selectedDate, appointment_type: AppointmentType.VIDEO_CONSULTATION
  //   };
  //
  //   let confirmModal = this.modalController.create(PageBookAppointmentConfirmation, {
  //     date: selectedDate,
  //     time: selectedTime
  //   });
  //   confirmModal.present();
  //
  //
  //   confirmModal.onDidDismiss((data) => {
  //     if (data.confirm) {
  //       this.navCtrl.push(PageBookAppointmentConfirmationDetails, appointment);
  //     }
  //   });
  // }

}
