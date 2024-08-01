import {AbstractControl, ValidatorFn} from '@angular/forms';
import {getLocalizedErrorMessageDefinition, LocalizedErrorMessageDefinition} from './form-error-messages';

function isNumeric(string: string, decimal: boolean): boolean {
  if (!!string) {
    string = string.trim();
  }
  if (decimal) {
    return /^-?\d+(\.\d+)?$/.test(string);
  }
  return /^-?\d+$/.test(string);
}

type SimpleValidatorFn = () => ValidatorFn;

interface ValidatorDeclaration<ValidatorFn> {
  validatorFn: ValidatorFn;
  checkFn: (control: AbstractControl) => boolean;
  errorMessageFn: (control: AbstractControl, messageDefinition: LocalizedErrorMessageDefinition) => string;
}

interface ValidatorsDefinition {
  numeric: ValidatorDeclaration<SimpleValidatorFn>,
  integerNumber: ValidatorDeclaration<SimpleValidatorFn>,
  decimalNumber: ValidatorDeclaration<(precision?: number) => ValidatorFn>,
  collection: ValidatorDeclaration<(options: { minSize?: number, maxSize?: number }) => ValidatorFn>,
  notEmpty: ValidatorDeclaration<SimpleValidatorFn>,
  notNull: ValidatorDeclaration<SimpleValidatorFn>
}

const VALIDATORS_DEFINITION: ValidatorsDefinition = {
  numeric: {
    validatorFn: () => {
      return (control: AbstractControl): { [key: string]: any } | null => {
        if (!!control && !!control.value && !isNumeric(control.value, true)) {
          return {'numeric': true};
        }
        return null;
      };
    },
    checkFn: (control: AbstractControl) => control && control.hasError('numeric'),
    errorMessageFn: (control: AbstractControl, messageDefinition: LocalizedErrorMessageDefinition) => {
      return messageDefinition.numeric();
    }
  },
  integerNumber: {
    validatorFn: () => {
      return (control: AbstractControl): { [key: string]: any } | null => {
        if (!!control && !!control.value && !isNumeric(control.value, false)) {
          return {'numeric_integer': true};
        }
        return null;
      };
    },
    checkFn: (control: AbstractControl) => control && control.hasError('numeric_integer'),
    errorMessageFn(control: AbstractControl, messageDefinition: LocalizedErrorMessageDefinition) {
      return messageDefinition.numericInteger();
    }
  },
  decimalNumber: {
    validatorFn: (precision?: number) => {
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
    },
    checkFn: (control: AbstractControl) => control && control.hasError('numeric_decimal'),
    errorMessageFn(control: AbstractControl, messageDefinition: LocalizedErrorMessageDefinition) {
      const error: { expectedPrecision?: number } = control.getError('numeric_decimal');
      if (!!error.expectedPrecision) {
        return messageDefinition.numericDecimalWithExpectedPrecision(error.expectedPrecision);
      }
      return messageDefinition.numericDecimal();
    }
  },
  collection: {
    validatorFn: (options: { minSize?: number, maxSize?: number }) => {
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
    },
    checkFn: (control: AbstractControl) => control && control.hasError('collection'),
    errorMessageFn(control: AbstractControl, messageDefinition: LocalizedErrorMessageDefinition) {
      const error: { expectedMinSize?: number, expectedMaxSize?: number } = control.getError('collection');
      if (!!error && !!error.expectedMinSize) {
        return messageDefinition.collectionWithExpectedMinSize(error.expectedMinSize);
      }
      if (!!error && !!error.expectedMaxSize) {
        return messageDefinition.collectionWithExpectedMaxSize(error.expectedMaxSize);
      }
      return messageDefinition.collection();

    }
  },
  notEmpty: {
    validatorFn: () => {
      return (control: AbstractControl): { [key: string]: any } | null => {
        if (!!control && !!control.value && control.value.length < 1) {
          return {'empty': true};
        }
        return null;
      };
    },
    checkFn: (control: AbstractControl) => control && control.hasError('empty'),
    errorMessageFn(control: AbstractControl, messageDefinition: LocalizedErrorMessageDefinition) {
      return messageDefinition.empty();
    }
  },
  notNull: {
    validatorFn: () => {
      return (control: AbstractControl): { [key: string]: any } | null => {
        if (!!control && !!control.value) {
          return null;

        }
        return {'requiredNotNull': true};
      };
    },
    checkFn: (control: AbstractControl) => control && control.hasError('requiredNotNull'),
    errorMessageFn(control: AbstractControl, messageDefinition: LocalizedErrorMessageDefinition) {
      return messageDefinition.required();
    }
  }
}

export namespace NgxValidators {

  export const numeric = VALIDATORS_DEFINITION.numeric.validatorFn();

  export const integerNumber = VALIDATORS_DEFINITION.integerNumber.validatorFn();

  export const decimalNumber = (precision?: number) => VALIDATORS_DEFINITION.decimalNumber.validatorFn(precision);

  export const collection = (options: {
    minSize?: number,
    maxSize?: number
  }) => VALIDATORS_DEFINITION.collection.validatorFn(options);

  export const notEmpty = VALIDATORS_DEFINITION.notEmpty.validatorFn();

  export const notNull = VALIDATORS_DEFINITION.notNull.validatorFn();
}

export function getLocalizedControlErrorMessage(
  control: AbstractControl, localeId: string, extraResolverFn?: (control: AbstractControl) => string | null): string {

  if (control == null || control.valid) {
    return '';
  }
  const messageDefinition = getLocalizedErrorMessageDefinition(localeId);

  // native angular errors
  if (control.hasError('min')) {
    const min = control.getError('min').min;
    return messageDefinition.min(min);
  }
  if (control.hasError('max')) {
    const max = control.getError('max').max;
    return messageDefinition.max(max);
  }
  if (control.hasError('minlength')) {
    const minlength = control.getError('minlength').requiredLength;
    return messageDefinition.minlength(minlength);
  }
  if (control.hasError('maxlength')) {
    const maxlength = control.getError('maxlength').requiredLength;
    return messageDefinition.maxlength(maxlength);
  }
  if (control.hasError('pattern')) {
    const pattern = control.getError('pattern').requiredPattern;
    return messageDefinition.pattern(pattern);
  }
  if (control.hasError('email')) {
    return messageDefinition.email();
  }
  if (control.hasError('required')) {
    return messageDefinition.required();
  }

  // custom validation errors
  if (VALIDATORS_DEFINITION.numeric.checkFn(control)) {
    return VALIDATORS_DEFINITION.numeric.errorMessageFn(control, messageDefinition);
  }
  if (VALIDATORS_DEFINITION.integerNumber.checkFn(control)) {
    return VALIDATORS_DEFINITION.integerNumber.errorMessageFn(control, messageDefinition);
  }
  if (VALIDATORS_DEFINITION.decimalNumber.checkFn(control)) {
    return VALIDATORS_DEFINITION.decimalNumber.errorMessageFn(control, messageDefinition);
  }
  if (VALIDATORS_DEFINITION.collection.checkFn(control)) {
    return VALIDATORS_DEFINITION.collection.errorMessageFn(control, messageDefinition);
  }
  if (VALIDATORS_DEFINITION.notEmpty.checkFn(control)) {
    return VALIDATORS_DEFINITION.notEmpty.errorMessageFn(control, messageDefinition);
  }
  if (VALIDATORS_DEFINITION.notNull.checkFn(control)) {
    return VALIDATORS_DEFINITION.notNull.errorMessageFn(control, messageDefinition);
  }

  //check extra resolver error messages
  if (!!extraResolverFn) {
    const extraMessage = extraResolverFn(control);
    if (extraMessage != null) {
      return extraMessage;
    }
  }
  return messageDefinition.default();
}
