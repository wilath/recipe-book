import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthServcie } from "../auth/auth.servcie";
import { dataStoragaService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
    
    
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuth = false;
    isManage = false;
    private user$: Subscription;


    constructor(private dataStorageService: dataStoragaService, private aService: AuthServcie){}
   
    ngOnInit(){
        this.user$ = this.aService.user.subscribe(user =>{
            this.isAuth = !user ? false : true;
        if(this.isAuth){this.onFetchData()}
        });

        if (window.screen.width < 550) { 
            this.isManage = true;
          }
    }
    ngOnDestroy(){
        this.user$.unsubscribe();
    }

    onSavedata(){
        this.dataStorageService.storeRecipes();
    }
    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }
    onLogout(){
        this.aService.logout();
    }
    onManage(){
        this.isManage == false ? this.isManage = true : this.isManage = false
    
    }
}