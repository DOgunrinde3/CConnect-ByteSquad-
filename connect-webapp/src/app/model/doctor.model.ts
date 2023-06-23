export class DoctorModel{
  doctorId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  email: string;
  gender: string;
  experience: string;
  image: string;
  specialization?: string; //change to enum
  possibleAppointmentTimes: string[];
}
