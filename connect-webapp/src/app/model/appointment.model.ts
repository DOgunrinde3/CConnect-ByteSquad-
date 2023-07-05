export class AppointmentModel{
  id: string | null;
  doctor: string | null;
  patientId?: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string | null;
  appointmentStatus: string;

}
