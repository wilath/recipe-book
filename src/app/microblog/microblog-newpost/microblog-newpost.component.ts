import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileUpload } from '../../shared/models/file-upload.model';
import { MicroblogPost } from '../../shared/models/microblog-post.model';
import { StorageService } from '../../shared/storage.service';
import { UserDataService } from '../../user-panel/user-data.service';
import { MicroblogService } from '../microblog.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-microblog-newpost',
  templateUrl: './microblog-newpost.component.html',
  styleUrl: './microblog-newpost.component.scss',
})
export class MicroblogNewpostComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private storage: StorageService, 
    private userDataService: UserDataService, 
    private microblogService: MicroblogService) {}
 
  public newPostForm!: FormGroup;

  public userData = {email:'', name:''}

  public isEmojiPickerVisible: boolean = false;

  public isPhotoAddOption: boolean = false;

  public photoQuantity: number = 0;

  public ngOnInit(): void {
    this.initForm()
    this.loadUserData()
  }

  public onFileUpload(event: any ,index : number){

    const file: File = event.target.files[0];
    if(file) {
      this.storage.pushFileToStorage(new FileUpload(file)).pipe(finalize(()=>{
        if(this.photoQuantity < 8) {
          this.addImageInput() 
        }
      })).subscribe(
        (res) => {
          const imagesFormArray = (<FormArray>this.newPostForm.get('images')).controls as Array<FormGroup>;
         
            if (typeof res === `number` ) {
              imagesFormArray[index].patchValue({percentages:res});
            } else if (res) {
              imagesFormArray[index].patchValue({imageUrl: res.url});
            }
           
        }
      )
    }
  }
  public deleteImageFromForm(index: number){
    console.log('delete item')
  }

  public onSubmit() {
    
    const newPost :MicroblogPost = {
      id: this.microblogService.getIdforNewPost,
      author: this.userData.email,
      date: new Date,
      content: this.newPostForm!.value.content,
      images: [],
      likes: {quantity: 0, whoLiked: []},
      comments: []
    }
    this.microblogService.onAddNewPost(newPost)
    this.initForm()
    this.autoResize()
    this.isPhotoAddOption = false
    
  }

  public addImageInput() {
    this.isPhotoAddOption = true
    this.photoQuantity++
    (<FormArray>this.newPostForm.get('images')).push(
      new FormGroup({
        'input': new FormControl(null),
        'percentages': new FormControl(null),
        'imageUrl': new FormControl('')
      })
     )  
  }

  

  public autoResize(event?: Event) {
    if(event) {
      const textarea = event.target as HTMLTextAreaElement
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    } else {
      const textarea = document.getElementById('content') as HTMLTextAreaElement
      textarea.style.height = 'auto'

    }
     
   
  }

  public showEmojiPanel(){
     this.isEmojiPickerVisible = !this.isEmojiPickerVisible
  }

  public addEmoji(event: any) {
    const textArea = <FormControl>this.newPostForm.get('content');
    (<FormControl>this.newPostForm.get('content')).setValue(`${textArea.value} ${event.emoji.native}`)
  }

  private loadUserData(){
    const user = this.userDataService.getUserData(JSON.parse(localStorage.getItem('userData') || '{}').email);
    this.userData = {email: user.email, name: user.name}
  }

  private initForm() {
    let content = new FormControl('');
    let images = new FormArray<FormGroup>([]);

    this.newPostForm! = this.formBuilder.group({
      content: content,
      images: images,
    })
  }

}
