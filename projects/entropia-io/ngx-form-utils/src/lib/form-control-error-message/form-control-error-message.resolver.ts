import {AbstractControl} from '@angular/forms';

export interface MessageWithParams {
  message: string;
  params?: object;
  skipTranslate?: boolean;
}

export function getFormControlErrorMessage(
  control: AbstractControl, extraResolverFn?: (control: AbstractControl) => string | null): MessageWithParams | null {

  if (control == null || control.valid) {
    return null;
  }

  // native angular errors
  if (control.hasError('min')) {
    return {
      message: '@@min',
      params: {
        min: control.getError('min').min
      }
    };
  }
  if (control.hasError('max')) {
    return {
      message: '@@max',
      params: {
        max: control.getError('max').max
      }
    };
  }
  if (control.hasError('minlength')) {
    return {
      message: '@@minlength',
      params: {
        requiredLength: control.getError('minlength').requiredLength
      }
    }
  }
  if (control.hasError('maxlength')) {
    return {
      message: '@@maxlength',
      params: {
        requiredLength: control.getError('maxlength').requiredLength
      }
    }
  }
  if (control.hasError('pattern')) {
    return {
      message: '@@pattern',
      params: {
        requiredPattern: control.getError('pattern').requiredPattern
      }
    }
  }
  if (control.hasError('email')) {
    return {
      message: '@@email'
    }
  }
  if (control.hasError('required')) {
    return {
      message: '@@required'
    }
  }

  // custom validation errors
  if (control.hasError('numeric')) {
    return {
      message: '@@numeric'
    }
  }
  if (control.hasError('numeric_integer')) {
    return {
      message: '@@numeric_integer'
    }
  }
  if (control.hasError('numeric_decimal')) {
    const error: { expectedPrecision?: number } = control.getError('numeric_decimal');
    if (!!error.expectedPrecision) {
      return {
        message: '@@numeric_decimal_with_expected_precision',
        params: {
          expectedPrecision: error.expectedPrecision
        }
      }
    }
    return {
      message: '@@numeric_decimal'
    }
  }
  if (control.hasError('collection')) {
    const error: { expectedMinSize?: number, expectedMaxSize?: number } = control.getError('collection');
    if (!!error.expectedMinSize) {
      return {
        message: '@@collection_with_expected_min_size',
        params: {
          expectedMinSize: error.expectedMinSize
        }
      }
    }
    if (!!error.expectedMaxSize) {
      return {
        message: '@@collection_with_expected_max_size',
        params: {
          expectedMaxSize: error.expectedMaxSize
        }
      }
    }
    return {
      message: '@@collection'
    }
  }
  if (control.hasError('empty')) {
    return {
      message: '@@empty'
    }
  }
  if (control.hasError('null')) {
    return {
      message: '@@null'
    }
  }

  //check extra resolver error messages
  if (!!extraResolverFn) {
    const extraMessage = extraResolverFn(control);
    if (extraMessage != null) {
      return {
        message: extraMessage,
        skipTranslate: true
      };
    }
  }

  return {
    message: '@@invalid_value'
  }
}
