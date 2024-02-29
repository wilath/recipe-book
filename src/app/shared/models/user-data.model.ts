import { FileAnchor } from "./file-upload.model";
import { Ingredient } from "./ingredient.model";
import { NotificationModel } from "./notification.model";

export interface SimpleUserdata {
  email: string,
  name: string,
  avatar?: FileAnchor
}

export interface UserData extends SimpleUserdata {
    email: string;
    name: string;
    notifications: NotificationModel[];
    shoppingList: Ingredient[];
    followers: string[];
    userFollows: string[];
    avatar?: FileAnchor
  }