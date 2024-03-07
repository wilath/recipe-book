import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stars',
  template: `
    <div class="stars-container">
      <div class="rating-upper" [ngStyle]="{ width: perecentages + '%' }">
        @for(star of ratings; track $index){
        <span><i class="fa-solid fa-star"></i></span>
        }
      </div>
      <div class="rating-lower">
        @for(star of ratings; track $index){
        <span><i class="fa-solid fa-star"></i></span>
        }
      </div>

      <div class="star-picker">
        <form>
          @for(star of ratings; track $index){
          <label [for]="recipeName + 'star' + $index"
            ><i class="fa-solid fa-star"></i
            ><input
              [value]="star"
              [name]="recipeName + 'star'"
              [id]="recipeName + 'star' + $index"
              type="radio"
              [(ngModel)]="usersRate"
              (change)="emitData($event)"
          /></label>

          }
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      @import '../../styles/_variables.scss';
      .stars-container {
        display: inline-block;
        unicode-bidi: bidi-override;
        color: #888888;
        height: 25px;
        width: auto;
        margin: 0;
        position: relative;
        padding: 0;
        .rating-upper {
          color: $uno-apricot;
          padding: 0;
          position: absolute;
          z-index: 1;
          display: flex;
          top: 0;
          left: 0;
          overflow: hidden;
          font-size: 1rem;
        }

        .rating-lower {
          padding: 0;
          display: flex;
          z-index: 0;
          font-size: 1rem;
        }
        .star-picker {
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;

          input {
            width: 0;
            position: absolute;
          }
          label {
            margin: 0;
            padding: 0;
            color: transparent;
            cursor: pointer;
            &:has(input:checked) {
              -webkit-text-stroke: 1px white;
            }
          }
        }
      }
    `,
  ],
})
export class StarsComponent {
  @Input({ required: true }) public recipeName: string = '';

  @Input({ required: true }) public perecentages: number = 0;

  @Input({ required: true }) public usersRate: number = 0;

  @Output() public usersRateChange: EventEmitter<number> =
    new EventEmitter<number>();

  public ratings: number[] = [1, 2, 3, 4, 5];

  public emitData(event: Event) {
    const target = event.target as HTMLInputElement;
    this.usersRateChange.emit(parseInt(target.value, 10));
  }
}
