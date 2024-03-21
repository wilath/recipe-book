import { trigger, transition, style, animate } from '@angular/animations';

export const fadeIn = trigger('fadeInOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.45s linear', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0.45s linear', style({ opacity: 0 })),
  ]),
]);
