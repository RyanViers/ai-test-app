import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'JPG' | 'ZIP';
  size: string;
  modified: Date;
  shared: string[];
  category: 'Contracts' | 'Reports' | 'Presentations' | 'Images' | 'Archives';
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white dark:bg-gray-800/50 shadow rounded-lg p-6 backdrop-blur-xl">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Documents</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{documents().length}} files</p>
        </div>
        <div class="flex gap-3">
          <div class="relative">
            <select class="bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 border-0 ring-1 ring-gray-300 dark:ring-gray-600">
              <option>All Categories</option>
              <option>Contracts</option>
              <option>Reports</option>
              <option>Presentations</option>
              <option>Images</option>
              <option>Archives</option>
            </select>
          </div>
          <button class="bg-indigo-600 dark:bg-indigo-500/30 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-500/50 transition-colors flex items-center gap-2 dark:shadow-lg dark:shadow-indigo-500/30">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Upload
          </button>
        </div>
      </div>

      <div class="space-y-4">
        @for (document of documents(); track document.id) {
          <div class="bg-white dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600/20 rounded-lg p-4 
                      hover:bg-gray-50 dark:hover:bg-gray-600/30 transition-all duration-300
                      backdrop-blur-xl shadow-lg">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="p-2 rounded-lg" [class]="getTypeColor(document.type)">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getTypeIcon(document.type)" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{document.name}}</h3>
                  <div class="flex items-center gap-4 mt-1">
                    <span class="text-sm text-gray-600 dark:text-gray-300">{{document.type}}</span>
                    <span class="text-sm text-gray-600 dark:text-gray-300">{{document.size}}</span>
                    <span class="text-sm text-gray-600 dark:text-gray-300">{{document.modified | date:'medium'}}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="flex -space-x-2">
                  @for (user of document.shared; track user) {
                    <img 
                      class="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
                      src="https://ui-avatars.com/api/?name={{user}}&background=random"
                      [alt]="user"
                      [title]="user">
                  }
                </div>
                <div class="flex gap-2">
                  <button class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                  <button class="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class DocumentsComponent {
  documents = signal<Document[]>([
    {
      id: '1',
      name: 'Q4 Financial Report.pdf',
      type: 'PDF',
      size: '2.4 MB',
      modified: new Date('2024-03-15'),
      shared: ['John Doe', 'Jane Smith'],
      category: 'Reports'
    },
    {
      id: '2',
      name: 'Project Proposal.docx',
      type: 'DOCX',
      size: '843 KB',
      modified: new Date('2024-03-14'),
      shared: ['Mike Johnson'],
      category: 'Contracts'
    },
    {
      id: '3',
      name: 'Marketing Assets.zip',
      type: 'ZIP',
      size: '156.3 MB',
      modified: new Date('2024-03-13'),
      shared: ['Alice Chen', 'Bob Wilson', 'Carol White'],
      category: 'Archives'
    },
    {
      id: '4',
      name: 'Monthly Budget.xlsx',
      type: 'XLSX',
      size: '1.2 MB',
      modified: new Date('2024-03-12'),
      shared: ['David Kim'],
      category: 'Reports'
    }
  ]);

  getTypeColor(type: string): string {
    const baseClasses = 'text-white dark:text-gray-100';
    switch (type) {
      case 'PDF': return `${baseClasses} bg-red-500/80 dark:bg-red-500/30`;
      case 'DOCX': return `${baseClasses} bg-blue-500/80 dark:bg-blue-500/30`;
      case 'XLSX': return `${baseClasses} bg-green-500/80 dark:bg-green-500/30`;
      case 'JPG': return `${baseClasses} bg-yellow-500/80 dark:bg-yellow-500/30`;
      case 'ZIP': return `${baseClasses} bg-purple-500/80 dark:bg-purple-500/30`;
      default: return `${baseClasses} bg-gray-500/80 dark:bg-gray-500/30`;
    }
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'PDF': return 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253';
      case 'DOCX': return 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z';
      case 'XLSX': return 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z';
      case 'JPG': return 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z';
      case 'ZIP': return 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4';
      default: return 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z';
    }
  }
}
