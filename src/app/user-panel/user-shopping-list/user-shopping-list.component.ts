import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShoppingItem } from '../../shared/models/user-data.model';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-shopping-list',
  templateUrl: './user-shopping-list.component.html',
  styleUrl: './user-shopping-list.component.scss'
})
export class UserShoppingListComponent  {

  constructor(private userDataService: UserDataService, private router: Router){}
  
  @Input({required: true}) userEmail: string = '';

  @Input({required: true}) shoppingList: ShoppingItem[] = [];

  public onDeleteIngredient(recipeId: number, ingredientIndex: number){}

  public onDeleteRecipe(recipeId:number){}

  public goToRecipe(id: number){
    this.router.navigate(['recipes/' + id])

  }

}
