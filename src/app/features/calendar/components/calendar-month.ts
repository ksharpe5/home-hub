import {Component, computed, input} from '@angular/core';
import {CalendarDate} from '../models/calendar-date';
import {CalendarMonthBox} from './calendar-month-box';

@Component({
  selector: 'app-calendar-month',
  imports: [
    CalendarMonthBox
  ],
  template: `
    <div
      class="grid grid-cols-7 text-right mt-1 divide-x divide-gray-300 divide-y
             border border-gray-300 rounded-2xl overflow-hidden"
      [style.grid-template-rows]="'auto repeat(' + rowCount() + ', minmax(0,1fr)'"
      [style.height]="'calc(100% - 80px)'"
    >
      @for (day of daysInWeek(); track day) {
        <span class="p-2 block bg-blue-100">{{ day }}</span>
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
  rowCount = computed(() => this.generatedCalendar().length / 7);
  daysInWeek = input.required<string[]>();
}
