import {AppointmentStatusEnum} from "./appointment-status.enum";

export class AppointmentModel{
  id: string | null;
  doctor: string | null;
  patient: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string | null;
  appointmentStatus: AppointmentStatusEnum;

}
