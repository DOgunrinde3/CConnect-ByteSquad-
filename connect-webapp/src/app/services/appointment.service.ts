import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AppointmentModel} from "../model/appointment.model";
import {AppointmentStatusEnum} from "../model/appointment-status.enum";

const BASE_URI = 'https://cconnect-bytesquad-production.up.railway.app/api/v1/appointment';


const appointmentHours = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM'
];

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  // @ts-ignore
  constructor(private http: HttpClient) {
  }

  getAllAppointmentHours() {
    return appointmentHours;
  }

  getUserAppointments(userId: string): Observable<AppointmentModel[]> {
    return this.http.get<AppointmentModel[]>(`${BASE_URI}/user/${userId}`);
  }

  bookAppointment(appointmentDetails: AppointmentModel): Observable<AppointmentModel> {
    return this.http.post<AppointmentModel>(`${BASE_URI}/book`, appointmentDetails);

  }

  createAppointmentFromRange(appointmentDetails): Observable<AppointmentModel[]> {
    return this.http.post<AppointmentModel[]>(`${BASE_URI}/bulk-book`, appointmentDetails);

  }

  update(appointment: AppointmentModel, status: AppointmentStatusEnum): Observable<AppointmentModel> {
    appointment.appointmentStatus = status;
    return this.http.put<AppointmentModel>(`${BASE_URI}/update/${appointment.id}`, appointment);
  }

  getAppointmentsByDoctor(doctorId: string): Observable<AppointmentModel[]> {
    return this.http.get<AppointmentModel[]>(`${BASE_URI}/doctor/${doctorId}`);
  }


  // getDoctorAvailableAppointmentHours(){
  //   return appointmentHours;
  // }


}






