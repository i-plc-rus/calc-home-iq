import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    //component: Home
    //loadComponent: () => import('./app').then(m => m.App)
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
{
    path: 'insurance-brokers',    
    loadComponent: () => import('./components/insurance-brokers/insurance-brokers.component').then(m => m.InsuranceBrokersComponent)
  },
];