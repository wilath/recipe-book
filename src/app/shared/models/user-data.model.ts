import { FileAnchor } from './file-upload.model';
import { Ingredient } from './ingredient.model';
import { NotificationModel } from './notification.model';

export interface ShoppingItem {
  recipeName : string,
  recipeId: number,
  ingredients: Ingredient[]
}

export interface SimpleUserdata {
  email: string;
  id: string;
  name: string;
  avatar?: FileAnchor;
}

export interface UserExtraInfo {
  city: string,
  age: string,
  motto: string,
  favRecipe: string,
}


export interface UserData extends SimpleUserdata {
  email: string;
  id: string;
  name: string;
  notifications: NotificationModel[];
  shoppingList: ShoppingItem[];
  followers: string[];
  userFollows: string[];
  extraInfo?: UserExtraInfo;
  avatar?: FileAnchor;
}

export const emptyUserData = {
  email: 'Couldnt load users data',
  id: 'Couldnt load users data',
  name: 'Couldnt load users data',
  notifications: [
    { message: 'Couldnt load users data', date: new Date(), shown: false },
  ],
  shoppingList: [
    { recipeName: 'Couldnt load users data', recipeId: 0, ingredients: [] },
  ],
  followers: ['Couldnt load users data'],
  userFollows: ['Couldnt load users data'],
  avatar: { name: 'Couldnt load users data', url: 'Couldnt load users data' },
};

export const emptySimpleUserdata = {
  email: 'Couldnt load users data',
  name: 'Couldnt load users data',
  id: 'Couldnt load users data',
  avatar: { name: 'Couldnt load users data', url: 'Couldnt load users data' },
};
