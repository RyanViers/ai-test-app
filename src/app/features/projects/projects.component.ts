import { Component, signal } from '@angular/core';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED';
  startDate: Date;
  endDate?: Date;
  progress: number;
  team: string[];
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

@Component({
  selector: 'app-projects',
  template: `
    <div class="bg-white dark:bg-gray-800/50 shadow rounded-lg p-6 backdrop-blur-xl">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">You have {{activeProjects}} active projects</p>
        </div>
        <div class="flex gap-3">
          <div class="relative">
            <select class="bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 border-0">
              <option>All Projects</option>
              <option>Active</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <button class="bg-indigo-600 dark:bg-indigo-500/30 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500/50 transition-colors flex items-center gap-2 dark:shadow-lg dark:shadow-indigo-500/30">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Project
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        @for (project of projects(); track project.id) {
          <div class="bg-white dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600/20 rounded-lg p-4 
                      hover:bg-gray-50 dark:hover:bg-gray-600/30 transition-all duration-300
                      backdrop-blur-xl shadow-lg dark:shadow-[0_0_15px_rgba(var(--project-glow-color),0.3)]"
               [style.--project-glow-color]="getProjectGlowColor(project.status)">
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
              <div class="w-full bg-gray-200 dark:bg-gray-600/50 rounded-full h-2">
                <div [class]="getProgressBarClass(project.status)" 
                     class="rounded-full h-2 transition-all duration-300" 
                     [style.width]="project.progress + '%'"></div>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <div class="flex -space-x-2">
                @for (member of project.team; track member) {
                  <img 
                    class="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src="https://ui-avatars.com/api/?name={{member}}&background=random"
                    [alt]="member">
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
  projects = signal<Project[]>([
    {
      id: '1',
      name: 'Hardware Refresh',
      description: 'Replace outdated workstations and servers',
      status: 'IN_PROGRESS',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-06-30'),
      progress: 45,
      team: ['John Doe', 'Jane Smith', 'Bob Wilson'],
      priority: 'HIGH'
    },
    {
      id: '2',
      name: 'Software License Audit',
      description: 'Review and optimize software licenses',
      status: 'PLANNING',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-04-15'),
      progress: 15,
      team: ['Alice Johnson', 'Mike Brown'],
      priority: 'MEDIUM'
    },
    {
      id: '3',
      name: 'Office Equipment Inventory',
      description: 'Complete inventory of all office equipment',
      status: 'COMPLETED',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-02-15'),
      progress: 100,
      team: ['Sarah Davis', 'Tom Wilson'],
      priority: 'LOW'
    }
  ]);

  get activeProjects(): number {
    return this.projects().filter(p => p.status === 'IN_PROGRESS').length;
  }

  getStatusClass(status: string): string {
    const baseClasses = 'text-xs font-medium';
    switch (status) {
      case 'PLANNING': return `${baseClasses} text-yellow-800 bg-yellow-100`;
      case 'IN_PROGRESS': return `${baseClasses} text-blue-800 bg-blue-100`;
      case 'ON_HOLD': return `${baseClasses} text-gray-800 bg-gray-100`;
      case 'COMPLETED': return `${baseClasses} text-green-800 bg-green-100`;
      default: return baseClasses;
    }
  }

  getPriorityClass(priority: string): string {
    const baseClasses = 'text-xs font-medium';
    switch (priority) {
      case 'HIGH': return `${baseClasses} text-red-800 bg-red-100`;
      case 'MEDIUM': return `${baseClasses} text-yellow-800 bg-yellow-100`;
      case 'LOW': return `${baseClasses} text-green-800 bg-green-100`;
      default: return baseClasses;
    }
  }

  getProgressBarClass(status: string) {
    switch (status) {
      case 'Active':
        return 'bg-green-500 dark:bg-green-400';
      case 'In Progress':
        return 'bg-yellow-500 dark:bg-yellow-400';
      case 'Completed':
        return 'bg-blue-500 dark:bg-blue-400';
      default:
        return 'bg-gray-500 dark:bg-gray-400';
    }
  }

  getProjectGlowColor(status: string) {
    switch (status) {
      case 'Active':
        return '34,197,94';  // green-500
      case 'In Progress':
        return '234,179,8';  // yellow-500
      case 'Completed':
        return '59,130,246'; // blue-500
      default:
        return '107,114,128'; // gray-500
    }
  }

  createProject() {
    // TODO: Implement project creation modal/form
    console.log('Create project clicked');
  }

  editProject(project: Project) {
    // TODO: Implement project editing modal/form
    console.log('Edit project clicked', project);
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projects.update(projects => projects.filter(p => p.id !== id));
    }
  }
}
