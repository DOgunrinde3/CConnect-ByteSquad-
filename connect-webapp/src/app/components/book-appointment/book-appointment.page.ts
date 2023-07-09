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
import {AppointmentStatusEnum} from "../../model/appointment-status.enum";
import {StaffService} from "../../services/staff.service";
import {AppointmentTypeEnum} from "../../model/appointment-type.enum";
import * as moment from "moment/moment";

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.page.html',
  styleUrls: ['./book-appointment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderPage, NgCalendarModule, FooterPage, DatePipe]
})
export class BookAppointmentPage implements OnInit {

  date: string;
  subscriptionComplete = true;

  selectedDateValue : Date;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(Date.now() + ( 3600 * 1000 * 24))
    ,

  };
  appointmentAvailable: boolean = true;
  selectedDate: string | null;
  selectedService: string | null;
  viewTitle: string;
  selectedTime: string | undefined;
  user: UserModel;
  doctors: DoctorModel[];
  unAvailableTimeShifts: string[] = [];
  appointmentTimeShifts: string[];
  selectedDoctor: DoctorModel | null;
  doctorAppointments: AppointmentModel[] = [];
  appointment: AppointmentModel;
  appointmentTypes = Object.values(AppointmentTypeEnum);

  @ViewChild(CalendarComponent) myCal: CalendarComponent; eventSource;


  constructor(public navCtrl: NavController,
              public modalController: ModalController,
              private datePipe: DatePipe,
              private appointmentService: AppointmentService,
              private userService: UserInformationService,
              private staffService: StaffService,
              private router: Router
              ) {

  }

  ngOnInit(){

    this.userService.userInformation$.subscribe(user => {
      this.user = user;
    })
    this.appointmentTimeShifts = this.appointmentService.getAllAppointmentHours()

    this.staffService.getAllStaff().subscribe((value)=> {this.doctors = value});

      //this.doctorProfile = this.navParams.data;
     // this.getAllFutureAppointmentsForDoctor(this.doctorProfile.doctorId)


    // else navigate back w error saying we could not find doctor...
  }

  ionViewWillEnter(){
    this.selectedDoctor = null;
  }

  onDateSelected(date) {
    this.resetAvailableTime();
    this.selectedDateValue = date;
    this.selectedDate = this.datePipe.transform(date, 'yyyy-MM-dd');

    this.selectedDoctor !== null ? this.filterUnavailableTimes() : this.resetAvailableTime()
    //this.getAvailableTimes(date);
    /** Check here if appointment is available or not **/
    if(this.unAvailableTimeShifts.length === 0) {
      this.appointmentAvailable = false;
      this.subscriptionComplete = true;
    }

    else{
      this.appointmentAvailable = true;
      this.subscriptionComplete = true;
    }
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
      id: null,
      doctor: null,
      patientId: this.user.userId,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      appointmentType: "",
      appointmentStatus: AppointmentStatusEnum.PENDING
    };
     this.openModal(this.appointment)

    // confirmModal.onDidDismiss((data) => {
    //   if (data.confirm) {
    //     this.navCtrl.push(PageBookAppointmentConfirmationDetails, appointment);
    //   }
    // });
  }

  isAvailable(time: string){

    return this.unAvailableTimeShifts.includes(time);
  }


  filterUnavailableTimes(){
    this.doctorAppointments
      .filter(docAppoint => docAppoint.appointmentDate === this.selectedDate)
      .map( docAppoint => this.unAvailableTimeShifts = this.unAvailableTimeShifts.filter(time => time !== docAppoint.appointmentTime));
    console.log(this.appointmentTimeShifts);
    console.log(this.unAvailableTimeShifts);
  }

  resetAvailableTime(){
    this.unAvailableTimeShifts = this.appointmentTimeShifts;
}


  async openModal(appointment) {


    const modal = await this.modalController.create({
      component: ConfirmAppointmentPage,
      componentProps: {
       appointment: appointment,
        selectedDateValue: this.selectedDateValue,
        selectedDoctor: this.selectedDoctor,
        selectedService: this.selectedService,
        doctors: this.doctors
      },
      mode: "ios"
    });
    modal.present();



  }
  markDisabled = (date: Date) => {
    var current = new Date();
    return date < current;
  };


  filterSelect(){
    this.appointmentTypes = this.selectedDoctor === null ? Object.values(AppointmentTypeEnum) : this.selectedDoctor.services;
    if(this.selectedDoctor !== null){
      this.subscriptionComplete = false;
      this.appointmentService.getAppointmentsByDoctor(this.selectedDoctor.doctorId)
        .subscribe((doctorAppointments) => {
            this.doctorAppointments = doctorAppointments;
          this.eventSource = [];
          doctorAppointments.forEach((appointment)=>{
            const date = moment(appointment.appointmentDate, 'YYYY-MM-DD').toDate();
            this.eventSource?.push({
              title: appointment.appointmentType,
              startTime: date,
              endTime: date,
              allDay: false
            });
          })
            this.onDateSelected(this.selectedDate);

          }
        )
    }

    else{
      this.onDateSelected(this.selectedDate);
      this.eventSource = {}
    }

  }

}
