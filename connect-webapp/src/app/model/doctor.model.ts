import {AppointmentTypeEnum} from "./appointment-type.enum";

export class DoctorModel{
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  email: string;
  experience: string;
  services: AppointmentTypeEnum[];
}
