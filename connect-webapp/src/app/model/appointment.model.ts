export class AppointmentModel{
  doctorId: string | null;
  patientId?: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string | null;
  appointmentStatus: string;

}
