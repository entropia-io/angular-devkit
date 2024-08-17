import {Component, inject} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AsyncPipe, registerLocaleData} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';


interface MenuEntry {
  label: string;
  path: string;
}

const MENU_ENTRIES: MenuEntry[] = [
  {
    label: 'Overlay Spinner',
    path: 'overlay-spinner'
  }, {
    label: 'Form Utils',
    path: 'form-utils'
  },
  {
    label: 'Material File Uploader',
    path: 'material-file-uploader'
  }
];

@Component({
  selector: 'asm-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ]
})
export class AppComponent {
  private breakpointObserver = inject(BreakpointObserver);
  public readonly menuEntries: MenuEntry [] = MENU_ENTRIES
    .sort((a, b) => a.label.localeCompare(b.label));

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor() {
    registerLocaleData(localeEs);
    registerLocaleData(localeFr);
  }
}
