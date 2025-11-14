import {Component, input} from '@angular/core';
import {CalendarDate} from '../models/calendar-date';
import {CalendarMonthBox} from '../components/calendar-month-box';

@Component({
  selector: 'app-calendar-month',
  imports: [
    CalendarMonthBox
  ],
  template: `
    <div class="grid grid-cols-7 text-right mt-1 divide-x divide-gray-300 divide-y border border-gray-300">
      @for (day of daysInWeek(); track day) {
        <span class="col-span-1 p-2">{{ day }}</span>
      }
      @for (day of generatedCalendar(); track $index) {
        <app-calendar-month-box [day]="day"/>
      }
    </div>
  `,
  styles: ``,
})
export class CalendarMonth {
  generatedCalendar = input.required<(CalendarDate | undefined)[]>();
  daysInWeek = input.required<string[]>();
}
