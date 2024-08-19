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
  public timeout: number = 3;
  public showingOverlay: boolean = false;
  public remainingTime: number = this.timeout;

  showSpinner(): void {
    const ref: OverlaySpinnerRef = this.overlaySpinnerService.show();
    this.showingOverlay = true;
    this.remainingTime = this.timeout;
    const interval = setInterval(() => {
      this.remainingTime -= 1;
      if (this.remainingTime <= 0) {
        clearInterval(interval);
        this.showingOverlay = false;
        ref.hide();
      }
    }, 1000);
  }

}
