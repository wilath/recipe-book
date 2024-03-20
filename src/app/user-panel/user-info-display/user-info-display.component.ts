import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { UserData, emptyUserData } from '../../shared/models/user-data.model';
import { MicroblogService } from '../../microblog/microblog.service';
import { RecipesService } from '../../recipes/recipes.service';
import { Recipe } from '../../shared/models/recipe.model';
import { UserDataService } from '../user-data.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-info-display',
  templateUrl: './user-info-display.component.html',
  styleUrl: './user-info-display.component.scss',
})
export class UserInfoDisplayComponent implements OnChanges {

  constructor(
    private usersDataService: UserDataService,
    private microblogService: MicroblogService,
    private recipesService: RecipesService,
  ) {}

  @Input() public userInfo: UserData = emptyUserData;
  
  @Input() public currentUserEmail: string = '';

  @ViewChild(UserEditComponent) UserEdit!: UserEditComponent

  public isEditMode: boolean = false;

  public age: number = 33;

  public usersActivity: { m: number; r: number } = { m: 0, r: 0 };

  public isFollowedByCurretnUser: boolean = false;


  public ngOnChanges(): void {
    if (this.userInfo.extraInfo?.age) {
      this.age = this.getUsersAge(this.userInfo.extraInfo?.age);
    }
    this.usersActivity = {
      m: this.microblogService.getNumberOfPostForUser(this.userInfo.email),
      r: this.recipesService.getNumberOfRecipesForUser(this.userInfo.email),
    };
    
    this.isFollowedByCurretnUser = this.usersDataService.checkIfUserisFollowed(this.userInfo.email,this.currentUserEmail )
  }

  public onFollowUser(){
    this.isFollowedByCurretnUser = !this.isFollowedByCurretnUser
    this.usersDataService.addFollowToUser(this.userInfo.email,this.currentUserEmail, this.isFollowedByCurretnUser )

  }

  public onEdit(){
    this.isEditMode = true;
  }

  

  public onCancelEdit() {
    this.isEditMode = false;
  }
  
  public onSubmit() {
    this.UserEdit.onSubmit()
    this.isEditMode = false
  }

  private getUsersAge(date: string): number {
    console.log(date)
    const pastDateTime: Date = new Date(date);

    const today: Date = new Date();

    const timeDifference: number = today.getTime() - pastDateTime.getTime();

    const years: number = timeDifference / (1000 * 3600 * 24 * 365.25);

    return Math.floor(years);
  }

  
}
