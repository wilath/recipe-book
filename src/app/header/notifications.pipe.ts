import { Pipe, PipeTransform } from '@angular/core';
import { NotificationModel } from '../shared/models/notification.model';
import { NotifactionFilterEnum } from './header.component';

@Pipe({
  name: 'filterShown',
  pure: false
})
export class NotificationShownPipe implements PipeTransform {
  transform(notifications: NotificationModel[], filter: NotifactionFilterEnum): NotificationModel[] {
    if (!notifications) {
      return [];
    }

    const currentDate = new Date();
    const twoDaysAgo = new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000); 

    
    notifications.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return  dateB.getTime() - dateA.getTime();
    });
  
    if (filter === NotifactionFilterEnum.new) {
      return notifications.filter(notification => {
        const notificationDate = new Date(notification.date);
        return !notification.shown && notificationDate >= twoDaysAgo; 
      });
    } else {
      return notifications;
    }
  }
}
