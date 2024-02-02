import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slForm!: NgForm;
   subscription: Subscription = new Subscription
   editMode = false;
   editedItemIndex:  number = 0
   editedItem: Ingredient =  {name: '', amount: 0}
  
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.onMerge();
    this.subscription = this.slService.startedEditing.subscribe(
      (index:number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onAddItem(form: NgForm){
    const value = form.value;
    const newIngd = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngd);
    } else (this.slService.addingredient(newIngd))
    this.editMode = false;
    form.reset();
    this.onMerge()
  }
  onDelete(){
    this.slForm.reset();
    this.editMode = false;
    this.slService.deleteIngredient(this.editedItemIndex)
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;

  }
  onMerge(){
    this.slService.mergeAlike()
  }
  onDeleteAll(){
    this.slService.deleteAll()
  }
}
