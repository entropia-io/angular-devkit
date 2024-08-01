import {InjectionToken} from '@angular/core';
import {AbstractControl} from '@angular/forms';

export interface FormControlErrorDetailsExtraResolver {
  (control: AbstractControl): string | null;
}

export const DEFAULT_LOCALE_ID: string = 'EN';

export const FORM_CONTROL_ERROR_DETAILS_EXTRA_RESOLVER: InjectionToken<FormControlErrorDetailsExtraResolver> = new InjectionToken<FormControlErrorDetailsExtraResolver>(
  'FormControlErrorDetailsExtraResolver');
