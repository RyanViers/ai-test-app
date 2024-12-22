import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  template: `
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Calendar</h2>
      <div class="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        @for (day of days; track day) {
          <div class="bg-white dark:bg-gray-800 p-4 min-h-[100px]">
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">{{day}}</span>
          </div>
        }
      </div>
    </div>
  `
})
export class CalendarComponent {
  days = Array.from({length: 31}, (_, i) => i + 1);
}
