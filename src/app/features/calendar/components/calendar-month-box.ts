import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {CalendarDate} from '../models/calendar-date';

@Component({
  selector: 'app-calendar-month-box',
  imports: [
    NgClass
  ],
  template: `
    <div class="flex flex-col p-0.75 min-h-25 max-h-25">
      <span
        class="self-end w-6 h-6 flex items-center justify-center text-sm"
        [ngClass]="{ 'bg-red-500 text-white rounded-full': day()?.isToday }"
      >
        {{ day()?.day }}
      </span>

      <div class="flex flex-col items-start text-left gap-1 overflow-x-auto">
        @for (event of day()?.events; track $index) {
          <span class="bg-red-100 w-full rounded-full px-2 text-xs">{{ event.name }}</span>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class CalendarMonthBox {
  day = input.required<CalendarDate | undefined>();
}
