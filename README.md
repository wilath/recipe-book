# RecipeBook Social platform

The aim of the project was to create a usable app that allows users to exchange culinary knowledge and experience. 

[Live View](https://recipesproject-fc6f3.web.app/auth)


## Table of contents:
* [What this application does](#What-it-does)
* [Technologies](#Technologies)
* [Challanges](#Challanges)
* [Features to implement or improve in the future](#Features-to-implement-or-improve-in-the-future)

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

**Firebase DataBase** is used to store all necessary data(users Data, microblog Data, recipes Data). Each main module communicates with service to either load or store data. real-time-database.service.ts is responsible for communication with Firebase. Proper interceptor requires a logged-in user to allow data traffic to Firebase.

## Data flow

Each data flow is reactive and managed by the relevant services. To handle the data, the services use the RxJS library.

Starting from registartion, AuthService fires data flow through UserData.service.ts and loads users data from DataBase, which is needed if new user is being added to the App. Microblog/Recipes data is loaded respectivly on route via resolvers. Resolvers are firing data load only once, when app is initliazed. Upon taking an action, new data is immedietaly saved to DataBase.

# Challanges

While building this app, i encouraged many minor and major obstacles. I've learned from everyone of it and managed to improve on many fields. Here are some of them:

- For the most of the time, I've struggled with proper data loading from Firebase RealTimeDatabase. DB does'nt save empty arrays, so I've faced many 'undefined' problems when trying to display data. I've solved that problems by mapping through data when receving from HTTP client and insertting empty arrays, this solution was quicker than consideration of 'undefined' type in many components. 

- Optimazing, this app features images and data loading. I've imporved the optimalization by dividing data loading from HTTP respectivitly between modules via resolvers. Implemented Lazy loading and defer loading on viewport. I also managed to use 'ngOptimazedImage' directive on imgs.

- Creating a component to display user ratings was an interesting experience in terms of the CSS used. I wanted it to perfectly display the overall rate in percentags on the stars, and mantain it function of taking new rating. I wanted the component to be fully reusable. 

- When creating this project, I wanted to limit the amount of SCSS code as much as possible. I wanted the application to work visually with a minimum of code. I created reusable css classes myself, which were used throughout the project.

- It was definitely time consuming to configure the application properly to work with all the Firebase components used( Auth, Storage, DB), but rewarding afterall.

- Nicely growing/shrinking textareas, I did'nt want to flood my components with brutal JS code, so I've solved this using directive 'cdkTextareaAutosize' from CDK/layout,

- Building reactive forms, reactive forms always require a little bit more focus. I've had interesting problem while implementing Firebase Storage percentage inidicator. Using Reactive Forms i changed file input into FormGroup with FormControls, patching FormContol values based on Observable stream from Storage, nicely allowed me to get desired effect( displaying photo, and percentage loading ) with minimal component code and few lines in the template.

- During whole proccess I've had to spend many hours playing with grids and flexbox for desired effects. I'm convinced it helped me push my CSS skills further.

# Features to implement or improve in the future

- Carousel display of images in posts and recipes

- Add edit option for comments and posts (logic already there)

- Add new module, featuring **marketplace** for users. Members could create sales/auctions for their unwanted kitchen equipments

- A possibility to quickly display referance to recipe/marketplace item in microblog post.

- Implement mails/messages between users,

- Implement password change, account delete.
