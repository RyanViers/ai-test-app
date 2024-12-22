import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  template: `
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">You have {{activeProjects}} active projects</p>
        </div>
        <div class="flex gap-3">
          <div class="relative">
            <select class="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 border-0">
              <option>All Projects</option>
              <option>Active</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <button class="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Project
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        @for (project of projects; track project.id) {
          <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{project.name}}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{project.description}}</p>
              </div>
              <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" 
                [class]="getStatusClass(project.status)">
                {{project.status}}
              </span>
            </div>
            
            <div class="mt-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{project.progress}}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div class="bg-indigo-600 dark:bg-indigo-500 rounded-full h-2" 
                     [style.width]="project.progress + '%'"></div>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <div class="flex -space-x-2">
                @for (member of project.team; track member) {
                  <img [src]="member.avatar" 
                       [alt]="member.name"
                       class="w-7 h-7 rounded-full border-2 border-white dark:border-gray-700"
                       [title]="member.name">
                }
              </div>
              <div class="flex gap-2">
                <button class="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
                <button class="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ProjectsComponent {
  projects = [
    { 
      id: 1, 
      name: 'Website Redesign', 
      description: 'Redesigning the company website with modern UI/UX',
      status: 'Active',
      progress: 75,
      team: [
        { name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
        { name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
      ]
    },
    { 
      id: 2, 
      name: 'Mobile App Development', 
      description: 'Creating a new mobile app for customers',
      status: 'In Progress',
      progress: 45,
      team: [
        { name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
        { name: 'Sarah Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
        { name: 'Tom Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom' },
      ]
    },
    { 
      id: 3, 
      name: 'API Integration', 
      description: 'Integrating third-party APIs into the platform',
      status: 'Completed',
      progress: 100,
      team: [
        { name: 'Alex Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
      ]
    },
    { 
      id: 4, 
      name: 'Database Migration', 
      description: 'Migrating data to new cloud infrastructure',
      status: 'Active',
      progress: 30,
      team: [
        { name: 'Lisa Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
        { name: 'David Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
      ]
    },
  ];

  get activeProjects() {
    return this.projects.filter(p => p.status === 'Active').length;
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Active':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100';
      case 'In Progress':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100';
      case 'Completed':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100';
    }
  }
}
