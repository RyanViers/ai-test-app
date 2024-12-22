import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  standalone: true,
  template: `
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Reports</h2>
      <div class="space-y-6">
        @for (report of reports; track report.id) {
          <div class="border dark:border-gray-700 rounded-lg p-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{report.title}}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{report.description}}</p>
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{report.date}}</span>
            </div>
            <div class="mt-4 flex space-x-2">
              <button class="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full text-sm">
                View Report
              </button>
              <button class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                Download PDF
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ReportsComponent {
  reports = [
    {
      id: 1,
      title: 'Q1 Performance Report',
      description: 'Quarterly performance metrics and analysis',
      date: 'Mar 31, 2024'
    },
    {
      id: 2,
      title: 'User Analytics',
      description: 'Monthly user engagement and behavior analysis',
      date: 'Mar 15, 2024'
    },
    {
      id: 3,
      title: 'Financial Summary',
      description: 'Monthly financial report and projections',
      date: 'Mar 1, 2024'
    }
  ];
}
