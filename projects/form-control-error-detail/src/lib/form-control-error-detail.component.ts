import {Component, inject, Input, LOCALE_ID, OnDestroy, Optional, SkipSelf} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {filter, merge, startWith, Subscription} from 'rxjs';
import {FORM_CONTROL_ERROR_DETAILS_EXTRA_RESOLVER, FormControlErrorDetailsExtraResolver} from './index';
import {MatError, MatFormField} from '@angular/material/form-field';
import {getLocalizedControlErrorMessage} from '@andresandoval/ngx-commons';

@Component({
  selector: 'ngx-form-control-error-detail',
  standalone: true,
  imports: [],
  template: '{{errorMessage}}'
})
export class FormControlErrorDetailComponent implements OnDestroy {
  private readonly localeId: string = inject(LOCALE_ID);
  private readonly extraResolver: FormControlErrorDetailsExtraResolver | null = inject(
    FORM_CONTROL_ERROR_DETAILS_EXTRA_RESOLVER, {optional: true});
  public errorMessage: string = '';

  private _control: AbstractControl | null = null;
  private controlStatusChangeSubscription: Subscription | null = null;

  constructor(
    @Optional() @SkipSelf() private matError: MatError,
    @Optional() @SkipSelf() private matFormField: MatFormField
  ) {
    if (!matError || !matFormField) {
      throw new Error('fch-form-control-error must be used inside a mat-error which is inside a mat-form-field');
    }
  }

  public ngOnDestroy(): void {
    this.removeControlSubscriptions();
  }

  @Input()
  public set control(value: AbstractControl) {
    this.removeControlSubscriptions();
    this._control = value;

    if (!!this._control) {
      this.controlStatusChangeSubscription = merge(this._control.statusChanges, this._control.valueChanges)
        .pipe(
          startWith({}),
          filter(() => {
            return this._control?.invalid || false;
          })
        )
        .subscribe(() => {
          this.errorMessage = this.getControlErrorMessage();
        });
    }
  }

  private getControlErrorMessage(): string {
    return getLocalizedControlErrorMessage(this._control!, this.localeId, control => {
      if (!!this.extraResolver) {
        return this.extraResolver(control);
      }
      return null;
    });
  }

  private removeControlSubscriptions(): void {
    if (!!this.controlStatusChangeSubscription) {
      this.controlStatusChangeSubscription.unsubscribe();
    }
  }
}
