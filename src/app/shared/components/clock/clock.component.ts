import { Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: ` 
  <div class="clock">
    <span id="pointer1"></span>
    <span id="pointer2"></span>
  </div>`,
  styles: [`
    @import '../../../styles/variables';;

    .clock {
      position: relative;
      height: 28px;
      aspect-ratio: 1/1;
      border-radius: 50%;
      border: 2px solid $uno-white; 
    }
    .clock span {
      display: block;
      position: absolute;
      background-color: $uno-white; 
      height: 10px;
      width: 2px;
    }
    #pointer1 {
      bottom: 50%;
      left: calc(50% - 1px);
    }
    #pointer2 {
      height: 8px;
      bottom: 50%;
      left: calc(50% - 1px);
      transform-origin: bottom;
      transform: rotate(120deg);
    }
  `]
})
export class ClockComponent {

}

