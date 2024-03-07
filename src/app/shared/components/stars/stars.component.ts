import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stars',
  template: ``,
  styles: ``
})
export class StarsComponent {

  @Input({required: true}) public perecentages: number = 0;

  @Input({required: true}) public usersRate: number = 0;

  
}
