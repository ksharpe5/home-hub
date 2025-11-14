import {Component, signal} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    DatePipe
  ],
  template: `
    <mat-toolbar>
        <span class="text-3xl font-bold">{{ currentDate() | date:'EEEE, MMMM d'}}</span>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {

  readonly currentDate = signal<Date>(new Date());

}
