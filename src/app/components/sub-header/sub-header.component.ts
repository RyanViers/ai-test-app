import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sub-header',
  
  imports: [CommonModule],
  template: `
    <div class="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border-y border-gray-200 dark:border-gray-700/50">
      <div class="max-w-screen-2xl mx-auto px-4 py-4">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class SubHeaderComponent {}
