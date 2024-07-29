import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'overlay-spinner',
    loadComponent: () => import('./features/overlay-spinner/overlay-spinner.component')
      .then(r => r.OverlaySpinnerComponent)
  }
];
