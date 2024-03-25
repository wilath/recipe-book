import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserData, emptyUserData } from '../../shared/models/user-data.model';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from '../../shared/storage.service';
import { FileUpload } from '../../shared/models/file-upload.model';
import { UserDataService } from '../user-data.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss', '../user-info-display/user-info-display.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {

  constructor(
    private storage: StorageService, 
    private userDataService: UserDataService,
    private responsive: BreakpointObserver
    ){}

 
  @Input() public userInfo: UserData = emptyUserData;

  public isSmallScreen: boolean = false;

  public userEditForm!: FormGroup;

  private responsiveSub!: Subscription;

  public ngOnInit(): void {
    this.initForm()
    this.setResponsiveSub();
  }

  public ngOnDestroy(): void {
    this.responsiveSub.unsubscribe()
  }

  public onFileUpload(event: any){

    const file: File = event.target.files[0];
    if(file) {
      this.storage.pushFileToStorage(new FileUpload(file)).subscribe(
        (res) => {
          const avatar = this.userEditForm.get('avatar') as FormGroup
         
            if (typeof res === `number` ) {
              avatar.patchValue({percentages:res});
            } else if (res) {
              avatar.patchValue({imageData: {name: res.name, url: res.url}});
            }       
        }
      )
    }
  }

  public onDeleteImageInput() {
    (<FormGroup>this.userEditForm.get('avatar')).reset({
      input: null,
      percentages: 0,
      imageData: {}
    });
    }

  public onSubmit(){
    const userData = this.userInfo
    const userForm = this.userEditForm.value;

    userData.extraInfo = {city: userForm.city, age: userForm.birthDate, motto: userForm.motto, favRecipe: userForm.favRecipe}
    userData.name = userForm.name;
   
    if(userForm.avatar){
      userData.avatar = {name: userForm.avatar.imageData.name , url: userForm.avatar.imageData.url}
    }

    this.userDataService.editUser(userData);
    this.userInfo = userData
  }

  

  private initForm(){
    let name = this.userInfo.name;
    let avatar: FormGroup = new FormGroup({
      input: new FormControl(null),
      percentages: new FormControl(0),
      imageData: new FormControl({name: '', url:''})
    })
    let city: string = '';
    let age: string = '';
    let favRecipe: string = '';
    let motto: string = '';

    

    if(this.userInfo.extraInfo){
      city = this.userInfo.extraInfo.city ?? '';
      age = this.userInfo.extraInfo.age ?? '';
      favRecipe = this.userInfo.extraInfo.favRecipe ?? '';
      motto = this.userInfo.extraInfo.motto?? '';
    }

    if(this.userInfo.avatar) {
      avatar = new FormGroup({
        input: new FormControl(null),
        percentages: new FormControl(100),
        imageData: new FormControl({name: this.userInfo.avatar.name, url:this.userInfo.avatar.url})
      })
    }

    this.userEditForm = new FormGroup({
      name: new FormControl(name),
      avatar: avatar,
      city: new FormControl(city),
      birthDate: new FormControl(age),
      favRecipe: new FormControl(favRecipe),
      motto: new FormControl(motto),
    })
  }

  private setResponsiveSub(){
    this.responsiveSub = this.responsive.observe(['(max-width: 555px)']).subscribe( res => {
      this.isSmallScreen = res.matches
    })
  }
}
