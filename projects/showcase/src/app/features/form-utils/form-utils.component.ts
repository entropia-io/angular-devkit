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
import {FormControlErrorMessageComponent as NgxFormControlErrorMessageComponent} from '@entropia-io/ngx-form-utils';
import {NgxValidators} from '@entropia-io/ngx-form-utils/validators';


@Component({
  selector: 'asm-form-utils',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatIcon,
    MatError,
    MatLabel,
    NgxFormControlErrorMessageComponent
  ],
  templateUrl: './form-utils.component.html',
  styleUrl: './form-utils.component.scss'
})
export class FormUtilsComponent {

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
