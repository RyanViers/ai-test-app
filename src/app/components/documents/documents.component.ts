import { Component } from '@angular/core';

@Component({
  selector: 'app-documents',
  standalone: true,
  template: `
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Documents</h2>
      <div class="space-y-4">
        @for (doc of documents; track doc.id) {
          <div class="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <div class="flex items-center space-x-4">
              <svg class="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{doc.name}}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{doc.type}} • {{doc.size}}</p>
              </div>
            </div>
            <button class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
              Download
            </button>
          </div>
        }
      </div>
    </div>
  `
})
export class DocumentsComponent {
  documents = [
    { id: 1, name: 'Project Proposal', type: 'PDF', size: '2.4 MB' },
    { id: 2, name: 'Design Assets', type: 'ZIP', size: '14.8 MB' },
    { id: 3, name: 'Meeting Notes', type: 'DOC', size: '234 KB' },
  ];
}
