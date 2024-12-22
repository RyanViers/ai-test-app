import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarHeaderComponent } from './calendar-header.component';
import { ViewMode, CalendarEvent, CalendarDay, MonthData } from './calendar.types';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule, ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Main calendar content -->
    <div class="space-y-6">
      <div class="bg-white dark:bg-gray-800/50 rounded-xl p-6">
        <!-- Calendar navigation -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-6">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ currentMonth() }} {{ currentYear() }}
            </h2>
            <div class="flex gap-1 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
              <button *ngFor="let view of viewModes"
                      (click)="setViewMode(view)"
                      [class]="getViewModeClass(view)">
                {{view}}
              </button>
            </div>
            <div class="flex gap-1">
              <button (click)="previousPeriod()" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button (click)="nextPeriod()" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button (click)="today()" 
                      class="ml-2 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                Today
              </button>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
            <button (click)="addEvent()" 
                    class="bg-indigo-600/80 dark:bg-indigo-500/30 text-white px-4 py-2 rounded-lg 
                           hover:bg-indigo-700 dark:hover:bg-indigo-500/50 transition-all duration-300
                           shadow-lg hover:shadow-indigo-500/50 dark:shadow-indigo-500/30">
              Add Event
            </button>
          </div>
        </div>

        <!-- Calendar views -->
        <div class="mt-6">
          @switch (currentView()) {
            @case ('week') {
              <div class="grid grid-cols-7 gap-px mt-2 bg-gray-200 dark:bg-gray-700/50 rounded-lg overflow-hidden">
                @for (day of weekView(); track day.date) {
                  <div [class]="getDayClasses(day)" 
                       [style.--glow-color]="getEventGlowColor(day)">
                    <div class="sticky top-0 z-10 bg-inherit border-b border-gray-200 dark:border-gray-600/20 p-2">
                      <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {{day.weekDay}}
                      </span>
                      <p [class]="day.isToday ? 
                        'mt-1 text-xl font-semibold text-indigo-600 dark:text-indigo-400' : 
                        'mt-1 text-xl font-semibold text-gray-900 dark:text-white'">
                        {{day.date}}
                      </p>
                    </div>
                    <div class="h-[800px] overflow-y-auto">
                      @for (hour of hours; track hour) {
                        <div class="border-t border-gray-200 dark:border-gray-600/20">
                          <div class="sticky left-0 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                            {{hour}}:00
                          </div>
                          @if (hasEventsForHour(day, hour)) {
                            @for (event of getEventsForHour(day, hour); track event.id) {
                              <div [class]="getEventClass(event)"
                                   class="absolute w-[calc(100%-8px)] mx-1 rounded-lg p-2 cursor-pointer">
                                <p class="font-semibold text-sm">{{event.title}}</p>
                                <p class="text-xs">{{formatTime(event.date)}}</p>
                              </div>
                            }
                          }
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            }
            @case ('month') {
              <div>
                <!-- Weekday Headers -->
                <div class="grid grid-cols-7 gap-px">
                  @for (day of weekDays; track day) {
                    <div class="text-sm font-semibold text-gray-900 dark:text-gray-200 text-center py-2">
                      {{day}}
                    </div>
                  }
                </div>
                <!-- Calendar Grid -->
                <div class="grid grid-cols-7 gap-px mt-2 bg-gray-200 dark:bg-gray-700/50 rounded-lg overflow-hidden">
                  @for (week of monthView(); track week) {
                    @for (day of week; track day.date) {
                      <div [class]="getDayClasses(day)" 
                           [style.--glow-color]="getEventGlowColor(day)">
                        <div class="min-h-[120px] relative p-2">
                          <span [class]="day.isToday ? 
                            'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 dark:bg-indigo-500 font-semibold text-white' : 
                            'text-sm text-gray-500 dark:text-gray-400'">
                            {{day.date}}
                          </span>
                          @if (hasEvents(day)) {
                            <div class="mt-2 space-y-1">
                              @for (event of getVisibleEvents(day); track event.id) {
                                <div [class]="getEventClass(event)" 
                                     class="text-xs rounded-md px-2 py-1 truncate cursor-pointer 
                                           transform transition-transform hover:scale-105">
                                  {{event.title}}
                                </div>
                              }
                              @if (getRemainingEventsCount(day) > 0) {
                                <div class="text-xs text-gray-500 dark:text-gray-400 px-2">
                                  +{{getRemainingEventsCount(day)}} more
                                </div>
                              }
                            </div>
                          }
                        </div>
                      </div>
                    }
                  }
                </div>
              </div>
            }
            @case ('year') {
              <div class="grid grid-cols-4 gap-4">
                @for (month of yearView(); track month.name) {
                  <div class="bg-white dark:bg-gray-800/30 rounded-lg p-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {{month.name}}
                    </h3>
                    <div class="grid grid-cols-7 gap-1 text-center text-xs">
                      @for (week of month.weeks; track week) {
                        @for (day of week; track day.date) {
                          <div [class]="getYearDayClasses(day)">
                            {{day.date}}
                          </div>
                        }
                      }
                    </div>
                    @if (month.eventCount > 0) {
                      <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {{month.eventCount}} events
                      </div>
                    }
                  </div>
                }
              </div>
            }
          }
        </div>
      </div>
    </div>
  `
})
export class CalendarComponent {
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  currentMonth = computed(() => 
    this.currentDate().toLocaleString('default', { month: 'long' })
  );
  
  currentYear = computed(() => 
    this.currentDate().getFullYear().toString()
  );

  currentDate = signal(new Date());

  upcomingEvents = signal<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date('2024-03-20T10:00:00'),
      type: 'meeting',
      priority: 'high',
      participants: ['John Doe', 'Jane Smith', 'Bob Wilson']
    },
    {
      id: '2',
      title: 'Project Deadline',
      date: new Date('2024-03-22T23:59:59'),
      type: 'deadline',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Client Call',
      date: new Date('2024-03-21T15:30:00'),
      type: 'meeting',
      priority: 'medium',
      participants: ['Alice Johnson']
    }
  ]);

  calendarDays = signal([
    // Example data structure for calendar days
    { day: 1, isToday: false, events: [] },
    { day: 2, isToday: false, events: [] },
    // ... generate full month
    { 
      day: 15, 
      isToday: true, 
      events: [
        { id: '1', title: 'Team Meeting', type: 'meeting', priority: 'high' },
        { id: '2', title: 'Project Due', type: 'deadline', priority: 'high' }
      ] 
    },
    // ... rest of month
  ]);

  viewModes: readonly ViewMode[] = ['week', 'month', 'year'];
  currentView = signal<ViewMode>('month');
  hours = Array.from({length: 24}, (_, i) => i);

  setViewMode(mode: ViewMode) {
    this.currentView.set(mode);
  }

  getViewModeClass(mode: ViewMode): string {
    const isActive = this.currentView() === mode;
    return `px-3 py-1 text-sm font-medium rounded-md transition-colors
            ${isActive ? 
              'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow' : 
              'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'}`;
  }

  // Add new helper methods for different views
  weekView(): CalendarDay[] {
    const current = this.currentDate();
    const startOfWeek = new Date(current);
    startOfWeek.setDate(current.getDate() - current.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return {
        date: date.getDate(),
        fullDate: new Date(date),
        isToday: this.isToday(date),
        isCurrentMonth: date.getMonth() === current.getMonth(),
        weekDay: this.weekDays[date.getDay()],
        events: this.getEventsForDate(date)
      };
    });
  }

  monthView(): CalendarDay[][] {
    const current = this.currentDate();
    const firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
    const startDate = new Date(firstDay);
    startDate.setDate(1 - firstDay.getDay());

    const weeks: CalendarDay[][] = [];
    let currentWeek: CalendarDay[] = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      currentWeek.push({
        date: date.getDate(),
        fullDate: new Date(date),
        isToday: this.isToday(date),
        isCurrentMonth: date.getMonth() === current.getMonth(),
        weekDay: this.weekDays[date.getDay()],
        events: this.getEventsForDate(date)
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    return weeks;
  }

  yearView(): MonthData[] {
    const current = this.currentDate();
    return Array.from({ length: 12 }, (_, month) => {
      const date = new Date(current.getFullYear(), month, 1);
      const weeks = this.getMonthWeeks(date);
      return {
        name: date.toLocaleString('default', { month: 'long' }),
        weeks,
        eventCount: this.getEventCountForMonth(month)
      };
    });
  }

  private getMonthWeeks(date: Date): CalendarDay[][] {
    // Similar to monthView but for a specific month
    // Implementation here...
    return [];
  }

  private getEventsForDate(date: Date): CalendarEvent[] {
    return this.upcomingEvents().filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  }

  private getEventCountForMonth(month: number): number {
    return this.upcomingEvents().filter(event => 
      event.date.getMonth() === month
    ).length;
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  previousPeriod() {
    const view = this.currentView();
    this.currentDate.update(date => {
      const newDate = new Date(date);
      switch (view) {
        case 'week':
          newDate.setDate(date.getDate() - 7);
          break;
        case 'month':
          newDate.setMonth(date.getMonth() - 1);
          break;
        case 'year':
          newDate.setFullYear(date.getFullYear() - 1);
          break;
      }
      return newDate;
    });
  }

  nextPeriod() {
    const view = this.currentView();
    this.currentDate.update(date => {
      const newDate = new Date(date);
      switch (view) {
        case 'week':
          newDate.setDate(date.getDate() + 7);
          break;
        case 'month':
          newDate.setMonth(date.getMonth() + 1);
          break;
        case 'year':
          newDate.setFullYear(date.getFullYear() + 1);
          break;
      }
      return newDate;
    });
  }

  addEvent() {
    // TODO: Implement event creation modal/form
    console.log('Add event clicked');
  }

  today() {
    this.currentDate.set(new Date());
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatDateTime(date: Date): string {
    return date.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  getAvatarUrl(name: string): string {
    return `https://ui-avatars.com/api/?name=${name}&background=random`;
  }

  getYearDayClasses(day: any): string {
    return `w-6 h-6 flex items-center justify-center rounded-full text-xs
            ${day.isToday ? 'bg-indigo-600 dark:bg-indigo-500 text-white' : ''}
            ${day.isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}
            ${day.hasEvents ? 'font-bold' : ''}`;
  }

  getMiniDayClass(day: any): string {
    return `w-6 h-6 rounded-full text-sm flex items-center justify-center
            ${day.isToday ? 'bg-indigo-600 dark:bg-indigo-500 text-white' :
            day.isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`;
  }

  getDayClasses(day: CalendarDay): string {
    return computed(() => `min-h-[120px] bg-white dark:bg-gray-800/30 p-2 relative
            hover:bg-gray-50 dark:hover:bg-gray-700/30 
            transition-all duration-300
            ${day.isToday ? 'dark:shadow-[0_0_15px_rgba(var(--glow-color),0.3)]' : ''}
            ${this.hasEvents(day) ? 'dark:shadow-[0_0_10px_rgba(var(--glow-color),0.2)]' : ''}`)();
  }

  getEventClass(event: any): string {
    switch (event.type) {
      case 'meeting':
        return 'bg-blue-100/90 dark:bg-blue-500/30 text-blue-800 dark:text-blue-200';
      case 'deadline':
        return 'bg-red-100/90 dark:bg-red-500/30 text-red-800 dark:text-red-200';
      case 'reminder':
        return 'bg-yellow-100/90 dark:bg-yellow-500/30 text-yellow-800 dark:text-yellow-200';
      case 'task':
        return 'bg-green-100/90 dark:bg-green-500/30 text-green-800 dark:text-green-200';
      default:
        return 'bg-gray-100/90 dark:bg-gray-500/30 text-gray-800 dark:text-gray-200';
    }
  }

  getEventGlowColor(date: any): string {
    if (date.isToday) return '99,102,241'; // indigo
    if (date.events?.length) {
      const event = date.events[0];
      switch (event.type) {
        case 'meeting': return '59,130,246'; // blue
        case 'deadline': return '239,68,68'; // red
        case 'reminder': return '234,179,8'; // yellow
        case 'task': return '34,197,94'; // green
        default: return '107,114,128'; // gray
      }
    }
    return '0,0,0,0';
  }

  getEventTypeClass(type: string): string {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 dark:bg-blue-500/30 text-blue-600 dark:text-blue-200';
      case 'deadline':
        return 'bg-red-100 dark:bg-red-500/30 text-red-600 dark:text-red-200';
      case 'reminder':
        return 'bg-yellow-100 dark:bg-yellow-500/30 text-yellow-600 dark:text-yellow-200';
      case 'task':
        return 'bg-green-100 dark:bg-green-500/30 text-green-600 dark:text-green-200';
      default:
        return 'bg-gray-100 dark:bg-gray-500/30 text-gray-600 dark:text-gray-200';
    }
  }

  getEventTypeIcon(type: string): string {
    switch (type) {
      case 'meeting':
        return 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z';
      case 'deadline':
        return 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'reminder':
        return 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9';
      case 'task':
        return 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4';
      default:
        return 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z';
    }
  }

  previousMonth() {
    this.currentDate.update(date => {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() - 1);
      return newDate;
    });
  }

  nextMonth() {
    this.currentDate.update(date => {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() + 1);
      return newDate;
    });
  }

  miniCalendar(): { date: number; fullDate: Date; isToday: boolean; isCurrentMonth: boolean }[] {
    // Implementation for mini calendar data
    return [];
  }

  selectDate(date: Date) {
    this.currentDate.set(date);
  }

  hasEventsForHour(day: CalendarDay, hour: number): boolean {
    return day.events?.some(event => new Date(event.date).getHours() === hour) ?? false;
  }

  getEventsForHour(day: CalendarDay, hour: number): CalendarEvent[] {
    return day.events?.filter(event => new Date(event.date).getHours() === hour) ?? [];
  }

  // Helper methods for template
  hasEvents(day: CalendarDay): boolean {
    return (day.events?.length ?? 0) > 0;
  }

  getVisibleEvents(day: CalendarDay): CalendarEvent[] {
    return day.events?.slice(0, 3) ?? [];
  }

  getRemainingEventsCount(day: CalendarDay): number {
    return Math.max(0, (day.events?.length ?? 0) - 3);
  }
}
