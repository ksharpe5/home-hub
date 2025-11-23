import {Component, inject, input} from '@angular/core';
import {CalendarEvent} from '../models/calendar-event';
import {DatePipe} from '@angular/common';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {CalendarBottomSheet} from './calendar-bottom-sheet';

@Component({
  selector: 'app-calendar-event-list-item',
  imports: [
    DatePipe,
    MatBottomSheetModule
  ],
  template: `
    <div class="bg-red-100 rounded-2xl p-4 flex flex-col gap-2" (click)="openDeleteSheet()">
      <div class="flex justify-between">
        <h1 class="font-bold">{{ event().name }}</h1>
        <div class="text-sm font-light">
          @if (event().startTime) {
            <span>{{ event().startTime | date:'hh:mm' }}</span>
          }
          @if (event().endTime) {
            <span> - {{ event().endTime | date:'hh:mm' }}</span>
          }
        </div>
      </div>
      <div class="flex justify-between">
        <span>{{ event().attendees?.join(', ') }}</span>
        <div class="text-sm font-light">
          @if (event().location) {
            <div class="flex gap-1">
              <span>{{ event().location }}</span>
              @if (event().travelTime) {
                <span>- {{ event().travelTime }} mins</span>
              }
            </div>
          }
        </div>
      </div>
      <p>{{ event().description }}</p>
    </div>
  `,
  styles: ``,
})
export class CalendarEventListItem {
  event = input.required<CalendarEvent>()
  bottomSheet = inject(MatBottomSheet);

  openDeleteSheet() {
    const sheetRef = this.bottomSheet.open(CalendarBottomSheet, { autoFocus: false });
    sheetRef.afterDismissed().subscribe(res => {
      console.log(res);
    });
  }
}
