import {AppointmentStatusEnum} from "./appointment-status.enum";
import {AppointmentModel} from "./appointment.model";

export class NotificationModel{
  id: string | null;
  appointment: AppointmentModel;
  notifiedUserId: string;
  notifiedFromId: string;
}

