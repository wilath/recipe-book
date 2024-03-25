import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RecipesService } from '../../recipes/recipes.service';
import { MicroblogService } from '../../microblog/microblog.service';
import { MicroblogPost } from '../../shared/models/microblog-post.model';
import { Recipe } from '../../shared/models/recipe.model';
import { ActivatedRoute, Params } from '@angular/router';
import { UserData, emptyUserData } from '../../shared/models/user-data.model';
import { UserDataService } from '../user-data.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
})
export class UserPanelComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private microblogService: MicroblogService,
    private usersDataService: UserDataService,
    private responsive: BreakpointObserver) {}

  public userInfo: UserData = emptyUserData;

  public isSmallScreen: boolean = false;

  public currentUserEmail: string = '';

  public usersRecipes: Recipe[] = [];

  public usersPosts: MicroblogPost[] = [];

  public isEditModeActive: boolean = false;

  private microblogSub!: Subscription;

  private responsiveSub!: Subscription;


  ngOnInit(): void {
    this.setData()
    this.setMicroblogData()
    this.setResponsiveSub()
    
  }


  
  ngOnDestroy(): void {
    this.microblogSub.unsubscribe()
  }

  private setData() {
    this.currentUserEmail = JSON.parse(localStorage.getItem('userData') || '{}').email
    this.route.params.subscribe((params: Params)=>{
      const id = params['id'];
      this.userInfo = this.usersDataService.getUserDataById(id);
      this.usersRecipes = this.recipesService.getRecipes().filter(recipe => recipe.author === this.userInfo.email);
      this.usersPosts = this.microblogService.getMicroblogData().filter( post => post.author === this.userInfo.email)
    })
  }

  private setMicroblogData(){
    this.microblogSub = this.microblogService.postsChange.subscribe(() => {
      this.microblogService.storeDatainDatabase()
    });

  }
  private setResponsiveSub(){
    this.responsive.observe(['(min-width: 555px)']).subscribe((res)=>{
      this.isSmallScreen = res.matches
    })
  }
  
}
