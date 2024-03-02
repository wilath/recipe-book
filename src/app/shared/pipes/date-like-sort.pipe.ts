import { Pipe, PipeTransform } from '@angular/core';

export enum SortType { 
    sortByDate,
    sortByLikes
}

@Pipe({
  name: 'dateLikeSort'
})
export class DateLikePipe implements PipeTransform {
  transform<T extends {date: Date, likes: {quantity: number}}>(elements: T[], sortByDate: SortType): T[]{
    if (!elements || elements.length === 0) {
      return [];
    }

    if (sortByDate === SortType.sortByDate) {
      elements.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA; 
      });
    } else {
        elements.sort((a, b) => b.likes.quantity - a.likes.quantity); 
    }

    return elements;
  }
}
