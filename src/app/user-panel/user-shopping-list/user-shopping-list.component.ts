import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { slideIn } from '../../shared/animations/slide-in.animation';
import { ShoppingItem } from '../../shared/models/user-data.model';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-shopping-list',
  templateUrl: './user-shopping-list.component.html',
  styleUrl: './user-shopping-list.component.scss',
  animations: [
    slideIn
  ]
})
export class UserShoppingListComponent  {

  constructor(private userDataService: UserDataService, private router: Router){}
  
  @Input({required: true}) userEmail: string = '';

  @Input({required: true}) shoppingList: ShoppingItem[] = [];

  public isVisible: boolean = false;


  public onDeleteIngredientFromShopList(recipeId: number, ingredientIndex: number){
    this.userDataService.deleteItemFromShopList(this.userEmail, recipeId, ingredientIndex)
  }

  public onDeleteRecipeFromShoplist(recipeId:number){
    this.userDataService.deleteItemFromShopList(this.userEmail,recipeId)
  }
  
  public onClearShopList(){
    this.userDataService.clearShopList(this.userEmail)
    
  }

  public goToRecipe(id: number){
    this.router.navigate(['recipes/' + id])
  }
  public showList() {
    this.isVisible = !this.isVisible
    }

}
