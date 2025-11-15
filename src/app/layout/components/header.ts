import {Component, output, signal} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {DatePipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    DatePipe,
    MatIconButton,
    MatIcon
  ],
  template: `
    <mat-toolbar class="flex gap-4">
      <button matIconButton (click)="menuClicked.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="text-3xl font-bold">{{ currentDate() | date:'EEEE, MMMM d'}}</span>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {
  menuClicked = output<void>();
  readonly currentDate = signal<Date>(new Date());

}
