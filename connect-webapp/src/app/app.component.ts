import {Component, EnvironmentInjector, inject, OnDestroy, OnInit} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {FooterPage} from "./components/footer/footer.page";
import {UserInformationService} from "./services/user-information.service";
import {StaffService} from "./services/staff.service";
import {NotificationsPage} from "./components/notifications/notifications.page";
import {NotificationService} from "./services/notification.service";
import {NotificationModel} from "./model/notification.model";
import {interval, Subscription, switchMap} from "rxjs";
import {UserModel} from "./model/User.model";
import {AppointmentStatusEnum} from "./model/appointment-status.enum";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterPage],
})
export class AppComponent implements OnInit, OnDestroy {
  public environmentInjector = inject(EnvironmentInjector);
  isAuthenticated;
  isStaff;
  pendingNotification = 0;
  getIcon = 'notifications-outline';
  getColor = 'red';

  notifications: NotificationModel[];
  user: UserModel;

  loadingSubsription: Subscription
  notficationsSuscriptionScomplete = false;


  constructor(private router: Router,
              private authService: AuthService,
              private userInfoService: UserInformationService,
              private staffService: StaffService,
              private notificationService: NotificationService,
              private modalController: ModalController) {
  }

  ngOnInit() {

    this.authService
      .getAuthState()
      .subscribe((value) => {
          this.isAuthenticated = value

          if (value === true) {
            this.userInfoService.loadUserInformation();
            this.isStaff = this.authService.isStaff();

            this.userInfoService.userNotifications$.subscribe((notifications) => {
              this.notifications = notifications;
              this.notficationsSuscriptionScomplete = true;

              this.pendingNotification = this.notifications?.reduce((acc, notification) => {
                if (notification.appointment.appointmentStatus === AppointmentStatusEnum.PENDING) {
                  return acc + 1;
                } else {
                  return acc;
                }
              }, 0);

            })
            this.userInfoService.userInformation$.subscribe((user) => {
              this.user = user;
            })
            this.checkForNewNotifications();

          }

        }
      );


  }

  logout() {
    this.authService.logout();
  };


  routeToBook() {
    this.router.navigate(["/book"]);
  }


  routeToManage() {
    if (this.isStaff) {
      this.router.navigate(["/staff-appointments"]);
    } else {
      this.router.navigate(["/manage-appointments"]);
    }
  }

  checkForNewNotifications(): void {
    interval(8500)
      .pipe(
        switchMap(() => this.notificationService.getUserNotification(this.user.userId))
      )
      .subscribe(newNotifications => {
        if (newNotifications && newNotifications?.length !== this.notifications?.length) {
          this.userInfoService.setUserNotification(newNotifications);
          this.getIcon = 'notifications';
          this.getColor = '#000000';

        }

      })


  }


  routeToBio() {
    this.router.navigate(["/bio"]);
  }

  routeToDoctorBio() {
    this.router.navigate(["/doctor-bio"]);
  }

  routeToHome() {
    this.router.navigate(["/home"]);
  }

  routeToSignup() {
    this.router.navigate(["/signup"]);

  }


  routeToLogin() {
    this.router.navigate(["/login"]);
  }

  async openModal() {

    this.getAppointments();
    this.getIcon = 'notifications-outline';
    this.getColor = '#ffffff';



    const modal = await this.modalController.create({
      component: NotificationsPage,
      mode: "ios",
      componentProps: {
        isStaff: this.isStaff
      }
    });
    await modal.present();


  }

  routeToServices() {
    this.router.navigate(["/services"]);
  }

  getAppointments() {
    this.userInfoService.loadUserInformation()
  }

  ngOnDestroy() {
    this.loadingSubsription.unsubscribe();
  }

}
