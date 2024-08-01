import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {FormControlErrorDetailComponent as NgxFormControlErrorDetailComponent} from 'form-control-error-detail';

import {NgxValidators} from 'commons';

@Component({
  selector: 'asm-form-control-error-detail',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatIcon,
    MatError,
    MatLabel,
    NgxFormControlErrorDetailComponent
  ],
  templateUrl: './form-control-error-detail.component.html',
  styleUrl: './form-control-error-detail.component.scss'
})
export class FormControlErrorDetailComponent {

  public readonly requiredFormCtrl: FormControl = new FormControl(null, [Validators.required]);
  public readonly numericFormCtrl: FormControl = new FormControl(null, [NgxValidators.numeric]);
  public readonly decimalFormCtrl: FormControl = new FormControl(null, [NgxValidators.decimalNumber(3)]);
  public readonly customValidatorFormCtrl: FormControl = new FormControl(null, [this.customStringValidator()]);
  public readonly customValidatorRequiredFormCtrl: FormControl = new FormControl(null,
    [Validators.required, this.customStringValidator()]);

  private customStringValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!!control.value) {
        const valid = /^[A-Za-z]{3}-\d{3}$/.test(control.value);
        return valid ? null : {invalidCustomString: true};
      }
      return null;
    };
  }

}
