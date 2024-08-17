import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {ErrorStateMatcher} from '@angular/material/core';
import {AbstractControl, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {FORM_CONTROL_ERROR_DETAILS_EXTRA_RESOLVER} from '@entropia-io/ngx-form-utils';

class ShowOnTouchedOrDirtyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched || (form && form.submitted)));
  }
}

export function formControlErrorDetailsExtraResolver(control: AbstractControl): string | null {
  if (control.hasError('invalidCustomString')) {
    return 'Invalid custom string, pattern must be AAA-000';
  }
  return null;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnTouchedOrDirtyErrorStateMatcher
    },
    {
      provide: FORM_CONTROL_ERROR_DETAILS_EXTRA_RESOLVER,
      useValue: formControlErrorDetailsExtraResolver
    },
    { provide: LOCALE_ID, useValue: 'ES-EC' }
  ]
};
