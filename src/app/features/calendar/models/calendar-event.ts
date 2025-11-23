export type CalendarEvent = {
  id: number,
  name: string,
  startTime?: Date,
  endTime?: Date,
  description?: string
  travelTime?: number
  location?: string,
  attendees?: string[]
}
