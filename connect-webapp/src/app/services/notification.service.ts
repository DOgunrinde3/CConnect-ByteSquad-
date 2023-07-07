import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../model/Login.model";
import {Observable} from "rxjs";
import {UserModel} from "../model/User.model";
import {NotificationModel} from "../model/notification.model";
import {DoctorModel} from "../model/doctor.model";

const BASE_URI = 'http://localhost:8080/api/v1/notification';

@Injectable({
  providedIn: 'root'
})

export class NotificationService{
  constructor(private http: HttpClient) {

  }

  createNotification(notification: NotificationModel): void{
    this.http.post<UserModel>(`${BASE_URI}/create-notification`, notification);
  }

  getUserNotification(userId: string): Observable<NotificationModel[]>{
    return this.http.get<NotificationModel[]>(`${BASE_URI}/create-notification/${userId}`);
  }



}
