import {InjectionToken} from '@angular/core';

export const DEFAULT_LANGUAGE_CODE = 'EN';

export type LocaleTranslations = {
  [key: string]: string;
}

export type LocaleMap = {
  [LANGUAGE_CODE: string]: LocaleTranslations
};

export const I18N_LOCALE_MAP: InjectionToken<LocaleMap> = new InjectionToken<LocaleMap>(
  'i18n-locale-map.json Locale map');


export function getLangCodeFromLocaleId(localeId: string): string {
  if (!!localeId) {
    return localeId.split('-')[0].toUpperCase();
  }
  return DEFAULT_LANGUAGE_CODE;
}
