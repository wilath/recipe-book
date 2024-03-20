import { Pipe, PipeTransform } from '@angular/core';
import { NotificationModel } from '../shared/models/notification.model';


@Pipe({
  name: 'filterShown',
  pure: false
})
export class NotificationShownPipe implements PipeTransform {
  transform(notifications: NotificationModel[], filter: string, fire: boolean): NotificationModel[] {
    if (!notifications) {
      return [];
    }

    if (filter === 'new') {
      const currentDate = new Date();
      const twoDaysAgo = new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000); 
      return notifications.filter(notification => {
        const notificationDate = new Date(notification.date);
        return !notification.shown && notificationDate >= twoDaysAgo; 
      });
    } else {
      return notifications;
    }
  }
}