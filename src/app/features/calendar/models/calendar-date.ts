import {CalendarEvent} from './calendar-event';

export type CalendarDate = {
  date: Date;
  day: number;
  events: CalendarEvent[];
  isToday: boolean;
}
