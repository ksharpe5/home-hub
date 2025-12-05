import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/pages/dashboard').then(m => m.default)
  },
  {
    path: 'calendar',
    loadComponent: () => import('./features/calendar/pages/calendar').then(m => m.default)
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/pages/products').then(m => m.default)
  },
  {
    path: 'recipes',
    loadComponent: () => import('./features/recipes/pages/recipes').then(m => m.default)
  },
  {
    path: 'chores',
    loadComponent: () => import('./features/chores/pages/chores').then(m => m.default)
  }
];
