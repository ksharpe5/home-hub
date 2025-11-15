import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {CalendarDate} from '../models/calendar-date';

@Component({
  selector: 'app-calendar-month-box',
  imports: [
    NgClass
  ],
  template: `
    <div class="flex flex-col h-full p-1">
      <span
        class="self-end w-6 h-6 flex items-center justify-center text-sm mb-1"
        [ngClass]="{ 'bg-red-500 text-white rounded-full': day()?.isToday }"
      >
        {{ day()?.day }}
      </span>

      <!-- Scrollable events -->
      <div class="flex-1 flex flex-col gap-1 overflow-y-auto">
        @for (event of day()?.events; track $index) {
          <span class="bg-red-100 w-full rounded-full px-2 text-xs text-left">{{ event.name }}</span>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class CalendarMonthBox {
  day = input.required<CalendarDate | undefined>();
}
