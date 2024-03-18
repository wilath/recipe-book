import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShoppingItem } from '../../shared/models/user-data.model';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-shopping-list',
  templateUrl: './user-shopping-list.component.html',
  styleUrl: './user-shopping-list.component.scss'
})
export class UserShoppingListComponent  {

  constructor(private userDataService: UserDataService){}
  
  @Input({required: true}) userEmail: string = '';

  @Input({required: true}) shoppingList: ShoppingItem[] = [];

  public onDeleteIngredient(recipeId: number, ingredientIndex: number){}

  public onDeleteRecipe(recipeId:number){}

}
