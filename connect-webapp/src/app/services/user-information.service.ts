import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from "../model/User.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {DoctorModel} from "../model/doctor.model";
import jwt_decode from "jwt-decode";
import {ToastController} from "@ionic/angular";
import {NotificationService} from "./notification.service";
import {NotificationModel} from "../model/notification.model";
import {AppointmentModel} from "../model/appointment.model";


const BASE_URI = 'http://localhost:8080/api/v1/auth/user';

@Injectable({
  providedIn: 'root'
})

export class UserInformationService {

  // @ts-ignore
  private userInformationSubject = new BehaviorSubject<any>(null);
  private userNotificationSubject = new BehaviorSubject<NotificationModel[]>(null);

  // @ts-ignore
  userInformation$ = this.userInformationSubject.asObservable();
  userNotifications$ = this.userNotificationSubject.asObservable();



  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastController: ToastController,
              private notificationService: NotificationService) {

  }

  setUserInformation(userInformation: any) {
    this.userInformationSubject.next(userInformation);
  }

  setUserNotification(userNotification: any) {
    this.userNotificationSubject.next(userNotification);
  }

  loadUserInformation() {
   const token = localStorage.getItem('token');
    // @ts-ignore
    const decodedToken: any = jwt_decode(token);

      if(token !== null) {
  const userInfo$ = this.http.get<any>(`${BASE_URI}/${decodedToken.sub}?role=${decodedToken.role}`);
  userInfo$.subscribe(userInfo => {

    this.setUserInformation(userInfo);
      this.getNotifications();
    },

      error=>{
    this.authService.logout();
    this.presentToast("top", "An error occurred, you've been logged out", 'danger', 'close-outline');

  } );

  }
      else { this.authService.logout()}
  }

  update(user: UserModel): Observable<UserModel>{
    return this.http.put<UserModel>(`${BASE_URI}/update/${user.userId}`, user);
  }
   getNotifications(){
    let userId;
    this.userInformation$.subscribe((user) => {userId = user.userId } )
    this.notificationService.getUserNotification(userId).subscribe(
      (notifications)=> { this.setUserNotification(notifications);
      }
    )
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

}
