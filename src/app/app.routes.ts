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

  { 
    path: 'w19',
    loadComponent: () =>       
      import('./pages/appraisal-firms/appraisal-firms.component')
        .then(m => m.AppraisalFirms)
  },
  { 
    path: 'appraisal-firms',
    loadComponent: () =>       
      import('./pages/appraisal-firms/appraisal-firms.component')
        .then(m => m.AppraisalFirms)
  },

  { 
    path: 'w21',
    loadComponent: () =>       
      import('./pages/choose-realtor-guide/choose-realtor-guide.component')
        .then(m => m.ChooseRealtorGuide)
  },
  { 
    path: 'appraisal-firms',
    loadComponent: () =>       
      import('./pages/choose-realtor-guide/choose-realtor-guide.component')
        .then(m => m.ChooseRealtorGuide)        
  },

  { 
    path: 'w22',
    loadComponent: () =>       
      import('./pages/mortgage-strategies/mortgage-strategies.component')
        .then(m => m.MortgageStrategies)
  },
  { 
    path: 'mortgage-strategies',
    loadComponent: () =>       
      import('./pages/mortgage-strategies/mortgage-strategies.component')
        .then(m => m.MortgageStrategies)  
  },

  

];