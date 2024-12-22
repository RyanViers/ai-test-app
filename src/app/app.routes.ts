import { Routes } from '@angular/router';
import { CalendarComponent } from './features/calendar/calendar.component';
import { CalendarHeaderComponent } from './features/calendar/calendar-header.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'team',
    loadComponent: () => import('./features/team/team.component')
      .then(m => m.TeamComponent)
  },
  {
    path: 'documents',
    loadComponent: () => import('./features/documents/documents.component')
      .then(m => m.DocumentsComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component')
      .then(m => m.ProjectsComponent)
  },
  {
    path: 'calendar',
    children: [
      {
        path: '',
        component: CalendarComponent
      },
      {
        path: '',
        outlet: 'sub-header',
        component: CalendarHeaderComponent
      }
    ]
  },
  {
    path: 'assets',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/assets/asset-list.component')
          .then(m => m.AssetListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./features/assets/asset-form.component')
          .then(m => m.AssetFormComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./features/assets/asset-form.component')
          .then(m => m.AssetFormComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];