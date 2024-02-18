import { Pipe, PipeTransform } from '@angular/core';
import { NotificationModel } from '../shared/models/notification.model';


@Pipe({
  name: 'filterShown'
})
export class NotificationShownPipe implements PipeTransform {
  transform(notifications: NotificationModel[] | undefined, filter: string ): NotificationModel[] {
    if (!notifications) {
      return [];
    }
    if (filter === 'new') {
      return notifications.filter(notification => !notification.shown);
    } else {
      return notifications;
    }
  }
}
