import {Component, computed, signal} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CalendarMonth} from '../components/calendar-month';
import {CalendarControls} from '../components/calendar-controls';
import {CalendarDate} from '../models/calendar-date';
import {CalendarEvent} from '../models/calendar-event';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {CalendarEventForm} from '../components/calendar-event-form';

@Component({
  selector: 'app-calendar',
  imports: [
    MatToolbar,
    MatIcon,
    MatMiniFabButton,
    CalendarMonth,
    CalendarControls,
    MatSidenavModule,
    CalendarEventForm
  ],
  template: `
    <mat-drawer-container class="h-full" autosize>
      <mat-drawer
        #formDrawer
        mode="over"
        position="start"
        class="!w-9/12"
      >
        <app-calendar-event-form/>
      </mat-drawer>
      <mat-drawer-content>
        <mat-toolbar class="flex justify-between">
          <app-calendar-controls
            [date]="generationDate()"
            (previousClicked)="previousClicked()"
            (nextClicked)="nextClicked()"
            (todayClicked)="todayClicked()"
          />

          <button matMiniFab (click)="addEvent(formDrawer)">
            <mat-icon>add</mat-icon>
          </button>
        </mat-toolbar>
        <app-calendar-month [generatedCalendar]="generatedCalendar()" [daysInWeek]="daysInWeek"/>
      </mat-drawer-content>
    </mat-drawer-container>

  `,
  styles: ``,
})
export default class Calendar {
  readonly daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  readonly currentDate = new Date();

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

      const startTime = this.randomTime(date);
      const endTime = this.randomTime(date);

      const events: CalendarEvent[] = [
        {
          id: 0,
          name: 'Take bins out',
          description: 'This should be some information about the event itself, it can be quite long text',
          startTime: startTime,
          endTime: endTime,
          attendees: ['Kiwi', 'Jojo'],
          travelTime: 25,
          location: 'Kilmarnock'
        }
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

  addEvent(drawer: MatDrawer): void {
    drawer.open().then();
  }

  previousClicked(): void {
    this.generationDate.update(d => {
      const next = new Date(d);
      next.setMonth(d.getMonth() - 1);
      return next;
    });
  }

  nextClicked(): void {
    this.generationDate.update(d => {
      const next = new Date(d);
      next.setMonth(d.getMonth() + 1);
      return next;
    });
  }

  todayClicked(): void {
    this.generationDate.set(this.currentDate);
  }

  randomTime(baseDate: Date = new Date()): Date {
    const date = new Date(baseDate);

    // Random hours (0-23), minutes (0-59), seconds (0-59)
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);

    date.setHours(hours, minutes, seconds, 0);
    return date;
  }
}
