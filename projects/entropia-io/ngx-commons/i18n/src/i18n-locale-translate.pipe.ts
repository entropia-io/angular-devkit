import {Inject, Pipe, PipeTransform} from '@angular/core';
import {I18nManagerService} from './i18n-manager.service';
import {formatString} from '@entropia-io/commons-js/utils/string-utils';
import {I18N_LOCALE_MAP, LocaleMap, LocaleTranslations} from './models';


@Pipe({
  name: 'i18nLocaleTranslate',
  standalone: true
})
export class I18nLocaleTranslatePipe implements PipeTransform {

  private readonly localeTranslations: LocaleTranslations;

  constructor(@Inject(I18N_LOCALE_MAP) localeMap: LocaleMap, i18nManagerService: I18nManagerService) {
    this.localeTranslations = i18nManagerService.resolveLocaleTranslations(localeMap);
  }

  transform(key: string | null | undefined, params?: object): string {
    if (!!key) {
      if (!this.localeTranslations.hasOwnProperty(key)) {
        return key;
      }
      const str = this.localeTranslations[key];
      if (!!params) {
        return formatString(str, params);
      }
      return str;
    }
    return '';
  }

}
