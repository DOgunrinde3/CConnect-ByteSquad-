import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppointmentModel} from "../model/appointment.model";
import {Observable} from "rxjs";
import {DoctorModel} from "../model/doctor.model";

const BASE_URI = 'http://localhost:8080/api/v1/staff';

@Injectable({
  providedIn: 'root'
})

export class StaffService{
  constructor(private http: HttpClient) {
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
