import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { HeaderComponent } from '../components/header/header.component';
import { RealtimeUpdatesPanelComponent } from '../components/realtime-updates-panel/realtime-updates-panel.component';
import { SubHeaderComponent } from '../../components/sub-header/sub-header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    SideNavComponent, 
    HeaderComponent,
    SubHeaderComponent,
    RealtimeUpdatesPanelComponent
  ],
  template: `
    <div class="min-h-screen bg-white dark:bg-gray-950 dark:text-white transition-colors duration-300">
      <!-- Main Grid Layout - Responsive grid columns -->
      <div class="grid grid-cols-[80px_1fr] xl:grid-cols-[80px_350px_1fr] min-h-screen">
        <!-- Side Navigation - darkest -->
        <app-side-nav class="bg-gray-900 dark:bg-black" />

        <!-- Realtime Updates Panel - hidden on smaller screens -->
        <div class="hidden xl:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-500">
          <app-realtime-updates-panel />
        </div>

        <!-- Main Content Area - now properly sized -->
        <div class="flex flex-col w-full bg-white dark:bg-gray-800">
          <!-- Header -->
          <app-header />

          <!-- Sub Header -->
          <app-sub-header>
            <router-outlet name="sub-header"></router-outlet>
          </app-sub-header>

          <!-- Main Content -->
          <main class="flex-1 max-w-full">
            <router-outlet></router-outlet>
          </main>
        </div>
      </div>
    </div>
  `
})
export class MainLayoutComponent {}
