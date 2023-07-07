import {AppointmentStatusEnum} from "./appointment-status.enum";

export class NotificationModel{
  id: string | null;
  appointmentId: string;
  notifiedUserId: string;
  notifiedFromId: string;
  appointmentStatus: AppointmentStatusEnum;
}

