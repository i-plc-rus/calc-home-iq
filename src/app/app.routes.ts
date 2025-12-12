import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [{
    path: '',
    //component: Home
    loadComponent: () => import('./app').then(m => m.App)
  },
{
    path: 'insurance-brokers',
    loadComponent: () => import('./components/insurance-brokers/insurance-brokers/insurance-brokers.component').then(m => m.InsuranceBrokersComponent)
  },
];