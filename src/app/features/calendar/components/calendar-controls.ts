import {Component, input, output} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-calendar-controls',
  imports: [
    DatePipe,
    MatButton,
    MatIcon,
    MatIconButton
  ],
  template: `
    <div class="flex gap-4 items-center">
      <button matIconButton (click)="previousClicked.emit()">
        <mat-icon>arrow_back_ios_new</mat-icon>
      </button>
      <span class="min-w-42 text-center">{{ date() | date:'MMMM yyyy' }}</span>
      <button matIconButton (click)="nextClicked.emit()">
        <mat-icon>arrow_forward_ios_new</mat-icon>
      </button>
      <button matButton (click)="todayClicked.emit()">Today</button>
    </div>
  `,
  styles: ``,
})
export class CalendarControls {
  date = input.required<Date>();
  previousClicked = output<void>();
  nextClicked = output<void>();
  todayClicked = output<void>();

}
