import {AbstractControl, ValidatorFn} from '@angular/forms';

function isNumeric(string: string, decimal: boolean): boolean {
  if (!!string) {
    string = string.trim();
  }
  if (decimal) {
    return /^-?\d+(\.\d+)?$/.test(string);
  }
  return /^-?\d+$/.test(string);
}

export namespace NgxValidators {

  export const numeric: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    if (!!control && !!control.value && !isNumeric(control.value, true)) {
      return {'numeric': true};
    }
    return null;
  };

  export const integerNumber: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    if (!!control && !!control.value && !isNumeric(control.value, false)) {
      return {'numeric_integer': true};
    }
    return null;
  };

  export const decimalNumber: (precision?: number) => ValidatorFn = (precision) => {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!!control && !!control.value) {
        if (!isNumeric(control.value, true)) {
          return {'numeric_decimal': true};
        }
        if (!!precision) {
          const decimals = control.value.toString().trim().split('.')[1];
          if (!!decimals && decimals.length > precision) {
            return {'numeric_decimal': {expectedPrecision: precision}};
          }
        }
      }
      return null;
    };
  };

  export const collection: (options: {
    minSize?: number,
    maxSize?: number
  }) => ValidatorFn = (options) => {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!!control && !!control.value) {
        if (!Array.isArray(control.value)) {
          return {'collection': true};
        }
        if (!!options.minSize && control.value.length < options.minSize) {
          return {'collection': {expectedMinSize: options.minSize}};
        }
        if (!!options.maxSize && control.value.length > options.maxSize) {
          return {'collection': {expectedMaxSize: options.maxSize}};
        }
      }
      return null;
    };
  }

  export const notEmpty: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    if (!!control && !!control.value && control.value.length < 1) {
      return {'empty': true};
    }
    return null;
  };

  export const notNull: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    if (!!control && !!control.value) {
      return null;
    }
    return {'requiredNotNull': true};
  };
}
