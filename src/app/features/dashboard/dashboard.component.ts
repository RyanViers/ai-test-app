import { Component, signal } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: string;
}

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
  type: string;
}

@Component({
  template: `
    <div class="space-y-6">
      <!-- Welcome Section -->
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Tom</h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Here's what's happening with your projects today.</p>
        </div>
        <div class="flex gap-3">
          <button class="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <span>This Week</span>
          </button>
          <button class="bg-indigo-600 dark:bg-indigo-500 px-4 py-2 rounded-lg text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (stat of stats(); track stat.title) {
          <div class="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{stat.title}}</p>
                <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{{stat.value}}</p>
              </div>
              <div class="p-3 rounded-lg" [class]="getStatIconClass(stat.title)">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="stat.icon"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 flex items-center">
              <div [class]="stat.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'" class="flex items-center text-sm font-medium">
                <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="stat.change >= 0 ? 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941' : 'M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l5.94-2.28m-5.94 2.28l-2.28 5.941'"/>
                </svg>
                {{Math.abs(stat.change)}}% from last month
              </div>
            </div>
          </div>
        }
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Chart Section -->
        <div class="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h2>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1">
                <div class="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span class="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-3 h-3 rounded-full bg-cyan-500"></div>
                <span class="text-sm text-gray-600 dark:text-gray-400">Expenses</span>
              </div>
            </div>
          </div>
          <div class="h-80 w-full">
            <!-- Chart placeholder - You would integrate a real chart library here -->
            <div class="w-full h-full bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center">
              <p class="text-gray-500 dark:text-gray-400">Chart Component Here</p>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div class="space-y-4">
            @for (item of recentActivity(); track item.id) {
              <div class="flex items-start gap-4">
                <img [src]="item.avatar" [alt]="item.user" class="w-8 h-8 rounded-full">
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-900 dark:text-white">
                    <span class="font-medium">{{item.user}}</span>
                    <span class="text-gray-600 dark:text-gray-400"> {{item.action}} </span>
                    <span class="font-medium">{{item.target}}</span>
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{item.time}}</p>
                </div>
                <div class="rounded-full p-1" [class]="getActivityTypeClass(item.type)">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="getActivityTypeIcon(item.type)"/>
                  </svg>
                </div>
              </div>
            }
          </div>
          <button class="mt-4 w-full text-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
            View all activity
          </button>
        </div>
      </div>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (project of activeProjects(); track project.id) {
          <div class="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-2 h-2 rounded-full mr-2" [class]="getProjectStatusColor(project.status)"></div>
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white">{{project.name}}</h3>
              </div>
              <button class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{project.description}}</p>
            <div class="flex items-center justify-between">
              <div class="flex -space-x-2">
                @for (member of project.team; track member) {
                  <img [src]="member.avatar" 
                       [alt]="member.name"
                       [title]="member.name"
                       class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800">
                }
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{project.dueDate}}</span>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div class="h-1.5 rounded-full" 
                       [style.width.%]="project.progress"
                       [class]="getProgressColor(project.progress)"></div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})

export class DashboardComponent {
  Math = Math; // Make Math available in template

  stats = signal<StatCard[]>([
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: 20.1,
      icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
    },
    {
      title: 'Active Projects',
      value: '12',
      change: -2.5,
      icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z'
    },
    {
      title: 'Team Members',
      value: '24',
      change: 12.5,
      icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
    },
    {
      title: 'Completion Rate',
      value: '92.6%',
      change: 4.2,
      icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ]);

  recentActivity = signal<ActivityItem[]>([
    {
      id: '1',
      user: 'Alice',
      action: 'commented on',
      target: 'Issue #123',
      time: '2 hours ago',
      avatar: 'https://via.placeholder.com/150',
      type: 'comment'
    },
    {
      id: '2',
      user: 'Bob',
      action: 'closed',
      target: 'Pull Request #456',
      time: '4 hours ago',
      avatar: 'https://via.placeholder.com/150',
      type: 'pull_request'
    },
    {
      id: '3',
      user: 'Charlie',
      action: 'deployed',
      target: 'version 1.2.3',
      time: '6 hours ago',
      avatar: 'https://via.placeholder.com/150',
      type: 'deployment'
    }
  ]);

  activeProjects = signal([
    {
      id: '1',
      name: 'Project Alpha',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'active',
      dueDate: '2023-12-31',
      progress: 75,
      team: [
        { name: 'Alice', avatar: 'https://via.placeholder.com/150' },
        { name: 'Bob', avatar: 'https://via.placeholder.com/150' }
      ]
    },
    {
      id: '2',
      name: 'Project Beta',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: 'active',
      dueDate: '2023-11-30',
      progress: 50,
      team: [
        { name: 'Charlie', avatar: 'https://via.placeholder.com/150' },
        { name: 'Dave', avatar: 'https://via.placeholder.com/150' }
      ]
    }
  ]);

  getStatIconClass(title: string): string {
    switch (title) {
      case 'Total Revenue':
        return 'bg-green-100 text-green-600';
      case 'Active Projects':
        return 'bg-yellow-100 text-yellow-600';
      case 'Team Members':
        return 'bg-blue-100 text-blue-600';
      case 'Completion Rate':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  getActivityTypeClass(type: string): string {
    switch (type) {
      case 'comment':
        return 'bg-blue-100 text-blue-600';
      case 'commit':
        return 'bg-green-100 text-green-600';
      case 'issue':
        return 'bg-red-100 text-red-600';
      case 'pull_request':
        return 'bg-purple-100 text-purple-600';
      case 'deployment':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  getActivityTypeIcon(type: string): string {
    switch (type) {
      case 'comment':
        return 'M3 10h12M9 6h6m-6 8h6';
      case 'commit':
        return 'M12 8v8m-4-4h8';
      case 'issue':
        return 'M12 8v4m0 4h.01';
      case 'pull_request':
        return 'M6 3v12m6-6h6m-6 6h6';
      case 'deployment':
        return 'M3 10h12M9 6h6m-6 8h6';
      default:
        return 'M3 10h12M9 6h6m-6 8h6';
    }
  }

  getProjectStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  }

  getProgressColor(progress: number): string {
    if (progress >= 75) {
      return 'bg-green-500';
    } else if (progress >= 50) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  }
}
