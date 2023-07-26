import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppointmentModel} from "../model/appointment.model";
import {BehaviorSubject, Observable} from "rxjs";
import {DoctorModel} from "../model/doctor.model";
import {NotificationModel} from "../model/notification.model";
import {UserModel} from "../model/User.model";
import {AuthService} from "./auth.service";
import jwt_decode from "jwt-decode";

const BASE_URI = 'https://cconnect-bytesquad-production.up.railway.app/api/v1/auth/staff';

@Injectable({
  providedIn: 'root'
})

export class StaffService{


  constructor(private http: HttpClient,
              private authService: AuthService) {
  }


  update(staff: DoctorModel): Observable<DoctorModel>{
    return this.http.put<DoctorModel>(`${BASE_URI}/update/${staff.userId}`, staff);
  }

  getAllStaff(): Observable<DoctorModel[]>{
    return this.http.get<DoctorModel[]>(`${BASE_URI}`);

  }

}
