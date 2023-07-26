import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController, NavParams, ToastController,} from '@ionic/angular';
import {AppointmentTypeEnum} from "../../model/appointment-type.enum";
import {AppointmentService} from "../../services/appointment.service";
import {DoctorModel} from "../../model/doctor.model";
import {Router} from "@angular/router";
import {StaffService} from "../../services/staff.service";
import {UserInformationService} from "../../services/user-information.service";
import {formatInTimeZone} from 'date-fns-tz'
import {UserModel} from "../../model/User.model";
import {AppointmentModel} from "../../model/appointment.model";
import {AppointmentStatusEnum} from "../../model/appointment-status.enum";


@Component({
  selector: 'app-confirm-time',
  templateUrl: './confirm-time.page.html',
  styleUrls: ['./confirm-time.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})


export class ConfirmTimePage implements OnInit {

  options: any;
  pageReady: boolean = false;
  formattedDate: any;
  user: UserModel;
  subscriptionComplete = true;
  totalHours = 0;
  tzoffset = (new Date()).getTimezoneOffset() * 60000;
  startDatetime = ""
  endDatetime = ""
  selectedTime: any;
  appointments: AppointmentModel[] = [];
  selectedDate: string
  selectedService = null;
  selectedDoctor: DoctorModel;
  doctors: DoctorModel[];
  appointmentTypes = Object.values(AppointmentTypeEnum);
  hourValues = ['09', '10', '11', '12', '13', '14', '15', '16', '17'];
  protected readonly Date = Date;

  constructor(public navParams: NavParams,
              public viewController: ModalController,
              private appointmentService: AppointmentService,
              private datePipe: DatePipe,
              private staffService: StaffService,
              private router: Router,
              private userInfoService: UserInformationService,
              private toastController: ToastController,
  ) {
    this.userInfoService.userInformation$.subscribe((user) => {
        this.user = user
      }
    );

    if (navParams.data) {
      this.options = navParams.data;
      this.selectedDate = this.options.date;

    }
  }


  cancelOnClick() {
    this.presentToast("top", "Cancelled", 'danger', 'close-outline');
    this.viewController.dismiss({confirm: false});
  }

  ngOnInit() {
    this.startDatetime = new Date(new Date(this.selectedDate).setHours(24, 0, 0, 0) - this.tzoffset).toISOString()
    this.endDatetime = new Date(new Date(this.selectedDate).setHours(24, 0, 0, 0) - this.tzoffset).toISOString()
  }

  confirmOnClick() {

    this.subscriptionComplete = false;

    this.appointmentService.createAppointmentFromRange(this.appointments).subscribe(
      () => {

        this.presentToast("top", 'Appointment Created', 'success', "checkmark-outline");
        this.viewController.dismiss({confirm: true});
      },
      error => {
        this.presentToast("top", error.message, 'danger', 'close-outline');
        // Handle errors if necessary
      }
    );
  }

  splitUpDates(): void {
    this.totalHours = 0;
    if (!this.canConfirm()) {
      return;
    }
    const startDate = new Date(this.startDatetime);
    const endDate = new Date(this.endDatetime);

    const chunks = [];

    while (startDate < endDate) {
      // Check if the current chunk falls within 9:00 AM and 5:00 PM
      if (startDate.getHours() >= 9 && startDate.getHours() <= 16) {
        const formattedDate = formatInTimeZone(startDate, 'Canada/Saskatchewan', 'yyyy-MM-dd,h:mm a');
        chunks.push(formattedDate);
      }
      startDate.setHours(startDate.getHours() + 1);
    }

    this.totalHours = chunks.length;

    chunks.forEach(date => this.createVacationModel(date))

  }


  createVacationModel(date) {
    let [dateStr, timeStr] = date.split(',');


    let vacationAppointment: AppointmentModel = {
      id: null,
      doctor: this.user?.firstName + " " + this.user?.lastName,
      patient: null,
      appointmentDate: dateStr,
      appointmentTime: timeStr,
      appointmentType: 'Out of Office',
      appointmentStatus: AppointmentStatusEnum.CONFIRMED
    }

    this.appointments.push(vacationAppointment);

  }


  canConfirm(): boolean {
    const startTime = new Date(this.startDatetime);
    const endTime = new Date(this.endDatetime);
    return startTime < endTime;
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
