import { Component, signal } from '@angular/core';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'REMOTE';
  email: string;
  phone: string;
  avatar: string;
  projects: number;
}

@Component({
  selector: 'app-team',
  standalone: true,
  template: `
    <div class="bg-white dark:bg-gray-800/50 shadow rounded-lg p-6 backdrop-blur-xl">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Team Members</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ teamMembers().length }} total members</p>
        </div>
        <div class="flex gap-3">
          <div class="relative">
            <select class="bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 border-0 ring-1 ring-gray-300 dark:ring-gray-600">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
          </div>
          <button class="bg-indigo-600 dark:bg-indigo-500/30 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500/50 transition-colors flex items-center gap-2 dark:shadow-lg dark:shadow-indigo-500/30">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Member
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (member of teamMembers(); track member.id) {
          <div class="bg-white dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600/20 rounded-lg p-6 
                      hover:bg-gray-50 dark:hover:bg-gray-600/30 transition-all duration-300
                      backdrop-blur-xl shadow-lg dark:shadow-[0_0_15px_rgba(var(--member-glow-color),0.2)]"
               [style.--member-glow-color]="getDepartmentColor(member.department)">
            <div class="flex items-start gap-4">
              <img [src]="member.avatar" 
                   [alt]="member.name"
                   class="h-12 w-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{member.name}}</h3>
                  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" 
                        [class]="getStatusClass(member.status)">
                    {{formatStatus(member.status)}}
                  </span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{member.role}}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{member.department}}</p>
              </div>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-4">
              <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                <p class="text-sm text-gray-500 dark:text-gray-400">Projects</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{member.projects}}</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                <p class="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">3y 2m</p>
              </div>
            </div>

            <div class="mt-4 flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600/20">
              <div class="flex space-x-3">
                <a href="mailto:{{member.email}}" 
                   class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a href="tel:{{member.phone}}" 
                   class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
              <button class="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class TeamComponent {
  teamMembers = signal<TeamMember[]>([
    {
      id: '1',
      name: 'Leslie Alexander',
      role: 'Senior Frontend Developer',
      department: 'Engineering',
      status: 'ACTIVE',
      email: 'leslie@example.com',
      phone: '+1234567890',
      avatar: 'https://ui-avatars.com/api/?name=Leslie+Alexander&background=6366f1&color=fff',
      projects: 8
    },
    // ... add more team members
  ]);

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 dark:bg-green-500/30 text-green-800 dark:text-green-300';
      case 'ON_LEAVE': return 'bg-yellow-100 dark:bg-yellow-500/30 text-yellow-800 dark:text-yellow-300';
      case 'REMOTE': return 'bg-blue-100 dark:bg-blue-500/30 text-blue-800 dark:text-blue-300';
      default: return 'bg-gray-100 dark:bg-gray-500/30 text-gray-800 dark:text-gray-300';
    }
  }

  getDepartmentColor(department: string): string {
    switch (department) {
      case 'Engineering': return '99,102,241'; // indigo-500
      case 'Design': return '236,72,153'; // pink-500
      case 'Marketing': return '234,88,12'; // orange-500
      default: return '107,114,128'; // gray-500
    }
  }

  formatStatus(status: string): string {
    return status.split('_').map(word => 
      word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ');
  }
}
