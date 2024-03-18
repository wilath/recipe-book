import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipesService } from '../recipes.service';
import { ShoppingItem, UserData } from '../../shared/models/user-data.model';
import { UserDataService } from '../../user-panel/user-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemComment } from '../../shared/models/microblog-comment.model';
import { User } from '../../shared/models/user.model';
import { UserNotification } from '../../shared/enums/notifications.enum';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss'],
})
export class RecipesDetailsComponent implements OnInit {
 
  constructor(
    private recipesService: RecipesService,
    private userDataService: UserDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
 

  public id: number = 0;

  public recipe!: Recipe;

  public usersRecipes!: Recipe[];

  public userData!: UserData;

  public totalRatePercentage: number = 0;

  public isLikedByCurrentUser: boolean = false;

  public isFollowedByCurrentUser: boolean = false;

  public isCommentSectionVisible: boolean = true;

  public isEmojiPickerVisible: boolean = false;

  public _rateByCurrentUser: number = 0;

  public newCommentForm!: FormGroup;

  public get rateByCurrentUser() {
    return this._rateByCurrentUser;
  }
  public set rateByCurrentUser(value: number) {
    this.onRateRecipe(value)
    this._rateByCurrentUser = value;
  }



  public ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipesService.getRecipe(this.id);
      this.usersRecipes = this.recipesService.getRecipes().filter(recipe => recipe.author ===  this.recipe.author).filter(recipe => recipe.id !== this.recipe.id);
    });
    this.userData = this.userDataService.getUserDataByEmail(
      JSON.parse(localStorage.getItem('userData') || '{}').email
    );
    this.isFollowedByCurrentUser = this.userDataService.checkIfUserisFollowed(this.recipe.author, this.userData.email)
    this.isLikedByCurrentUser = this.recipe.isLikedByUser(this.userData.email);
    this._rateByCurrentUser = this.recipe.isRatedByUser(this.userData.email);
    this.totalRatePercentage = this.recipe.getAverageRating * 20;
    this.setFollow();
    this.initForm()
  }

  public onGoBack() {
    this.router.navigate(['/recipes']);
  }

  public onRateRecipe(value: number) {
    this.recipesService.addRateToRecipe(
      this.recipe.name,
      this.userData.email,
      value
    );
    this.totalRatePercentage = this.recipe.getAverageRating * 20;
    this.isLikedByCurrentUser = this.recipe.isLikedByUser(this.userData.email)
  }

  public onDeleteRecipe() {
    this.recipesService.deleteRecepie(this.id);
    this.router.navigate(['/recipes']);
  }

  public onLikeRecipe(){
    this.recipesService.addLikeToRecipe(this.recipe.name,this.userData.email, !this.isLikedByCurrentUser);
    this.isLikedByCurrentUser = !this.isLikedByCurrentUser
  }

  public onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  public showHideComments(){
    this.isCommentSectionVisible = !this.isCommentSectionVisible
  }

  public onToShopList() {
    if(!this.userData.shoppingList.some( item => item.recipeId === this.recipe.id)){
      const newShoppingItem: ShoppingItem = {recipeName: this.recipe.name, recipeId: this.recipe.id, ingredients: this.recipe.ingredients};
      this.userDataService.addRecipeToShopList(this.userData.email, newShoppingItem);
      this.userDataService.setNotificationToUser(this.recipe.author, UserNotification.addToShopList, this.userData.email, this.recipe.name);
    }
  }

  public onFollowUser() {
    this.userDataService.addFollowToUser(this.recipe.author, this.userData.email,  !this.isFollowedByCurrentUser);
    this.isFollowedByCurrentUser = !this.isFollowedByCurrentUser;
  }

  public initForm(){
    let content = new FormControl('', [
      Validators.required]);
    this.newCommentForm = new FormGroup({
      content: content
    })

  }

  public onSubmit() {
    const newComment: ItemComment = {
      id: this.recipe.getHighestCommentId(),
      author: this.userData.email,
      content: this.newCommentForm.value.content,
      likes: {quantity: 0, whoLiked: []},
      date: new Date()
    }
    this.recipesService.onAddCommentToRecipe(this.recipe.id, newComment);
    this.initForm()
  }

  public showEmojiPanel() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible
  }
  
  public addEmoji(event: any){
    const textArea = <FormControl>this.newCommentForm.get('content');
    (<FormControl>this.newCommentForm.get('content')).setValue(`${textArea.value} ${event.emoji.native}`)
  }

  public onEnterKey(event: Event): void {
    const EventKey = event as KeyboardEvent
    if (EventKey.key === 'Enter' && !EventKey.shiftKey) {
      EventKey.preventDefault(); 
      this.onSubmit(); 
    }
  }

  private setFollow() {
    if (this.userDataService.getUserDataByEmail(this.recipe.author)) {
      this.isFollowedByCurrentUser =
        this.userDataService
          .getUserDataByEmail(this.recipe.author)
          .followers?.includes(this.userData.email) || false;
    }
  }

}
