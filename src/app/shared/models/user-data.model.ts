import { FileAnchor } from './file-upload.model';
import { Ingredient } from './ingredient.model';
import { NotificationModel } from './notification.model';

export interface SimpleUserdata {
  email: string;
  name: string;
  avatar?: FileAnchor;
}
export interface ShoppingItem {
  recipeName : string,
  recipeId: number,
  ingredients: Ingredient[]
}

export interface UserData extends SimpleUserdata {
  email: string;
  name: string;
  notifications: NotificationModel[];
  shoppingList: ShoppingItem[];
  followers: string[];
  userFollows: string[];
  avatar?: FileAnchor;
}

export const emptyUserData = {
  email: 'Couldnt load users data',
  name: 'Couldnt load users data',
  notifications: [
    { message: 'Couldnt load users data', date: new Date(), shown: false },
  ],
  shoppingList: [
    { name: 'Couldnt load users data', ammount: { number: 0, unit: 'pc' } },
  ],
  followers: ['Couldnt load users data'],
  userFollows: ['Couldnt load users data'],
  avatar: { name: 'Couldnt load users data', url: 'Couldnt load users data' },
};

export const emptySimpleUserdata = {
  email: 'Couldnt load users data',
  name: 'Couldnt load users data',
  avatar: { name: 'Couldnt load users data', url: 'Couldnt load users data' },
};
