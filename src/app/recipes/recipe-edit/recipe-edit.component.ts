import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { FoodType } from '../../shared/enums/food-type-enum';
import { DifficultyLevel } from '../../shared/models/recipe.model';
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

  public id: number = 0;

  public editMode = false;

  public foodType = FoodType;

  public foodLevel = DifficultyLevel;

  public prepTimes = [5,15,30,45,60,75,90];

  public unitTypes = IngredientUnits;

  public isPhotoAddOption = false;

  public photoQuantity = 0;

  public recipeForm!: FormGroup;

  public ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
    
  }

  public onDeleteIng(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
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

  public onDeleteImageFromForm(index: number){
    const imagesFormArray = (<FormArray>this.recipeForm.get('images'));
    imagesFormArray.removeAt(index)
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
    /* const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']); */
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  private initForm() {
    let recipeName = '';
    let recipeFoodType = FoodType.dinner
    let recipeLevel = DifficultyLevel.Easy;
    let recipePrepTime = 45;
    let recipeDescription = '';
    let recipeIngredients = new FormArray<FormGroup>([]);
    let recipeImages = new FormArray<FormGroup>([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeFoodType = recipe.foodType;
      recipeLevel = recipe.level;
      recipePrepTime = recipe.prepTimeMinutes;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, [Validators.required]),
              ammount: new FormControl(ingredient.ammount.number, [Validators.required]),
              unit: new FormControl(ingredient.ammount.unit, [Validators.required])
            })
          );
        }
      }
      if (recipe['images']) {
        for (let image of recipe.images) {
          recipeImages.push(
            new FormGroup({
              input: new FormControl(image.name, [Validators.required]),
              percentages: new FormControl(100, [Validators.required]),
              imageData: new FormControl(image.url, [Validators.required])
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
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
      images: recipeImages
    });
  }
 
}
