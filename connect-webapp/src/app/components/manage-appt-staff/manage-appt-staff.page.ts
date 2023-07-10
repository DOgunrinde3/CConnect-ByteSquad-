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
import {ActivatedRoute, Router} from "@angular/router";
import {AppointmentStatusEnum} from "../../model/appointment-status.enum";
import * as moment from 'moment';
import {AppointmentTypeEnum} from "../../model/appointment-type.enum";
@Component({
  selector: 'app-manage-appt-staff',
  templateUrl: './manage-appt-staff.page.html',
  styleUrls: ['./manage-appt-staff.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterPage, HeaderPage, NgCalendarModule]
})
export class ManageApptStaffPage implements OnInit {

  date: string;
  noAppointments = false;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(Date.now() + ( 3600 * 1000 * 24))
    ,

  };
  selectedDate: string | null;
  formattedDate: any;
  subscriptionComplete = false;
  viewTitle: string;
  selectedTime: string | undefined;
  appointment: AppointmentModel;
  filteredDoctorAppointment: AppointmentModel[];
  selectedService: string | null;
  doctors: DoctorModel[];
  selectedDoctor: DoctorModel | null;
  doctorAppointments: AppointmentModel[] = [];
  appointmentTypes = Object.values(AppointmentTypeEnum);

  // @ts-ignore
  @ViewChild(CalendarComponent) myCal: CalendarComponent; eventSource;


  constructor(public navCtrl: NavController,
              public modalController: ModalController,
              private datePipe: DatePipe,
              private appointmentService: AppointmentService,
              private userService: UserInformationService,
              private router: Router,
              private route: ActivatedRoute

  ) {

  }

  ngOnInit(){
    if(this.route.snapshot.paramMap.get('date') === null ){
      return;
    }
    else{
      this.calendar.currentDate =  new Date (Date.parse(this.route.snapshot.paramMap.get('date') || '{}'));
    }
  }

  ionViewWillEnter(){
    this.userService.userInformation$.subscribe(user => {
      this.selectedDoctor = user;
      this.getDoctorAppointments(user?.userId);
    })

  }


  delete(appointmentId){
    this.appointmentService.delete(appointmentId);
    window.location.reload();

  }


  onDateSelected(date) {
    this.selectedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.formattedDate = this.datePipe.transform(this.selectedDate, 'mediumDate');
    this.filteredDoctorAppointment = this.doctorAppointments?.filter( appointment => appointment.appointmentDate === this.selectedDate);

    if (this.filteredDoctorAppointment?.length !== 0){
      this.noAppointments = true;
    }
    else{
      this.noAppointments = false;

    }

  }

  getColour(appointment: AppointmentModel){
    if (appointment.appointmentStatus === AppointmentStatusEnum.PENDING){
      return '#ffc409';

    }

    else if (appointment.appointmentStatus === AppointmentStatusEnum.CANCELLED){
      return '#eb445a';

    }

    else if (appointment.appointmentStatus === AppointmentStatusEnum.CONFIRMED){
      return '#2dd36f';
    }

    return '#000000';

  }

  getDoctorAppointments(userId: string){
    this.appointmentService.getAppointmentsByDoctor(userId)
      .subscribe( (doctorAppointments)=>
        {
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
          this.onDateSelected(this.calendar.currentDate);
          this.subscriptionComplete = true;

        }
      )

  }

  filterSelect() {
    this.appointmentTypes = this.selectedDoctor === null ? Object.values(AppointmentTypeEnum) : this.selectedDoctor.services;
    if (this.selectedDoctor !== null) {
      this.subscriptionComplete = false;
      this.appointmentService.getAppointmentsByDoctor(this.selectedDoctor.userId)
        .subscribe((doctorAppointments) => {
            this.doctorAppointments = doctorAppointments;
            this.eventSource = [];
            doctorAppointments.forEach((appointment) => {
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



  markDisabled = (date: Date) => {
    var current = new Date();
    return date < current;
  };
}
