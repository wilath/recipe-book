import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';


@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css'],
  animations: [
    trigger('dropdown', [
      state('start', style({
        visibility: 'hidden',
        transform: 'translateX(250px)',
        opacity: 0,
      })),
      state('stop', style({
        visibility: 'visible',
        opacity: 1,
      })),
      transition('start <=> stop', animate(200))
    ])
  ]

})
export class RecipesDetailsComponent implements OnInit {
  flyIn: Recipe;
  id: number;


  constructor(
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router){

    }

  ngOnInit() {
   this.route.params
   .subscribe(
    (params: Params) => {
      this.id = +params['id'];
      this.flyIn = this.recipesService.getRecipe(this.id)
    }
   );

   if (window.screen.width < 550) {
    this.state = 'stop';
    this.isMobile = true
  }
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route}, )
    console.log(this.route)
    //this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route})
  }

  onDeleteRecipe(){
    console.log(this.id)
    this.recipesService.deleteRecepie(this.id);
    this.router.navigate(['/recipes'])

  }
  onToShopList(){
    this.shoppingListService.addRecipeIng2(this.flyIn.ingredients)
    console.log(this.flyIn)
  }

  state = 'start' 
  isMobile = false
  showMenu(){
    this.state = 'stop'
  }
  hideMenu(){
    this.state = 'start'
  }



}
