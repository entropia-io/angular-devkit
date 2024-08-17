import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {OverlaySpinnerRef, OverlaySpinnerService} from '@entropia-io/ngx-overlay-spinner';

@Component({
  selector: 'asm-overlay-spinner',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './overlay-spinner.component.html',
  styleUrl: './overlay-spinner.component.scss'
})
export class OverlaySpinnerComponent {

  private readonly overlaySpinnerService: OverlaySpinnerService = inject(OverlaySpinnerService);

  showSpinner(): void {
    const ref: OverlaySpinnerRef = this.overlaySpinnerService.show();
    setTimeout(() => ref.hide(), 5000);
  }

}
