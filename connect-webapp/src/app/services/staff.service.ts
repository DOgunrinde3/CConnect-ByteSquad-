import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {DoctorModel} from "../model/doctor.model";
import {NotificationModel} from "../model/notification.model";
import {AuthService} from "./auth.service";

const BASE_URI = 'https://cconnect-bytesquad-production.up.railway.app/api/v1/auth/staff';

@Injectable({
  providedIn: 'root'
})

export class StaffService {

  private staffInformationSubject = new BehaviorSubject<any>(null);
  staffInformation$ = this.staffInformationSubject.asObservable();
  private staffNotificationSubject = new BehaviorSubject<NotificationModel[]>(null);
  staffNotifications$ = this.staffNotificationSubject.asObservable();

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }


  update(staff: DoctorModel): Observable<DoctorModel> {
    return this.http.put<DoctorModel>(`${BASE_URI}/update/${staff.userId}`, staff);
  }

  getAllStaff(): Observable<DoctorModel[]> {
    return this.http.get<DoctorModel[]>(`${BASE_URI}`);

  }

  // getStaffByService(appointmentDetails: AppointmentModel): Observable<AppointmentModel>{
  //   console.log(appointmentDetails);
  //   return this.http.post<AppointmentModel>(`${BASE_URI}/book`, appointmentDetails);
  //
  // }
}
