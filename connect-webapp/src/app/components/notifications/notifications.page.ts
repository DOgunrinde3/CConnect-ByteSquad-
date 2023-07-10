import {Component, OnDestroy} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, ModalController, NavParams, ToastController} from '@ionic/angular';
import {AppointmentService} from "../../services/appointment.service";
import {StaffService} from "../../services/staff.service";
import {Router} from "@angular/router";
import {NotificationModel} from "../../model/notification.model";
import {UserInformationService} from "../../services/user-information.service";
import {AppointmentStatusEnum} from "../../model/appointment-status.enum";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class NotificationsPage {

  options: any;
  notifications: NotificationModel[];
  loadingSubscriptionDone = false;



  constructor(public navParams: NavParams,
              public viewController: ModalController,
              private appointmentService: AppointmentService,
              private userInfoService: UserInformationService,
              private datePipe: DatePipe,
              private staffService: StaffService,
              private router: Router,
              private toastController: ToastController) {


  }


  ionViewWillEnter() {
  this.userInfoService.userNotifications$.subscribe((userNotifications) => {
      this.notifications = userNotifications;
      this.loadingSubscriptionDone = true;
    });

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

  view(date: string){
    date = this.datePipe.transform(date);
    this.viewController.dismiss({confirm: true});
    this.router.navigate(['/staff-appt', {date: date}]);
  }



  cancelOnClick() {
    this.viewController.dismiss({confirm: false});
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


}
