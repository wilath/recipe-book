import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthServcie } from './auth/auth.servcie';
import { RecipesService } from './recipes/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('test', [
      state('start', style({
        transform: 'translateY(-40vh)',
        right: Math.random()*25 + '%',
        opacity:1,
        scale: 1
      })),
      state('stop', style({
        transform: 'translateY(160vh)',
        opacity: 0.7,
        right: Math.random()*25 + '%',
        scale: 0.5+Math.random()*0.5
      })),
      transition('start => stop', animate(10000+Math.random()*2000 )),
      transition('stop => start', animate(0))
    ]),
    trigger('test2', [
      state('start', style({
        transform: 'translateY(-40vh)',
        right: 25+Math.random()*25 + '%',
        opacity:1,
        scale: 1
      })),
      state('stop', style({
        transform: 'translateY(160vh)',
        opacity: 0.7,
        right: 25+Math.random()*25 + '%',
        scale: 0.5+Math.random()*0.5
      })),
      transition('start => stop', animate(17000+Math.random()*2000 )),
      transition('stop => start', animate(0),)
    ]),
    trigger('test3', [
      state('start', style({
        transform: 'translateY(-40vh)',
        right: 50+Math.random()*25 + '%',
        opacity:1,
        scale: 1
      })),
      state('stop', style({
        transform: 'translateY(160vh)',
        opacity: 0.7,
        right: 50+Math.random()*25 + '%',
        scale: 0.5+Math.random()*0.5
      })),
      transition('start => stop', animate(12000+Math.random()*2000 )),
      transition('stop => start', animate(0))
    ]),
    trigger('test4', [
      state('start', style({
        transform: 'translateY(-40vh)',
        right: 75+Math.random()*25 + '%',
        opacity:1,
        scale: 1
      })),
      state('stop', style({
        transform: 'translateY(160vh)',
        opacity: 0.7,
        right: 75+Math.random()*25 + '%',
        scale: 0.5+Math.random()*0.5
      })),
      transition('start => stop', animate(13000+Math.random()*2000 )),
      transition('stop => start', animate(0))
    ]),trigger('test5', [
      state('start', style({
        transform: 'translateY(-40vh)',
        right: 10+Math.random()*80 + '%',
        opacity:1,
        scale: 1
      })),
      state('stop', style({
        transform: 'translateY(160vh)',
        opacity: 0.7,
        right: 10+Math.random()*80 + '%',
        scale: 0.5+Math.random()*0.5
      })),
      transition('start => stop', animate(13000+Math.random()*2000)),
      transition('stop => start', animate(0))
    ]),trigger('test6', [
      state('start', style({
        transform: 'translateY(-40vh)',
        right: 10+Math.random()*80 + '%',
        opacity:1,
        scale: 1
      })),
      state('stop', style({
        transform: 'translateY(160vh)',
        opacity: 0.7,
        right: 10+Math.random()*80 + '%',
        scale: 0.5+Math.random()*0.5
      })),
      transition('start => stop', animate(13000+Math.random()*2000 )),
      transition('stop => start', animate(0))
    ])
  ]

})
export class AppComponent implements OnInit {

  constructor(private aService: AuthServcie,
    private rService:RecipesService) {}

  state = 'start';
  state2 = 'start';
  state3 = 'start';
  state4 = 'start';
  state5 = 'start';
  state6 = 'start';

  ngOnInit(){

    this.aService.autoLogin();
    this.randoms()

    if (window.innerWidth < 960) {
      this.onMobile = true
    }

  }
 onMobile:boolean = false

  randomImage: string
  randomImage2: string
  randomImage3: string
  randomImage4: string
  randomImage5: string
  randomImage6: string

  logo: string = '../assets/images/logo.png'
  images: Array<string> = [
    '../assets/images/beer.png',
    '../assets/images/coffee.png',
    '../assets/images/cherry.png',
    '../assets/images/croisant.png',
    '../assets/images/pizza.png',
    '../assets/images/cover.png',
    '../assets/images/drink.png',
    '../assets/images/burger.png',
    '../assets/images/cola.png',
    '../assets/images/forks.png'

  ]

  onAnimate(name){
    switch(name){
      case 'test':
          this.state == 'start' ? this.state = 'stop' : this.state = 'start';
          break;
      case 'test2':
          this.state2 == 'start' ? this.state2 = 'stop' : this.state2 = 'start';
          break;
      case 'test3':
          this.state3 == 'start' ? this.state3 = 'stop' : this.state3 = 'start';
          break;
      case 'test4':
          this.state4 == 'start' ? this.state4 = 'stop' : this.state4 = 'start';
          break;
      case 'test5':
          this.state5 == 'start' ? this.state5 = 'stop' : this.state5 = 'start';
          break;
      case 'test6':
          this.state6 == 'start' ? this.state6 = 'stop' : this.state6 = 'start';
          break;
    }
  }

  randoms(){
    this.randomImage = this.images[Math.floor(Math.random()*8)];
    this.randomImage2 = this.images[Math.floor(Math.random()*8)];
    this.randomImage3 = this.images[Math.floor(Math.random()*8)];
    this.randomImage4 = this.images[Math.floor(Math.random()*8)];
    this.randomImage5 = this.images[Math.floor(Math.random()*8)];
    this.randomImage6 = this.images[Math.floor(Math.random()*8)];

  }

  animationDone(event){
    if(event.toState == 'stop'){

      setTimeout(()=>{
        this.onAnimate(event.triggerName)
    }, Math.random()*8000);

    switch(event.triggerName){
      case 'test':
        this.randomImage = this.images[Math.floor(Math.random()*8)];
          break;
      case 'test2':
          this.randomImage2 = this.images[Math.floor(Math.random()*8)];
          break;
      case 'test3':
          this.randomImage3 = this.images[Math.floor(Math.random()*8)];
          break;
      case 'test4':
          this.randomImage4 = this.images[Math.floor(Math.random()*8)];
          break;
      case 'test5':
          this.randomImage5 = this.images[Math.floor(Math.random()*8)];
          break;
      case 'test6':
          this.randomImage6 = this.images[Math.floor(Math.random()*8)];
          break;

      }}

    if(event.totalTime == 0){
      this.onAnimate(event.triggerName)
    }

}



}


