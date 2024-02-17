import { NotificationModel } from "./notification.model";

export interface UserData {
    email: string;
    name: string;
    followers?: string[];
    userFollows?: string[];
    notifications?: NotificationModel[];
    avatar?: string;
  }