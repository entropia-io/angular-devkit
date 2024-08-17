import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as i18nLocaleMap from './i18n-locale-map.json'
import {DragAndDropDirective} from './drag-and-drop.directive';
import {MatListModule} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {DatePipe} from '@angular/common';
import {I18N_LOCALE_MAP, I18nLocaleTranslatePipe} from '@entropia-io/ngx-commons/i18n';
import {BytesPipe} from '@entropia-io/ngx-commons/pipes';

type MaterialFileUploaderValue = File | File[] | null;

@Component({
  selector: 'ngx-material-file-uploader',
  exportAs: 'ngx-material-file-uploader',
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
  private _disabled: boolean | null = null;
  private _accept: string | null = null;

  @Output('onFileChange')
  public readonly onFileChangeEventEmitter: EventEmitter<MaterialFileUploaderValue> = new EventEmitter<MaterialFileUploaderValue>();

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
      this.onFileChangeEventEmitter.emit(this.value);
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
    this.onFileChangeEventEmitter.emit(this.value);
  }

  public disable(): void {
    this._disabled = true;
  }

  public enable(): void {
    this._disabled = false;
  }

  get multiple(): boolean {
    return this._multiple === true;
  }

  get disabled(): boolean {
    return this._disabled === true;
  }

  get accept(): string {
    return this._accept || '';
  }

  get value(): MaterialFileUploaderValue {
    return this.multiple ? [...this.files] : this.files.length > 0 ? this.files[0] : null;
  }

  @Input('multiple') set multiple(multiple: boolean) {
    if (this._multiple == null) {
      this._multiple = multiple;
    }
  }

  @Input('disabled') set disabled(disabled: boolean) {
    this._disabled = disabled;
  }

  @Input('accept') set accept(accept: string) {
    if (this._accept == null) {
      this._accept = accept;
    }
  }
}
