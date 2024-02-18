import { UserData } from "./user-data.model";

export interface NotificationModel {
    message: string,
    date: Date,
    shown: boolean,
    eventUser?: string
}