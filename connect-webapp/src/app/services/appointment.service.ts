import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

const appointmentHours = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM'
];
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  // @ts-ignore
  constructor() {
  }

  getAllAppointmentHours(){
    return appointmentHours;
  }

  // getDoctorAvailableAppointmentHours(){
  //   return appointmentHours;
  // }




}






