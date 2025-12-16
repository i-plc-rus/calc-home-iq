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
  {
    path: 'w16',    
    loadComponent: () => import('./components/insurance-brokers/insurance-brokers.component').then(m => m.InsuranceBrokersComponent)
  },
  { 
    path: 'w17',
    loadComponent: () =>       
      import('./pages/electrical-companies/electrical-companies.component')
        .then(m => m.ElectricalCompaniesComponent)
  },
  { 
    path: 'electrical-companies',
    loadComponent: () =>       
      import('./pages/electrical-companies/electrical-companies.component')
        .then(m => m.ElectricalCompaniesComponent)
  },

  { 
    path: 'w18',
    loadComponent: () =>       
      import('./pages/pest-control/pest-control')
        .then(m => m.PestControl)
  },
  { 
    path: 'pest-control',
    loadComponent: () =>       
      import('./pages/pest-control/pest-control')
        .then(m => m.PestControl)
  },

];