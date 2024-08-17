import {Component, inject, Input, OnDestroy} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {filter, merge, startWith, Subscription} from 'rxjs';
import {FORM_CONTROL_ERROR_DETAILS_EXTRA_RESOLVER, FormControlErrorDetailsExtraResolver} from '../index';
import {getFormControlErrorMessage} from './form-control-error-message.resolver';
import {I18N_LOCALE_MAP, I18nLocaleTranslatePipe, I18nManagerService} from '@entropia-io/ngx-commons/i18n';
import * as i18nLocaleMap from './i18n-locale-map.json';

@Component({
  selector: 'ngx-form-control-error-message',
  standalone: true,
  providers: [
    {
      provide: I18N_LOCALE_MAP,
      useValue: i18nLocaleMap
    }
  ],
  template: '{{errorMessage}}'
})
export class FormControlErrorMessageComponent implements OnDestroy {
  private readonly extraResolver: FormControlErrorDetailsExtraResolver | null = inject(
    FORM_CONTROL_ERROR_DETAILS_EXTRA_RESOLVER, {optional: true});
  public errorMessage: string | null = null;

  private _control: AbstractControl | null = null;
  private controlStatusChangeSubscription: Subscription | null = null;

  private readonly i18nPipe : I18nLocaleTranslatePipe;

  public constructor(i18nManagerService: I18nManagerService) {
    this.i18nPipe = new I18nLocaleTranslatePipe(i18nLocaleMap, i18nManagerService);
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
          const messageWithParams =
            this.errorMessage = this.getControlErrorMessage();
        });
    }
  }

  private getControlErrorMessage(): string {
    const msgWithParams = getFormControlErrorMessage(this._control!, control => {
      if (!!this.extraResolver) {
        return this.extraResolver(control);
      }
      return null;
    });
    if (!!msgWithParams) {
      if (msgWithParams.skipTranslate === true) {
        return msgWithParams.message;
      }
      return this.i18nPipe.transform(msgWithParams.message, msgWithParams.params);
    }
    return '';
  }

  private removeControlSubscriptions(): void {
    if (!!this.controlStatusChangeSubscription) {
      this.controlStatusChangeSubscription.unsubscribe();
    }
  }
}
