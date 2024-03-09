import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { FoodType } from '../../shared/enums/food-type-enum';
import { DifficultyLevel, Recipe } from '../../shared/models/recipe.model';
import { FileAnchor, FileUpload } from '../../shared/models/file-upload.model';
import { finalize } from 'rxjs';
import { StorageService } from '../../shared/storage.service';
import { IngredientUnits } from '../../shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private storage: StorageService, 
  ) {}

  public recipe: Recipe | null = null

  public editMode = false;

  public foodType = FoodType;

  public foodLevel = DifficultyLevel;

  public unitTypes = IngredientUnits;
  
  public prepTimes = [5,15,30,45,60,75,90];

  public isPhotoAddOption = false;

  public photoQuantity = 0;

  public recipeForm!: FormGroup;

  public loggedUser!: string;

  public ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      if(this.editMode){
        this.recipe = this.recipeService.getRecipe(params['id']);
      }
      this.loggedUser = JSON.parse(localStorage.getItem('userData') || '{}').email;
      this.initForm();
    });
    
  }

  public onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        ammount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        unit: new FormControl(null, Validators.required)
      })
    );
  }

  public onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  public onAddImageInput() {
    this.isPhotoAddOption = true
    this.photoQuantity++
    (<FormArray>this.recipeForm.get('images')).push(
      new FormGroup({
        'input': new FormControl(null),
        'percentages': new FormControl(0),
        'imageData': new FormControl<FileAnchor>({name:'', url: ''})
      })
     )  
  }

  public onDeleteImageInput(index: number){
    const imagesFormArray = (<FormArray>this.recipeForm.get('images'));
    imagesFormArray.removeAt(index)
  }

  public onAddDescriptionStep() {
    (<FormArray>this.recipeForm.get('description')?.get('steps')).push(
      new FormControl('', Validators.required)
    )
  }

  public onDeleteDescriptionStep(index:number){
    (<FormArray>this.recipeForm.get('description')?.get('steps')).removeAt(index)
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
          const imagesFormArray = (<FormArray>this.recipeForm.get('images')).controls as Array<FormGroup>;
         
            if (typeof res === `number` ) {
              imagesFormArray[index].patchValue({percentages:res});
            } else if (res) {
              imagesFormArray[index].patchValue({imageData: {name: res.name, url: res.url}});
            }       
        }
      )
    }
  }

  public onSubmit() {

    const images = (<{input: string, percentages: number, imageData: FileAnchor}[]>this.recipeForm.value.images)
    .map( (el) => {return el.imageData})
    .filter( el => el.url);

    const newRecipe = new Recipe(
      this.recipe ? this.recipe.id : this.recipeService.getIdforNewRecipe(),
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      images,
      this.recipeForm.value.ingredients,
      this.recipeForm.value.type,
      this.recipe ? this.recipe.author : this.loggedUser,
      this.recipeForm.value.level,
      this.recipeForm.value.prepTime,
      this.recipe ? this.recipe.date : new Date(),
      this.recipe ? this.recipe.comments : [],
      this.recipe ? this.recipe.likes :{ quantity: 0, whoLiked: [] },
      this.recipe ? this.recipe.stars : []

    )
    if (this.editMode) {
      this.recipeService.updateRecipe(newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  private initForm() {
    let recipeName = '';
    let recipeFoodType = FoodType.dinner
    let recipeLevel = DifficultyLevel.Easy;
    let recipePrepTime = 45;
    let recipeDescription = new FormGroup({
      main: new FormControl('', [Validators.required]),
      steps: new FormArray<FormControl>([])
    });
    let recipeIngredients = new FormArray<FormGroup>([]);
    let recipeImages = new FormArray<FormGroup>([]);

    if (this.editMode && this.recipe) {
      
      recipeName = this.recipe.name;
      recipeFoodType = this.recipe.foodType;
      recipeLevel = this.recipe.level;
      recipePrepTime = this.recipe.prepTimeMinutes;
     

      if (this.recipe['description']){
        recipeDescription.patchValue({
          main: this.recipe.description.main
        });
        const stepsArray = recipeDescription.get('steps') as FormArray
        for(let step of this.recipe.description.steps){
          stepsArray.push(new FormControl(step))
        }
      }

      if (this.recipe['ingredients']) {
        for (let ingredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, [Validators.required]),
              ammount: new FormControl(ingredient.ammount, [Validators.required]),
              unit: new FormControl(ingredient.unit, [Validators.required])
            })
          );
        }
      }
      if (this.recipe['images']) {
        for (let image of this.recipe.images) {
          recipeImages.push(
            new FormGroup({
              input: new FormControl(null),
              percentages: new FormControl(100),
              imageData: new FormControl({name: image.name,url:image.url}, [Validators.required])
            })
          );
        }
      }
    }
    

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      type: new FormControl(recipeFoodType, Validators.required),
      level: new FormControl(recipeLevel, Validators.required),
      prepTime: new FormControl(recipePrepTime, Validators.required),
      description: recipeDescription,
      ingredients: recipeIngredients,
      images: recipeImages
    });
  }
 
}
