import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {FormsModule, Validators} from '@angular/forms';
import {IonicModule, ModalController, NavController, NavParams} from '@ionic/angular';
import {HeaderPage} from "../header/header.page";
import {DoctorModel} from "../../model/doctor.model";
import {AppointmentModel} from "../../model/appointment.model";
import {CalendarComponent, CalendarMode, NgCalendarModule} from "ionic7-calendar";
import {FooterPage} from "../footer/footer.page";
import {AppointmentService} from "../../services/appointment.service";
import {UserInformationService} from "../../services/user-information.service";
import {UserModel} from "../../model/User.model";
import {ConfirmAppointmentPage} from "../confirm-appointment/confirm-appointment.page";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.page.html',
  styleUrls: ['./book-appointment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderPage, NgCalendarModule, FooterPage, DatePipe]
})
export class BookAppointmentPage implements OnInit {

  date: string;
  showTime = false;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(Date.now() + ( 3600 * 1000 * 24))
    ,

  };
  appointmentAvailable: boolean = false;
  selectedDate: string | null;
  viewTitle: string;
  selectedTime: string | undefined;
  user: UserModel;
  appointmentTimeShifts: string[];
appointment: AppointmentModel;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;


  constructor(public navCtrl: NavController,
              public modalController: ModalController,
              private datePipe: DatePipe,
              private appointmentService: AppointmentService,
              private userService: UserInformationService,
              private router: Router
              ) {

  }

  ngOnInit(){

    this.userService.userInformation$.subscribe(user => {
      this.user = user;
    })
    this.appointmentTimeShifts = this.appointmentService.getAllAppointmentHours()

      //this.doctorProfile = this.navParams.data;
     // this.getAllFutureAppointmentsForDoctor(this.doctorProfile.doctorId)


    // else navigate back w error saying we could not find doctor...
  }

  onDateSelected(date) {
    this.showTime = true;
    this.selectedDate = this.datePipe.transform(date, 'yyyy-MM-dd');

    //this.getAvailableTimes(date);
    /** Check here if appointment is available or not **/
    this.appointmentAvailable = true;

  }




  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  timeOnClick(time: string) {
    this.selectedTime = time;

    if (this.selectedDate){
    this.openConfirmatModal(this.selectedDate, this.selectedTime);
  }
  }

  private openConfirmatModal(selectedDate: string, selectedTime: string) {


    this.appointment = {
      doctorId: null,
      patientId: this.user.userId,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      appointmentType: null
    };
     this.openModal(this.appointment)

    // confirmModal.onDidDismiss((data) => {
    //   if (data.confirm) {
    //     this.navCtrl.push(PageBookAppointmentConfirmationDetails, appointment);
    //   }
    // });
  }

  async openModal(appointment) {


    const modal = await this.modalController.create({
      component: ConfirmAppointmentPage,
      componentProps: {
       appointment: appointment
      },
      mode: "ios"
    });
    modal.present();



  }
  markDisabled = (date: Date) => {
    var current = new Date();
    return date < current;
  };
}
