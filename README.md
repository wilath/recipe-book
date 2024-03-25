# RecipeBook Social platform

The aim of the project was to create a usable app that allows users to exchange culinary knowledge and experience. 


## Table of contents:
* [What this application does](#What-it-does)
* [Technologies](#technologies)
* [Challanges](#challanges)
* [Features to implement or improve in the future](#improve)

# What it does 

This appliaction features three modules

* [Microblog](#microblog)
* [Recipes](#recipes)
* [User-Panel](#user-panel)


## Microblog

Microblog allows users to add posts, share their experiences and thoughts.

### Users can take actions on microblog:

- Create new Post

- Comment posts

- Like posts

- Follow other users

- Delete his own posts/comments

Once user is followed, follower will receive notifications once the user of interest commits an action on microblog or will add a new Recipe to the Appliaction.

Microblog posts are loadead lazy based on viewport apperance, with :enter animation.

![post-item](https://firebasestorage.googleapis.com/v0/b/recipesproject-fc6f3.appspot.com/o/readme%2Fmicroblog-item.png?alt=media&token=d6d6f6e0-b80e-4d52-a944-3c2379e39a50)


## Recipes

This is a core module and main goal of the app, it features full CRUD on recipes.

Main component displays a sorting/filering menu, that allows user to find his desired recipe. Sorting/filtering was done solely with Angular Pipes (pure). Below that user can see all avalaible recipes gathered into tiles. Tile displays brief info about recipe (title, rating, likes, difficulty level, preparation time and recipes author)

User can take actions on Recipe:

- **Like recipe**,

- **Rate recipe**, on 1-5 star scale. Recipe-Item component displays the current Rate given by logged user( white circuit around the star), and the averege rating of recipe based on all rates.

- **Follow author** of the recipe, to get informed upon his activities on the page.

- **Add to Shopping List**, once added user can go to his account and see all ingredients needed for that recipe. This action can only be done from Recipe-Details.

- **Edit Recipe**, only author of the recipe can input changes on the recipe, including deleting. This action can only be done from Recipe-Details component.

![recipe-item](https://firebasestorage.googleapis.com/v0/b/recipesproject-fc6f3.appspot.com/o/readme%2Frecipe-item.png?alt=media&token=bc97aa91-0579-426c-bde1-a83b40c50589)


## User-Panel

This module allows user to take a peak on other users data and acitvity- see his posts and recipes. Once user is displaying his own profile, he can see his actuall shopping list. 

### User can take actions on shopping list:

- Clear whole shopping list,

- Delete recipe from shopping list,

- Delete precise ingredient from shopping list.

![shoplist](https://firebasestorage.googleapis.com/v0/b/recipesproject-fc6f3.appspot.com/o/readme%2Fshoplist.png?alt=media&token=229f69b5-aa47-45f7-afc5-3ee4d0c3a5a3)

### User can edit his/her own profile, data available for changes:

-Avatar,

-Name,

-Extra Info(City, Age, Favourite dish, motto).

![user-info](https://firebasestorage.googleapis.com/v0/b/recipesproject-fc6f3.appspot.com/o/readme%2Fprofile.png?alt=media&token=bc64ea6c-c4bd-4285-8ba9-bc265de857c6)

### User Notifications

User will receive notifications when:

- Joins the site,

- His recipe got liked,

- His recipe got rated,

- Got Followed/Unfollowed,

- New user joined the site,

- His post got liked,

- His post got commented,

- His recipe got commented,

- Someone added his recipe to shopping list,

- Followed user added post/recipe.

# Technologies

This project was created with **Angular 17** including dependencies:

    -rxjs: ~7.8.0,

    -angular/animations: ^17.1.0,

    -angular/cdk: ^17.1.2,
        
    -angular/fire: ^17.0.1,

    -angular/material: ^17.1.2,

    -angular/platform-browser: ^17.1.0,

    -angular/platform-browser-dynamic: ^17.1.0,
       
    -ctrl/ngx-emoji-mart": ^9.2.0,

    -ng-recaptcha: ^13.2.1,
    
    -and others...

## Authentication

**Firebase Authentication** is used for managing users authenitcations Via auth.service.ts and colaterall elements.

Only logged users can access the app. AutoLogout is set to execute after 1 hour from login time.

**Google ReCaptcha v2** is implemented into Signing-in Form, along with **honeypot technique** to prevent flooding with bots.

## Backend Storage

**Firebase Storage** is used for managing all images provided by users via storage.service.ts

Images are loaded from Forms to Storage with Live-loading percentage indicator. When user deletes image from form or routes somewhere else image is erased from storage.

![image-test](https://firebasestorage.googleapis.com/v0/b/recipesproject-fc6f3.appspot.com/o/readme%2Fimage-test.png?alt=media&token=034dc6a4-adbb-4de1-bd9a-8a544755c0ea)

## RealTimeDatabase

**Firebase DataBase** is used to store all necessary data(users Data, microblog Data, recipes Data). Each main module communicates with service to either load or store data. real-time-database.service.ts is responsible for communication with Firebase. Proper interceptor requires a logged-in user to allow data traffic to Firebase. On start of the application data loading process is initiated via resolvers.