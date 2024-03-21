import { trigger, transition, style, animate } from '@angular/animations';

export const slideIn = trigger('inOutAnimation', [
  transition(':enter', [
    style({ height: 0, opacity: 0 }),
    animate('0.3s linear', style({ height: '*', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ height: '*', opacity: 1 }),
    animate('0.3s linear', style({ height: 0, opacity: 0 })),
  ]),
]);
