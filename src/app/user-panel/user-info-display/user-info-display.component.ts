import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { UserData, emptyUserData } from '../../shared/models/user-data.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MicroblogService } from '../../microblog/microblog.service';
import { RecipesService } from '../../recipes/recipes.service';

@Component({
  selector: 'app-user-info-display',
  templateUrl: './user-info-display.component.html',
  styleUrl: './user-info-display.component.scss',
})
export class UserInfoDisplayComponent implements OnInit {
  constructor(
    private usersDataService: UserDataService,
    private microblogService: MicroblogService,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public userInfo: UserData = emptyUserData;

  public age: number = 33;

  public usersActivity: { m: number; r: number } = { m: 0, r: 0 };

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.userInfo = this.usersDataService.getUserDataById(id);
      if (this.userInfo.extraInfo?.age) {
        this.age = this.getUsersAge(this.userInfo.extraInfo?.age);
      }
      this.usersActivity = {
        m: this.microblogService.getNumberOfPostForUser(this.userInfo.email),
        r: this.recipesService.getNumberOfRecipesForUser(this.userInfo.email),
      };
    });
  }
  private getUsersAge(date: Date): number {
    const pastDateTime: Date = new Date(date);

    const today: Date = new Date();

    const timeDifference: number = today.getTime() - pastDateTime.getTime();

    const years: number = timeDifference / (1000 * 3600 * 24 * 365.25);

    return Math.floor(years);
  }
}
