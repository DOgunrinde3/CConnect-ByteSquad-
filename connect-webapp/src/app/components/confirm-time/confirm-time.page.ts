import {Component} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController, NavParams, ToastController,} from '@ionic/angular';
import {AppointmentTypeEnum} from "../../model/appointment-type.enum";
import {AppointmentService} from "../../services/appointment.service";
import {DoctorModel} from "../../model/doctor.model";
import {AppointmentModel} from "../../model/appointment.model";
import {Router} from "@angular/router";
import {StaffService} from "../../services/staff.service";
import {AppointmentStatusEnum} from "../../model/appointment-status.enum";
import {NotificationService} from "../../services/notification.service";
import {NotificationModel} from "../../model/notification.model";
import {UserInformationService} from "../../services/user-information.service";
import {UserModel} from "../../model/User.model";


@Component({
  selector: 'app-confirm-time',
  templateUrl: './confirm-time.page.html',
  styleUrls: ['./confirm-time.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})


export class ConfirmTimePage{

  options: any;
  pageReady: boolean = false;
  formattedDate: any;
  user: UserModel;
  startDatetime: any;
  endDatetime: any;
  selectedTime: any;
  selectedDateValue: Date;
  selectedService = null;
  selectedDoctor: DoctorModel;
  doctors: DoctorModel[];
  dates: [];
  appointmentTypes = Object.values(AppointmentTypeEnum);
  hourValues = ['09','10','11','12','13','14','15','16','17'];



  constructor(public navParams: NavParams,
              public viewController: ModalController,
              private appointmentService: AppointmentService,
              private datePipe: DatePipe,
              private staffService: StaffService,
              private router: Router,
              private userInfoService: UserInformationService,
              private toastController: ToastController,
              private notificationService: NotificationService) {
    this.userInfoService.userInformation$.subscribe( (user) =>
      {this.user = user}
    );

    if (navParams.data) {
      // this.options = navParams.data;
      // // this.formattedDate = this.datePipe.transform(this.options.appointment.appointmentDate, 'mediumDate');
      // this.selectedDate = this.options.appointment.appointmentDate;
      // this.selectedTime = this.options.appointment.appointmentTime;
      // this.selectedDoctor = this.options.selectedDoctor;
      // this.selectedService = this.options.selectedService;
      // this.doctors =this.options.doctors;
      // this.selectedDateValue = this.options.selectedDateValue;
      // this.pageReady = true;
      // this.filterSelect()
    }
  }




  cancelOnClick() {
    this.presentToast("top", "Cancelled", 'danger', 'close-outline');
    this.viewController.dismiss({confirm: false});
  }

  confirmOnClick(){
    this.appointmentService.createAppointmentFromRange(this.startDatetime, this.endDatetime);
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

  protected readonly Date = Date;
}
