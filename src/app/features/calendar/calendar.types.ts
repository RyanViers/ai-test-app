export type ViewMode = 'week' | 'month' | 'year';
export type EventType = 'meeting' | 'deadline' | 'reminder' | 'task';
export type Priority = 'low' | 'medium' | 'high';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: EventType;
  priority: Priority;
  participants?: string[];
}

export interface CalendarDay {
  date: number;
  fullDate: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  weekDay: string;
  events: CalendarEvent[];
}

export interface MonthData {
  name: string;
  weeks: CalendarDay[][];
  eventCount: number;
}
