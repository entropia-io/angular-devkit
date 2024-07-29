import {Inject, Injectable, RendererFactory2} from '@angular/core';
import {OverlaySpinnerRef} from './overlay-spinner-ref';
import {DOCUMENT} from '@angular/common';

const spinner: string = `
<div class="spinner">
  <svg fill="#3f51b5" height="69px" width="69px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
     viewBox="-48.97 -48.97 587.64 587.64" xml:space="preserve"
     stroke="#3f51b5" stroke-width="23.995202" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
       stroke-width="12.732147999999999"></g>
    <g id="SVGRepo_iconCarrier"> <g> <g> <path
      d="M468.999,227.774c-11.4,0-20.8,8.3-20.8,19.8c-1,74.9-44.2,142.6-110.3,178.9c-99.6,54.7-216,5.6-260.6-61l62.9,13.1 c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-123.7-26c-7.2-1.7-26.1,3.5-23.9,22.9l15.6,124.8 c1,10.4,9.4,17.7,19.8,17.7c15.5,0,21.8-11.4,20.8-22.9l-7.3-60.9c101.1,121.3,229.4,104.4,306.8,69.3 c80.1-42.7,131.1-124.8,132.1-215.4C488.799,237.174,480.399,227.774,468.999,227.774z"></path>
      <path
        d="M20.599,261.874c11.4,0,20.8-8.3,20.8-19.8c1-74.9,44.2-142.6,110.3-178.9c99.6-54.7,216-5.6,260.6,61l-62.9-13.1 c-10.4-2.1-21.8,4.2-23.9,15.6c-2.1,10.4,4.2,21.8,15.6,23.9l123.8,26c7.2,1.7,26.1-3.5,23.9-22.9l-15.6-124.8 c-1-10.4-9.4-17.7-19.8-17.7c-15.5,0-21.8,11.4-20.8,22.9l7.2,60.9c-101.1-121.2-229.4-104.4-306.8-69.2 c-80.1,42.6-131.1,124.8-132.2,215.3C0.799,252.574,9.199,261.874,20.599,261.874z"></path> </g> </g> </g>
  </svg>
 </div>
`;

@Injectable({
  providedIn: 'root'
})
export class OverlaySpinnerService {

  private readonly bodyClassName: string = 'show-overlay-spinner';
  private readonly containerClassName: string = 'overlay-spinner-container';

  constructor(
    @Inject(DOCUMENT) private readonly document: Document, private readonly rendererFactory: RendererFactory2) {

  }

  public show(): OverlaySpinnerRef {
    this.checkIfSpinnerExists();
    if (!this.document.body.classList.contains(this.bodyClassName)) {
      this.document.body.classList.add(this.bodyClassName);
    }
    return new OverlaySpinnerRef(() => this.hide());
  }

  public hide(): void {
    if (this.document.body.classList.contains(this.bodyClassName)) {
      this.document.body.classList.remove(this.bodyClassName);
    }
  }

  private checkIfSpinnerExists(): void {
    const element = this.document.querySelector(`body .${this.containerClassName}`);
    if (!element) {
      const renderer = this.rendererFactory.createRenderer(null, null);

      const containerDiv = renderer.createElement('div');
      renderer.addClass(containerDiv, this.containerClassName);
      renderer.setProperty(containerDiv, 'innerHTML', spinner);
      renderer.appendChild(this.document.body, containerDiv);
    }
  }
}
