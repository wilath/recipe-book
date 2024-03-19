import { Component, Input, OnInit } from '@angular/core';
import { UserData, emptyUserData } from '../../shared/models/user-data.model';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from '../../shared/storage.service';
import { FileUpload } from '../../shared/models/file-upload.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit {


  constructor(private storage: StorageService){}
 

  @Input() public userInfo: UserData = emptyUserData;

  public userEditForm!: FormGroup;

  public ngOnInit(): void {
    this.initForm()
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

  public onSubmit(){}

  private initForm(){
    let name : string = '';
    let avatar: FormGroup = new FormGroup({});
    let city: string = '';
    let age: Date = new Date();
    let favRecipe: string = '';
    let motto: string = '';

    if(this.userInfo.extraInfo){
      name = this.userInfo.name;
      city = this.userInfo.extraInfo.city;
      age = new Date(this.userInfo.extraInfo.age)
      favRecipe = this.userInfo.extraInfo.favRecipe;
      motto = this.userInfo.extraInfo.motto;
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
}
