import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Dashboard</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Stats Cards -->
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Total Projects</h3>
          <p class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">24</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Active Tasks</h3>
          <p class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">12</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Team Members</h3>
          <p class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">8</p>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}
