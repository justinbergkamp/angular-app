import {
  style,
  animate,
  animation,
  keyframes
} from "@angular/animations";



// =========================
// Fade
// =========================
export const enter = animation([
  style({transform: 'translateX(-100%)'}),
  animate('{{time}} ease-in', style({transform: 'translateX(0%)'}))
]);

export const leave = animation([
  animate('{{time}} ease-in', style({transform: 'translateX(-100%)'}))
]);
