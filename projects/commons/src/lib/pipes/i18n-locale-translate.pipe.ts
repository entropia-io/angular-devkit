import {Inject, Pipe, PipeTransform} from '@angular/core';
import {I18N_LOCALE_MAP, LocaleMap, LocaleTranslations} from '../models';
import {I18nManagerService} from '../services/i18n-manager.service';


@Pipe({
  name: 'i18nLocaleTranslate',
  standalone: true
})
export class I18nLocaleTranslatePipe implements PipeTransform {

  private readonly localeTranslations: LocaleTranslations;

  constructor(@Inject(I18N_LOCALE_MAP) localeMap: LocaleMap, i18nManagerService: I18nManagerService) {
    this.localeTranslations = i18nManagerService.resolveLocaleTranslations(localeMap);
  }

  transform(key: string | null | undefined, ...args: any[]): string {
    if (!!key) {
      if (!this.localeTranslations.hasOwnProperty(key)) {
        return key;
      }
      const str = this.localeTranslations[key];
      if (!!args && args.length > 0) {
        return str.replace(/{}/g, () => args.shift() ?? '');
      }
      return str;
    }
    return '';
  }

}
