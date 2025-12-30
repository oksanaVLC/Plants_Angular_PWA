/*
Quito, porqeu utilizo lazy loading

import { Routes } from '@angular/router';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'detail/:id', component: DetailPageComponent },
];
*/

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./pages/detail-page/detail-page.component').then(
        (m) => m.DetailPageComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
