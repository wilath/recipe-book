import { FileAnchor } from "./file-upload.model";


export interface NotificationModel {
    message: string,
    date: Date,
    shown: boolean,
    eventUserAvatar?: FileAnchor
}