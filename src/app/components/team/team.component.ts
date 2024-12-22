import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  standalone: true,
  template: `
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Team Members</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Team Member Cards -->
        @for (member of teamMembers; track member.id) {
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div class="flex items-center space-x-4">
              <img [src]="member.avatar" [alt]="member.name" class="h-12 w-12 rounded-full">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{member.name}}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{member.role}}</p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class TeamComponent {
  teamMembers = [
    { id: 1, name: 'John Doe', role: 'Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    { id: 2, name: 'Jane Smith', role: 'Designer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
    { id: 3, name: 'Mike Johnson', role: 'Manager', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
  ];
}
