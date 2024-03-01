import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileAnchor, FileUpload } from '../../shared/models/file-upload.model';
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
export class MicroblogNewpostComponent implements OnInit, OnDestroy {
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

  public ngOnDestroy(): void {
    const images = (<{input: string, percentages: number, imageData: FileAnchor}[]>this.newPostForm.value.images)
    .map( (el) => {return el.imageData})
    .filter( el => el.url)

    for(let i = 0; i < images.length; i++){
      this.storage.deleteFile(images[i].name)
    }
  }
 
  public onFileUpload(event: any ,index : number){

    const file: File = event.target.files[0];
    if(file) {
      this.storage.pushFileToStorage(new FileUpload(file)).pipe(finalize(()=>{
        if(this.photoQuantity < 8) {
          this.onAddImageInput() 
        }
      })).subscribe(
        (res) => {
          const imagesFormArray = (<FormArray>this.newPostForm.get('images')).controls as Array<FormGroup>;
         
            if (typeof res === `number` ) {
              imagesFormArray[index].patchValue({percentages:res});
            } else if (res) {
              imagesFormArray[index].patchValue({imageData: {name: res.name, url: res.url}});
            }       
        }
      )
    }
  }

  public onDeleteImageFromForm(index: number){
    const imagesFormArray = (<FormArray>this.newPostForm.get('images'));
    imagesFormArray.removeAt(index)
  }

  public onAddImageInput() {
    this.isPhotoAddOption = true
    this.photoQuantity++
    (<FormArray>this.newPostForm.get('images')).push(
      new FormGroup({
        'input': new FormControl(null),
        'percentages': new FormControl(0),
        'imageData': new FormControl<FileAnchor>({name:'', url: ''})
      })
     )  
  }

  public onSubmit() {

    const images = (<{input: string, percentages: number, imageData: FileAnchor}[]>this.newPostForm.value.images)
    .map( (el) => {return el.imageData})
    .filter( el => el.url);

    const newPost = new MicroblogPost(
      this.microblogService.getIdforNewPost,
      this.userData.email,
      new Date(),
      this.newPostForm!.value.content,
      images,
      { quantity: 0, whoLiked: [] },
      []
    );

    this.microblogService.onAddNewPost(newPost)
    this.initForm()
    this.autoResize()
    this.isPhotoAddOption = false
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

  public onShowEmojiPanel(){
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
