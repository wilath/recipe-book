import { Target } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserDataService } from '../../user-panel/user-data.service';
import { UserData } from '../../shared/models/user-data.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-microblog-newpost',
  templateUrl: './microblog-newpost.component.html',
  styleUrl: './microblog-newpost.component.scss',
})
export class MicroblogNewpostComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userDataService: UserDataService) {}
 
  public newMicroblogPostForm!: FormGroup;

  public userData: UserData = {name: '', email: '', notifications: [], shoppingList: []}
  
  public ngOnInit(): void {
    this.initForm()
    this.loadUserData()
    console.log(this.userData)
  }

  public onSubmit() {
    console.log(this.getImageControls)
  }

  public get getImageControls(){
    return this.newMicroblogPostForm.get('images') as FormArray
  }

  public addImage() {
    const newImageControl = this.formBuilder.control('');
    this.getImageControls.push(newImageControl);
  }

  private loadUserData(){
    const userEmail = JSON.parse(localStorage.getItem('userData') || '{}').email;
    console.log(userEmail)
    this.userData = this.userDataService.getUserData(userEmail)
  }

  private initForm() {
    let content = new FormControl();
    let images = new FormArray<FormControl>([])

    this.newMicroblogPostForm = this.formBuilder.group({
      content: content,
      images: images,
    })
  }
  

}
