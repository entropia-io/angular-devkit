import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'overlay-spinner',
    loadComponent: () => import('./features/overlay-spinner/overlay-spinner.component')
      .then(r => r.OverlaySpinnerComponent)
  },
  {
    path: 'form-control-error-detail',
    loadComponent: () => import('./features/form-control-error-detail/form-control-error-detail.component')
      .then(r => r.FormControlErrorDetailComponent)
  },
  {
    path: 'material-file-uploader',
    loadComponent: () => import('./features/material-file-uploader/material-file-uploader.component')
      .then(r => r.MaterialFileUploaderComponent)
  }
];
