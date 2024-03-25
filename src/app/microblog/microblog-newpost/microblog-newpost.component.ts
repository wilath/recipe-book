import { Component, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileAnchor, FileUpload } from '../../shared/models/file-upload.model';
import { MicroblogPost } from '../../shared/models/microblog-post.model';
import { StorageService } from '../../shared/storage.service';
import { UserDataService } from '../../user-panel/user-data.service';
import { MicroblogService } from '../microblog.service';
import { finalize, take } from 'rxjs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { UserData, emptyUserData } from '../../shared/models/user-data.model';

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
    private microblogService: MicroblogService
  ) {}

  @Input() public isSmallScreen: boolean = false;

  public newPostForm!: FormGroup;

  public userData: UserData = emptyUserData

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
  
    this.isPhotoAddOption = false
  }

  public onShowEmojiPanel(){
     this.isEmojiPickerVisible = !this.isEmojiPickerVisible
  }

  public addEmoji(event: any) {
    const textArea = <FormControl>this.newPostForm.get('content');
    (<FormControl>this.newPostForm.get('content')).setValue(`${textArea.value} ${event.emoji.native}`)
  }

  private loadUserData(){
    this.userData = this.userDataService.getUserDataByEmail(JSON.parse(localStorage.getItem('userData') || '{}').email);
  }

  private initForm() {
    let content = new FormControl('', [
      Validators.required] );
    let images = new FormArray<FormGroup>([]);

    this.newPostForm! = this.formBuilder.group({
      content: content, 
      images: images,
    })
  }

}
