export class OverlaySpinnerRef {

  constructor(private readonly hideFn: () => void) {
  }

  public hide(): void {
    this.hideFn();
  }
}
