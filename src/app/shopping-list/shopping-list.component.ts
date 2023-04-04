import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'] ,
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Array<Ingredient> = [];
  private igChangedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(){
    this.ingredients = this.shoppingListService.getShopList();
    this.igChangedSub = this.shoppingListService.ingChganged.subscribe(
      (ingredients: Ingredient[]) => {this.ingredients = ingredients}
    )
  }
  ngOnDestroy(){
  this.igChangedSub.unsubscribe();
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index)
  }
  onDeleteAll(){
    this.shoppingListService.deleteAll()
  }

}
