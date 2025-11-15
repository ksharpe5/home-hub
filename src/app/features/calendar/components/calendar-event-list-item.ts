import {Component, input} from '@angular/core';
import {CalendarEvent} from '../models/calendar-event';
import {DatePipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-calendar-event-list-item',
  imports: [
    DatePipe,
    MatIconButton,
    MatIcon
  ],
  template: `
    <div class="border border-black p-4 flex flex-col gap-2 rounded-2xl w-100">
      <div class="flex justify-between">
        <div class="flex gap-4 items-center">
          <h1 class="font-bold text-lg">{{ event().name }}</h1>
          @if (event().startTime) {
            <div class="flex font-light">
              <span>
                {{ event().startTime | date:'hh:mm' }}
              </span>
              @if (event().endTime) {
                <span> - {{ event().endTime | date:'hh:mm' }}</span>
              }
            </div>
          }
        </div>
        <div class="flex gap-1">
          <button matIconButton>
            <mat-icon>edit</mat-icon>
          </button>
          <button matIconButton>
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>
      @if (event().description) {
        <span>{{ event().description }}</span>
      }

    </div>
  `,
  styles: ``,
})
export class CalendarEventListItem {
  event = input.required<CalendarEvent>()
}
