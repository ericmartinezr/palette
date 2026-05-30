import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then(m => m.Home),
  },
  {
    path: 'palette',
    loadComponent: () => import('./pages/palette').then(m => m.Palette),
  },
  {
    path: 'gradient',
    loadComponent: () => import('./pages/gradient').then(m => m.Gradient),
  },
];
