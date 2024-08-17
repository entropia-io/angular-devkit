import {Component} from '@angular/core';
import {
  MaterialFileUploaderComponent as NgxMaterialFileUploaderComponent
} from '@entropia-io/ngx-material-file-uploader';

@Component({
  selector: 'asm-material-file-uploader',
  standalone: true,
  imports: [
    NgxMaterialFileUploaderComponent
  ],
  templateUrl: './material-file-uploader.component.html',
  styleUrl: './material-file-uploader.component.scss'
})
export class MaterialFileUploaderComponent {

}
