import {Component, computed, signal} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CalendarWeek} from '../components/calendar-week';
import {CalendarMonth} from '../components/calendar-month';
import {CalendarControls} from '../components/calendar-controls';
import {CalendarDate} from '../models/calendar-date';
import {CalendarEvent} from '../models/calendar-event';

@Component({
  selector: 'app-calendar',
  imports: [
    MatToolbar,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon,
    MatMiniFabButton,
    CalendarWeek,
    CalendarMonth,
    CalendarControls
  ],
  template: `
    <mat-toolbar class="flex justify-between">
      <app-calendar-controls
        [date]="generationDate()"
        (previousClicked)="previousClicked()"
        (nextClicked)="nextClicked()"
        (todayClicked)="todayClicked()"
      />

      <mat-button-toggle-group [(value)]="display">
        <mat-button-toggle value="week">Week</mat-button-toggle>
        <mat-button-toggle value="month">Month</mat-button-toggle>
      </mat-button-toggle-group>

      <button matMiniFab (click)="addEventClicked()">
        <mat-icon>add</mat-icon>
      </button>
    </mat-toolbar>

    @if (display == 'week') {
      <app-calendar-week/>
    } @else {
      <app-calendar-month [generatedCalendar]="generatedCalendar()" [daysInWeek]="daysInWeek" />
    }
  `,
  styles: ``,
})
export default class Calendar {
  readonly daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  readonly currentDate = new Date();

  display: 'week' | 'month' = 'month';

  generationDate = signal<Date>(new Date());
  generatedCalendar = computed<(CalendarDate | undefined)[]>(() => {
    const year = this.generationDate().getFullYear();
    const month = this.generationDate().getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstDayOfMonth.getDay(); // Sunday = 0

    const days: (CalendarDate | undefined)[] = [];
    // Fill in blanks before the first day of this month
    for (let i = 0; i < startDay; i++) {
      days.push(undefined);
    }

    // Add days for current month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const isToday =
        date.getFullYear() == this.currentDate.getFullYear() &&
        date.getMonth() == this.currentDate.getMonth() &&
        date.getDate() == this.currentDate.getDate();

      const events: CalendarEvent[] = [
        { name: 'Take bins out', time: 9, duration: 5, description: '' },
        { name: 'Dinner at Troon', time: 17, duration: 90, description: 'At the Lido in Troon' },
        { name: 'Nap Time', time: 20, duration: 45, description: 'On the couch' },
      ];

      days.push({
        day: d,
        date: date,
        events: date.getDate() % 3 == 0 ? events : [],
        isToday: isToday
      });
    }

    // Pad out the rest of the week
    const remainder = days.length % 7;
    if (remainder !== 0) {
      const padCount = 7 - remainder;
      for (let i = 0; i < padCount; i++) {
        days.push(undefined);
      }
    }

    return days;
  });

  addEventClicked(): void {

  }

  previousClicked(): void {
    // This needs to change based on the display value
    // A week should change the week, rather than the month

    this.generationDate.update(d => {
      const next = new Date(d);
      next.setMonth(d.getMonth() - 1);
      return next;
    });
  }

  nextClicked(): void {
    // This needs to change based on the display value
    // A week should change the week, rather than the month

    this.generationDate.update(d => {
      const next = new Date(d);
      next.setMonth(d.getMonth() + 1);
      return next;
    });
  }

  todayClicked(): void {
    this.generationDate.set(this.currentDate);
  }
}
