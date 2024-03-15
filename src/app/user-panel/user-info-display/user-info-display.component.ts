import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { UserData, emptyUserData } from '../../shared/models/user-data.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-info-display',
  templateUrl: './user-info-display.component.html',
  styleUrl: './user-info-display.component.scss'
})
export class UserInfoDisplayComponent implements OnInit {

  constructor(private usersDataService: UserDataService, private route: ActivatedRoute, private router: Router) {}

  public userInfo: UserData = emptyUserData;

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.userInfo = this.usersDataService.getUserDataById(id)
    });

  }

}
