import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  //component: Home
  //loadComponent: () => import('./app').then(m => m.App)
  loadComponent: () => import('./pages/home/home').then(m => m.Home)
},
{
  path: 'w16',
  loadComponent: () => import('./components/insurance-brokers/insurance-brokers.component').then(m => m.InsuranceBrokersComponent)
},

{
  path: 'insurance-brokers',
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
  path: 'choose-realtor-guide',
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
{
  path: 'w23',
  loadComponent: () =>
    import('./pages/mortgage-penalties/mortgage-penalties.component')
      .then(m => m.MortgagePenaltiesComponent)
},
{
  path: 'mortgage-penalties',
  loadComponent: () =>
    import('./pages/mortgage-penalties/mortgage-penalties.component')
      .then(m => m.MortgagePenaltiesComponent)
},


{
  path: 'w24',
  loadComponent: () =>
    import('./pages/legal-fees/legal-fees.component')
      .then(m => m.LegalFeesComponent)
},
{
  path: 'legal-fees',
  loadComponent: () =>
    import('./pages/legal-fees/legal-fees.component')
      .then(m => m.LegalFeesComponent)
},

{
  path: 'w25',
  loadComponent: () =>
    import('./pages/home-insurance/home-insurance.component')
      .then(m => m.HomeInsuranceComponent)
},
{
  path: 'home-insurance',
  loadComponent: () =>
    import('./pages/home-insurance/home-insurance.component')
      .then(m => m.HomeInsuranceComponent)
},


{
  path: 'w26',
  loadComponent: () =>
    import('./pages/landlord-insurance/landlord-insurance.component')
      .then(m => m.LandlordInsuranceComponent)
},
{
  path: 'landlord-insurance',
  loadComponent: () =>
    import('./pages/landlord-insurance/landlord-insurance.component')
      .then(m => m.LandlordInsuranceComponent)
},

{
  path: 'w31',
  loadComponent: () =>
    import('./pages/about/about.component')
      .then(m => m.AboutComponent)
},
{
  path: 'about',
  loadComponent: () =>
    import('./pages/about/about.component')
      .then(m => m.AboutComponent)
},

{
  path: 'w37',
  loadComponent: () =>
    import('./pages/privacy/privacy.component')
      .then(m => m.PrivacyComponent)
},
{
  path: 'privacy',
  loadComponent: () =>
    import('./pages/privacy/privacy.component')
      .then(m => m.PrivacyComponent)
},

{
  path: 'w19b',
  loadComponent: () =>
    import('./pages/emergency-furnace-repair/emergency-furnace-repair.component')
      .then(m => m.EmergencyFurnaceRepairComponent)
},
{
  path: 'emergency-furnace',
  loadComponent: () =>
    import('./pages/emergency-furnace-repair/emergency-furnace-repair.component')
      .then(m => m.EmergencyFurnaceRepairComponent)
},
{
  path: 'w19c',
  loadComponent: () =>
    import('./pages/roofers/roofers.component')
      .then(m => m.RoofersComponent)
},
{
  path: 'roofers',
  loadComponent: () =>
    import('./pages/roofers/roofers.component')
      .then(m => m.RoofersComponent)
},
{
  path: 'w19d',
  loadComponent: () =>
    import('./pages/plumbing-companies/plumbing-companies.component')
      .then(m => m.PlumbingCompaniesComponent)
},
{
  path: 'plumbing-companies',
loadComponent: () =>
    import('./pages/plumbing-companies/plumbing-companies.component')
      .then(m => m.PlumbingCompaniesComponent)
},

{
  path: 'mortgage-brokers',
loadComponent: () =>
    import('./pages/mortgage-brokers/mortgage-brokers.component')
      .then(m => m.MortgageBrokersComponent)
},
{
  path: 'real-estate-lawyers',
loadComponent: () =>
    import('./pages/real-estate-lawyers/real-estate-lawyers.component')
      .then(m => m.RealEstateLawyersComponent)
},
{
  path: 'home-inspectors',
loadComponent: () =>
    import('./pages/home-inspectors/home-inspectors.component')
      .then(m => m.HomeInspectorsComponent)
},

{
  path: 'renovation-companies',
loadComponent: () =>
    import('./pages/renovation-companies/renovation-companies.component')
      .then(m => m.RenovationCompaniesComponent)
},
{
  path: 'property-managers',
loadComponent: () =>
    import('./pages/property-managers/property-managers.component')
      .then(m => m.PropertyManagersComponent)
},



];