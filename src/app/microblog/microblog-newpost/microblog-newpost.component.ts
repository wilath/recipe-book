import { Target } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserDataService } from '../../user-panel/user-data.service';
import { UserData } from '../../shared/models/user-data.model';
import { User } from '../../shared/models/user.model';
import { MicroblogPost } from '../../shared/models/microblog-post.model';
import { MicroblogService } from '../microblog.service';

@Component({
  selector: 'app-microblog-newpost',
  templateUrl: './microblog-newpost.component.html',
  styleUrl: './microblog-newpost.component.scss',
})
export class MicroblogNewpostComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userDataService: UserDataService, private microblogService: MicroblogService) {}
 
  public newMicroblogPostForm!: FormGroup;

  public userData = {email:'', name:''}
  
  public ngOnInit(): void {
    this.initForm()
    this.loadUserData()
  }

  public get getImageControls(){
    return this.newMicroblogPostForm.get('images') as FormArray
  }

  public onSubmit() {
    const newPost :MicroblogPost = {
      id: this.microblogService.getIdforNewPost,
      author: this.userData.email,
      date: new Date,
      content: this.newMicroblogPostForm.value.content,
      images: [],
      likes: {quantity: 0, whoLiked: []},
      comments: []
    }
    this.microblogService.onAddNewPost(newPost)
    
  }

  public addImage() {
    const newImageControl = this.formBuilder.control('');
    this.getImageControls.push(newImageControl);
  }

  public autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    
  }

  private loadUserData(){
    const user = this.userDataService.getUserData(JSON.parse(localStorage.getItem('userData') || '{}').email);
    this.userData = {email: user.email, name: user.name}
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
