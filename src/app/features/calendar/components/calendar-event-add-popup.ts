import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {CalendarDate} from '../models/calendar-date';
import {DatePipe} from '@angular/common';
import {CalendarEventListItem} from './calendar-event-list-item';

@Component({
  selector: 'app-calendar-event-add-popup',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    FormsModule,
    DatePipe,
    CalendarEventListItem
  ],
  template: `
    <h2 mat-dialog-title>{{ day?.date | date:'EEEE, LLLL d' }}</h2>
    <mat-dialog-content>
      <div class="w-full h-full flex flex-col gap-2">
        @for (event of day?.events; track $index) {
            <app-calendar-event-list-item [event]="event"/>
        }
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton>No Thanks</button>
      <button matButton [mat-dialog-close]="close()">Ok</button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class CalendarEventAddPopup {
  day: CalendarDate | undefined = inject(MAT_DIALOG_DATA);

  close(): any {

  }
}
