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

@Component({
  selector: 'app-book-appointment',
  templateUrl: './manage-appointment.page.html',
  styleUrls: ['./manage-appointment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderPage, NgCalendarModule, FooterPage, DatePipe]
})
export class ManageAppointmentPage implements OnInit {

  date: string;
  noAppointments = false;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(Date.now() + ( 3600 * 1000 * 24))
    ,

  };
  appointmentAvailable: boolean = false;
  selectedDate: string | null;
  formattedDate: any;
  subscriptionComplete = false;
  viewTitle: string;
  selectedTime: string | undefined;
  user: UserModel;
  userAppointments: AppointmentModel[];
  filteredUserAppointments: AppointmentModel[];
  appointmentTimeShifts: string[];
appointment: AppointmentModel;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;


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
    this.appointmentTimeShifts = this.appointmentService.getAllAppointmentHours();
    if(this.route.snapshot.paramMap.get('date') === null ){
      return;
    }
    else{
     this.calendar.currentDate =  new Date (Date.parse(this.route.snapshot.paramMap.get('date') || '{}'));
    }
  }

  ionViewWillEnter(){
    this.userService.userInformation$.subscribe(user => {
      this.user = user;
      this.getUserAppointments(user.userId);
    })

  }


  delete(appointmentId){
    this.appointmentService.delete(appointmentId);
    window.location.reload();

  }

  onDateSelected(date) {
    this.selectedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.formattedDate = this.datePipe.transform(this.selectedDate, 'mediumDate');
    this.filteredUserAppointments = this.userAppointments?.filter( appointment => appointment.appointmentDate === this.selectedDate);

    if (this.filteredUserAppointments?.length !== 0){
      this.noAppointments = true;
    }
    else{
      this.noAppointments = false;

    }

    this.subscriptionComplete = true;


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

  getUserAppointments(userId: string){
    this.appointmentService.getUserAppointments(userId)
      .subscribe( (userAppointments)=>
        {
          this.userAppointments = userAppointments;
          this.onDateSelected(this.calendar.currentDate);
        }
      )

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