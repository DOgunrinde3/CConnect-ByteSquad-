import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {FormsModule, Validators} from '@angular/forms';
import {AlertController, IonicModule, ModalController, NavController, NavParams} from '@ionic/angular';
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
import {StaffService} from "../../services/staff.service";
import {NotificationModel} from "../../model/notification.model";
import {NotificationService} from "../../services/notification.service";
@Component({
  selector: 'app-staff-appt',
  templateUrl: './staff-appt.page.html',
  styleUrls: ['./staff-appt.page.scss'],
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
  currentDoctor: DoctorModel;
  subscriptionComplete = false;
  viewTitle: string;
  selectedAppointment: AppointmentModel;
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
              private alertController:AlertController,
              private staffService: StaffService,
              private route: ActivatedRoute,
              private notificationService: NotificationService

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
      this.currentDoctor = user;
      this.getDoctorAppointments(user?.userId);
      this.staffService.getAllStaff().subscribe((value)=> {
        this.doctors = value;
        value.forEach( doctor => {if(doctor.userId === this.currentDoctor.userId){
          this.selectedDoctor = doctor;
        }} )

      });

    })

  }


  update(appointment: AppointmentModel, status: AppointmentStatusEnum){
    this.selectedAppointment = appointment;
    appointment.appointmentStatus = status;
    this.appointmentService.update(appointment).subscribe((appointment) =>{
      this.selectedAppointment.appointmentStatus = appointment.appointmentStatus;
    });

    let notificationModel: NotificationModel = {
      id:null,
      appointment: appointment,
      notifiedFromId: this.currentDoctor.userId,
      notifiedUserId: appointment.patient,
    }

    this.notificationService.updateNotification(notificationModel, false).subscribe( );

  }


  async showConfirmationModal(appointment, status) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to proceed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.update(appointment, status);
            alert.dismiss();
            // Place your logic here for the confirmed action
          }
        }
      ]
    });

    await alert.present();
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
    console.log(this.selectedDoctor);
    this.appointmentTypes = this.selectedDoctor === null ? Object.values(AppointmentTypeEnum) : this.selectedDoctor.services;
    if (this.selectedDoctor !== null) {
      this.subscriptionComplete = false;
      this.getDoctorAppointments(this.selectedDoctor.userId);
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

  getColour(status:AppointmentStatusEnum){

    if(status === AppointmentStatusEnum.PENDING){
      return "warning";
    }
    else if(status === AppointmentStatusEnum.CONFIRMED){
      return "success";
    }
    else if(status === AppointmentStatusEnum.CANCELLED){
      return "danger";
    }


    return "primary";
  }



  markDisabled = (date: Date) => {
    var current = new Date();
    return date < current;
  };
  protected readonly AppointmentStatusEnum = AppointmentStatusEnum;
}
