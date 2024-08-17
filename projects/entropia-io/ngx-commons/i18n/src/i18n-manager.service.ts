import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {DEFAULT_LANGUAGE_CODE, getLangCodeFromLocaleId, LocaleMap, LocaleTranslations} from './models';

@Injectable({
  providedIn: 'root'
})
export class I18nManagerService {

  private readonly langCode: string;

  constructor(@Inject(LOCALE_ID) localeId: string) {
    this.langCode = getLangCodeFromLocaleId(localeId);
  }

  public resolveLocaleTranslations(localeMap: LocaleMap): LocaleTranslations {
    if (Object.hasOwnProperty.call(localeMap, this.langCode)) {
      return localeMap[this.langCode];
    } else {
      if (!Object.hasOwnProperty.call(localeMap, DEFAULT_LANGUAGE_CODE)) {
        throw new Error('Missing locale translations for default lang code ' + DEFAULT_LANGUAGE_CODE);
      }
      return localeMap[DEFAULT_LANGUAGE_CODE];
    }
  }
}
