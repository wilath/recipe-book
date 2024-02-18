import { NotificationModel } from "./notification.model";

export interface UserData {
    email: string;
    name: string;
    notifications: NotificationModel[];
    followers?: string[];
    userFollows?: string[];
    avatar?: string;
  }