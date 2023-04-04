import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';


@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']

})
export class RecipesItemComponent implements OnInit {
@Input() recipe: Recipe;
@Input() index: number;



  ngOnInit(){
    if (window.innerWidth < 960) {
      this.onMobile = true
    }
  }
 onMobile = false
}
