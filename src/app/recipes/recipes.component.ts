import { Component, OnInit} from '@angular/core';
import { UserDataStoragaService } from '../shared/user-data.storage.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  
  constructor(private anag: UserDataStoragaService) { }

  ngOnInit(){
    
  }
  }


