import {Component, EnvironmentInjector, inject, OnDestroy, OnInit} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {FooterPage} from "./components/footer/footer.page";
import {UserInformationService} from "./services/user-information.service";
import {ConfirmAppointmentPage} from "./components/confirm-appointment/confirm-appointment.page";
import {NotificationsPage} from "./components/notifications/notifications.page";
import {NotificationService} from "./services/notification.service";
import {NotificationModel} from "./model/notification.model";
import {interval, Subscription, switchMap} from "rxjs";
import {UserModel} from "./model/User.model";

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
getIcon = 'notifications-outline';
  notifications: NotificationModel[];
  user: UserModel;

  loadingSubsription:Subscription
  notficationsSuscriptionScomplete  = false;


  constructor(private router: Router,
              private authService: AuthService,
  private userInfoService: UserInformationService,
              private notificationService: NotificationService,
              private modalController: ModalController){}

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
        })
        this.userInfoService.userInformation$.subscribe((user) => {
          this.user = user;
        })
        this.checkForNewNotifications();

      }

    }
    );


  }

  logout(){
      this.authService.logout();
    };



  routeToBook(){
    this.router.navigate(["/book"]);
  }



  routeToManage(){
    if(this.isStaff){
      this.router.navigate(["/manage-appointments-staff"]);
    }
    else {
      this.router.navigate(["/manage-appointments"]);
    }
  }

  checkForNewNotifications(): void {
    interval(25000)
      .pipe(
        switchMap(() => this.notificationService.getUserNotification(this.user.userId))
      )
      .subscribe(newNotifications => {
        if (newNotifications?.length !== this.notifications?.length) {
          this.userInfoService.setUserNotification(newNotifications);
           this.getIcon = 'notifications';
        }

      })


  }


  routeToBio(){
    this.router.navigate(["/bio"]);
  }

routeToHome(){
    this.router.navigate(["/home"]);
  }

  routeToSignup(){
    this.router.navigate(["/signup"]);

  }


  routeToLogin(){
    this.router.navigate(["/login"]);
  }

  async openModal() {

    this.getAppointments();
    this.getIcon = 'notifications-outline';


    const modal = await this.modalController.create({
      component: NotificationsPage,
      mode: "ios",
    });
    await modal.present();



  }

  routeToServices(){
      this.router.navigate(["/services-page"]);
    }

    getAppointments(){
    this.userInfoService.loadUserInformation()
    }

  ngOnDestroy(){
    this.loadingSubsription.unsubscribe();
    }

}
