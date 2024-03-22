import { FileAnchor } from "./file-upload.model";
import { UserData } from "./user-data.model";


export interface NotificationModel {
    message: string,
    date: Date,
    shown: boolean,
    eventUserAvatar?: FileAnchor
}