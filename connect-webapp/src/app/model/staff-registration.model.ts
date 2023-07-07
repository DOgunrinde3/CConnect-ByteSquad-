import {AppointmentTypeEnum} from "./appointment-type.enum";

export class StaffRegistrationModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  birthDate: string;
  experience: number;
  services: AppointmentTypeEnum[];
}
