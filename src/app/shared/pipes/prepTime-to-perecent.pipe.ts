import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prepTimeToPercent',
})
export class PrepTimePercentPipe implements PipeTransform {
  transform(prepTime: string): number {
    const multiplier = 16.6666666667;
    const times = [5, 15, 30, 45, 60, 75, 90];
    const index = times.findIndex((el) => el === parseInt(prepTime, 10));

    return index * multiplier;
  }
}
