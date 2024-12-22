import { Component } from '@angular/core';

@Component({
  selector: 'app-realtime-updates-panel',
  standalone: true,
  template: `
    <div class="h-full bg-gray-50 dark:bg-slate-500">
      <!-- Header with translucent overlay -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-xl">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Activity Feed</h2>
      </div>
      <!-- Content area with darker cards -->
      <div class="p-4 overflow-y-auto space-y-4">
        @for (activity of activities; track activity.id) {
          <div class="flex items-center gap-4 p-3 rounded-lg bg-white dark:bg-black/40 shadow-sm">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="activity.icon" />
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{activity.message}}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{activity.time}}</p>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class RealtimeUpdatesPanelComponent {
  activities = [
    {
      id: 1,
      message: 'New team meeting scheduled',
      time: '5 minutes ago',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    },
    // Add more activities as needed
  ];
}
