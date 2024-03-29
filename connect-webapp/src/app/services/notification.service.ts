import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NotificationModel} from "../model/notification.model";

const BASE_URI = 'https://cconnect-bytesquad-production.up.railway.app/api/v1/notification';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  constructor(private http: HttpClient) {

  }

  createNotification(notification: NotificationModel): Observable<NotificationModel> {
    return this.http.post<NotificationModel>(`${BASE_URI}/create-notification`, notification);
  }

  updateNotification(notification: NotificationModel, toStaff: boolean): Observable<NotificationModel> {
    return this.http.put<NotificationModel>(`${BASE_URI}/update-notification/${notification.appointment.id}?toStaff=${toStaff}`, notification);
  }

  getUserNotification(userId: string): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${BASE_URI}/${userId}`);
  }


}
