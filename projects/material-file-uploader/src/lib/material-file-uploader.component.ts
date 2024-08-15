import {Component, Input} from '@angular/core';
import {BytesPipe, I18N_LOCALE_MAP, I18nLocaleTranslatePipe} from '@andresandoval/ngx-commons';
import * as i18nLocaleMap from './i18n-locale-map.json'
import {DragAndDropDirective} from './drag-and-drop.directive';
import {MatListModule} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-material-file-uploader',
  standalone: true,
  imports: [
    DragAndDropDirective,
    I18nLocaleTranslatePipe,
    DatePipe,
    BytesPipe,
    MatListModule,
    MatIcon,
    MatIconButton,
    MatButton,
    MatTooltip
  ],
  templateUrl: 'material-file-uploader.component.html',
  styleUrl: 'material-file-uploader.component.scss',
  providers: [
    {
      provide: I18N_LOCALE_MAP,
      useValue: i18nLocaleMap
    }
  ]
})
export class MaterialFileUploaderComponent {

  public readonly files: File[] = [];

  private _multiple: boolean | null = null;

  public addFiles(files: File[]): void {
    if (!!files && files.length > 0) {
      if (this.multiple) {
        for (let i = 0; i < files.length; i++) {
          this.files.push(files[i]);
        }
      } else {
        if (this.files.length > 0) {
          this.files[0] = files[0];
        } else {
          this.files.push(files[0]);
        }
      }
    }
  }

  public onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files: File[] = [];
      for (let i = 0; i < input.files.length; i++) {
        files.push(input.files[i]);
      }
      this.addFiles(files);
    }
  }

  public deleteFile(index: number): void {
    this.files.splice(index, 1);
  }

  public get multiple(): boolean {
    return this._multiple === true;
  }

  @Input('multiple')
  public set multiple(multiple: boolean) {
    this._multiple = multiple;
  }

  protected readonly i18nLocaleMap = i18nLocaleMap;
}
