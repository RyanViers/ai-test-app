import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMode } from './calendar.types';

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Calendar</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Plan your schedule and meetings
        </p>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex gap-1 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
          <button *ngFor="let view of viewModes"
                  (click)="onViewChange(view)"
                  [class]="getViewModeClass(view, currentView)">
            {{view}}
          </button>
        </div>
        <button (click)="onAddEvent.emit()" 
                class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Add Event
        </button>
      </div>
    </div>
  `
})
export class CalendarHeaderComponent {
  @Input() currentView!: ViewMode;
  @Input() viewModes: ViewMode[] = ['week', 'month', 'year'];
  @Output() viewChange = new EventEmitter<ViewMode>();
  @Output() onAddEvent = new EventEmitter<void>();

  onViewChange(view: ViewMode) {
    this.viewChange.emit(view);
  }

  getViewModeClass(mode: ViewMode, currentView: ViewMode): string {
    const isActive = currentView === mode;
    return `px-3 py-1 text-sm font-medium rounded-md transition-colors
            ${isActive ? 
              'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow' : 
              'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'}`;
  }
}
