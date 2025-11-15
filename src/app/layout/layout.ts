import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {Header} from './components/header';
import {Sidebar} from './components/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    Header,
    Sidebar,
    RouterOutlet
],
  template: `
    <mat-sidenav-container class="h-screen w-screen overflow-hidden">
      <mat-sidenav mode="side" opened>
        <app-sidebar />
      </mat-sidenav>

      <mat-sidenav-content class="flex flex-col h-full overflow-hidden">
        <app-header />

        <div class="grow overflow-auto px-4">
          <router-outlet />
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export class Layout {

}
