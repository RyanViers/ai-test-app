import { Routes } from '@angular/router';

export const ASSET_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./asset-list.component').then(c => c.AssetListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./asset-form.component').then(c => c.AssetFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./asset-form.component').then(c => c.AssetFormComponent)
  }
];
