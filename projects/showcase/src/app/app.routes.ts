import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'overlay-spinner',
    loadComponent: () => import('./features/overlay-spinner/overlay-spinner.component')
      .then(r => r.OverlaySpinnerComponent)
  },
  {
    path: 'form-utils',
    loadComponent: () => import('./features/form-utils/form-utils.component')
      .then(r => r.FormUtilsComponent)
  },
  {
    path: 'material-file-uploader',
    loadComponent: () => import('./features/material-file-uploader/material-file-uploader.component')
      .then(r => r.MaterialFileUploaderComponent)
  }
];
