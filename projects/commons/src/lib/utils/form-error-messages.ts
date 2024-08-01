export interface LocalizedErrorMessageDefinition {
  min: (min: string) => string
  max: (max: string) => string
  minlength: (minlength: number) => string
  maxlength: (maxlength: number) => string
  pattern: (pattern: string) => string
  email: () => string
  required: () => string
  numeric: () => string
  numericInteger: () => string
  numericDecimalWithExpectedPrecision: (expectedPrecision: number) => string
  numericDecimal: () => string
  collectionWithExpectedMinSize: (expectedMinSize: number) => string
  collectionWithExpectedMaxSize: (expectedMaxSize: number) => string
  collection: () => string
  empty: () => string
  default: () => string
}

const EN_ERRORS: LocalizedErrorMessageDefinition = {
  min: (min: string) => `Value must be greater or equals than ${min}:`,
  max: (max: string) => `Value must not be greater than  ${max}`,
  minlength: (minlength: number) => `Value must have at least ${minlength} characters`,
  maxlength: (maxlength: number) => `Value must not have more than ${maxlength}characters`,
  pattern: (pattern: string) => `Value must follow the character pattern '${pattern}:pattern:'`,
  email: () => `Value must be a valid email address`,
  required: () => `Value is required`,
  numeric: () => `Value must be numeric`,
  numericInteger: () => `Value must be a numeric integer`,
  numericDecimalWithExpectedPrecision: (expectedPrecision: number) => `Value must not have more than ${expectedPrecision} decimals`,
  numericDecimal: () => `Value must be numeric`,
  collectionWithExpectedMinSize: (expectedMinSize: number) => `At least ${expectedMinSize} elements are required`,
  collectionWithExpectedMaxSize: (expectedMaxSize: number) => `No more than ${expectedMaxSize} elements are required`,
  collection: () => `A collection is required`,
  empty: () => `Value must not be empty`,
  default: () => `Invalid value`
};

const ES_ERRORS: LocalizedErrorMessageDefinition = {
  min: (min: string) => `El valor debe ser mayor o igual a ${min}:`,
  max: (max: string) => `El valor no debe ser mayor a ${max}`,
  minlength: (minlength: number) => `El valor debe tener al menos ${minlength} caracteres`,
  maxlength: (maxlength: number) => `El valor no debe tener más de ${maxlength} caracteres`,
  pattern: (pattern: string) => `El valor debe seguir el patrón de caracteres '${pattern}'`,
  email: () => `El valor debe ser una dirección de correo electrónico válida`,
  required: () => `El valor es requerido`,
  numeric: () => `El valor debe ser numérico`,
  numericInteger: () => `El valor debe ser un entero numérico`,
  numericDecimalWithExpectedPrecision: (expectedPrecision: number) => `El valor no debe tener más de ${expectedPrecision} decimales`,
  numericDecimal: () => `El valor debe ser numérico`,
  collectionWithExpectedMinSize: (expectedMinSize: number) => `Se requieren al menos ${expectedMinSize} elementos`,
  collectionWithExpectedMaxSize: (expectedMaxSize: number) => `No se deben requerir más de ${expectedMaxSize} elementos`,
  collection: () => `Se requiere una colección`,
  empty: () => `El valor no debe estar vacío`,
  default: () => `Valor inválido`
};

const FR_ERRORS: LocalizedErrorMessageDefinition = {
  min: (min: string) => `La valeur doit être supérieure ou égale à ${min}:`,
  max: (max: string) => `La valeur ne doit pas être supérieure à ${max}`,
  minlength: (minlength: number) => `La valeur doit comporter au moins ${minlength} caractères`,
  maxlength: (maxlength: number) => `La valeur ne doit pas comporter plus de ${maxlength} caractères`,
  pattern: (pattern: string) => `La valeur doit suivre le modèle de caractères '${pattern}'`,
  email: () => `La valeur doit être une adresse email valide`,
  required: () => `La valeur est requise`,
  numeric: () => `La valeur doit être numérique`,
  numericInteger: () => `La valeur doit être un entier numérique`,
  numericDecimalWithExpectedPrecision: (expectedPrecision: number) => `La valeur ne doit pas avoir plus de ${expectedPrecision} décimales`,
  numericDecimal: () => `La valeur doit être numérique`,
  collectionWithExpectedMinSize: (expectedMinSize: number) => `Au moins ${expectedMinSize} éléments sont requis`,
  collectionWithExpectedMaxSize: (expectedMaxSize: number) => `Pas plus de ${expectedMaxSize} éléments sont requis`,
  collection: () => `Une collection est requise`,
  empty: () => `La valeur ne doit pas être vide`,
  default: () => `Valeur invalide`
};

const ERRORS: { [langCode: string]: LocalizedErrorMessageDefinition } = {
  'EN': EN_ERRORS,
  'ES': ES_ERRORS,
  'FR': FR_ERRORS
}

export function getLocalizedErrorMessageDefinition(localeId: string): LocalizedErrorMessageDefinition {
  const langCode = localeId.split('-')[0].toUpperCase();
  if (ERRORS.hasOwnProperty(langCode)) {
    return ERRORS[langCode];
  } else {
    return ERRORS['EN'];
  }
}

