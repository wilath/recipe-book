import { Component, Input } from '@angular/core';
import { DifficultyLevel } from '../../models/recipe.model';

@Component({
  selector: 'app-levels',
  template: `
    <div class="level-container">
      <span
        [ngStyle]="{
          'background-color':
            level === 'Easy' ? 'rgb(228,230,235)' : 'transparent'
        }"
        id="sp1"
      ></span>
      <span
        [ngStyle]="{
          backgroundColor:
            level === 'Medium' ? 'rgb(228,230,235)' : 'transparent'
        }"
        id="sp2"
      ></span>
      <span
        [ngStyle]="{
          backgroundColor: level === 'Hard' ? 'rgb(228,230,235)' : 'transparent'
        }"
        id="sp3"
      ></span>
    </div>
  `,
  styles: [
    `
      @import '../../../styles/variables';;

      .level-container {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        gap: 2px;
        span {
          display: block;
          border: 2px solid $uno-white;
          width: 5px;
          border-radius: 5px;
        }
        #sp1 {
          height: 8px;
        }
        #sp2 {
          height: 18px;
        }
        #sp3 {
          height: 28px;
        }
      }
    `,
  ],
})
export class LevelsComponent {
  @Input({ required: true }) public level: DifficultyLevel =
    DifficultyLevel.Easy;
}
