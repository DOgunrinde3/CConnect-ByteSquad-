import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppointmentModel} from "../model/appointment.model";
import {BehaviorSubject, Observable} from "rxjs";
import {DoctorModel} from "../model/doctor.model";
import {NotificationModel} from "../model/notification.model";
import {UserModel} from "../model/User.model";
import {AuthService} from "./auth.service";
import jwt_decode from "jwt-decode";

const BASE_URI = 'http://localhost:8080/api/v1/auth/staff';

@Injectable({
  providedIn: 'root'
})

export class StaffService{

  private staffInformationSubject = new BehaviorSubject<any>(null);
  private staffNotificationSubject = new BehaviorSubject<NotificationModel[]>(null);

  staffInformation$ = this.staffInformationSubject.asObservable();
  staffNotifications$ = this.staffNotificationSubject.asObservable();

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  // setStaffInformation(staffInformation: any) {
  //   this.staffInformationSubject.next(staffInformation);
  // }
  //
  // setStaffNotification(staffNotification: any) {
  //   this.staffNotificationSubject.next(staffNotification);
  // }
  // loadStaffInformation() {
  //   const token = localStorage.getItem('token');
  //   // @ts-ignore
  //   const decodedToken: any = jwt_decode(token);
  //
  //   if(token !== null) {
  //     const userInfo$ = this.http.get<any>(`${BASE_URI}/${decodedToken.sub}?role=${decodedToken.role}`);
  //     staffInfo$.subscribe(userInfo => {
  //
  //         this.setStaffInformation(userInfo);
  //         this.getNotifications();
  //       },
  //
  //       error=>{
  //         this.authService.logout();
  //         this.presentToast("top", "An error occurred, you've been logged out", 'danger', 'close-outline');
  //
  //       } );
  //
  //   }
  //   else { this.authService.logout()}
  // }

  update(staff: DoctorModel): Observable<DoctorModel>{
    return this.http.put<DoctorModel>(`${BASE_URI}/update/${staff.userId}`, staff);
  }

  getAllStaff(): Observable<DoctorModel[]>{
    return this.http.get<DoctorModel[]>(`${BASE_URI}`);

  }

  // getStaffByService(appointmentDetails: AppointmentModel): Observable<AppointmentModel>{
  //   console.log(appointmentDetails);
  //   return this.http.post<AppointmentModel>(`${BASE_URI}/book`, appointmentDetails);
  //
  // }
}
