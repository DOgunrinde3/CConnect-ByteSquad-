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
  user: UserModel;
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
              private userInfoService: UserInformationService,
              private toastController: ToastController,
              private notificationService: NotificationService) {
    this.userInfoService.userInformation$.subscribe((user) => {
        this.user = user
      }
    );
    if (navParams.data) {
      this.options = navParams.data;
      this.formattedDate = this.datePipe.transform(this.options.appointment.appointmentDate, 'mediumDate');
      this.selectedDate = this.options.appointment.appointmentDate;
      this.selectedTime = this.options.appointment.appointmentTime;
      this.selectedDoctor = this.options.selectedDoctor;
      this.selectedService = this.options.selectedService;
      this.doctors = this.options.doctors;
      this.selectedDateValue = this.options.selectedDateValue;
      this.pageReady = true;
      this.filterSelect()
    }
  }


  confirmOnClick() {

    if (this.selectedService === null) {
      this.presentToast("top", "Please select a service", 'danger', 'close-outline');

    } else {

      console.log(this.selectedDate);

      let bookAppointment: AppointmentModel = {
        id: null,
        doctor: this.selectedDoctor === null ? null : this.selectedDoctor?.firstName + " " + this.selectedDoctor?.lastName,
        patient: this.user?.firstName + " " + this.user?.lastName,
        appointmentDate: this.selectedDate,
        appointmentTime: this.selectedTime,
        appointmentType: this.selectedService,
        appointmentStatus: AppointmentStatusEnum.PENDING
      }


      this.appointmentService.bookAppointment(bookAppointment).subscribe(
        (value) => {

          let notificationModel: NotificationModel = {
            id: null,
            appointment: value as AppointmentModel,
            notifiedFromId: this.user.userId,
            notifiedUserId: this.selectedDoctor?.userId,
          }

          this.notificationService.createNotification(notificationModel).subscribe();

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

  filterSelect() {
    this.appointmentTypes = this.selectedDoctor === null ? Object.values(AppointmentTypeEnum) : this.selectedDoctor.services;
  }


  async presentToast(position: 'top' | 'middle' | 'bottom', message: any, color: any, icon) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      icon: icon,
      color: color

    });

    await toast.present();
  }

}
