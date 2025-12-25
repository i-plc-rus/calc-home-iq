import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

// Interfaces for type safety
export interface MortgageInputs {
  homePrice: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  amortizationYears: number;
  mortgageTerm: number;
  interestRate: number;
  paymentFrequency: PaymentFrequency;
  propertyLocation: string;
  annualPropertyTax: number;
  annualHeatingCost: number;
  monthlyCondoFees: number;
}

export interface AmortizationEntry {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export type PaymentFrequency = 
  'monthly' | 'semi-monthly' | 'bi-weekly' | 
  'weekly' | 'accelerated-bi-weekly' | 'accelerated-weekly';

@Component({
  selector: 'app-mortgage-calculator-canada',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './mortgage-payment-calculator-canada.component.html',
  styleUrls: ['./mortgage-payment-calculator-canada.component.scss']
})
export class MortgageCalculatorCanadaComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // Form
  mortgageForm: FormGroup;
  
  // Results
  paymentResults = {
    paymentAmount: 0,
    totalPrincipal: 0,
    totalInterest: 0,
    totalCost: 0,
    cmhcInsurance: 0
  };
  
  amortizationSchedule: AmortizationEntry[] = [];
  
  // Chart settings
  chartType: ChartType = 'line';
  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Remaining Balance',
        borderColor: '#3F51B5',
        backgroundColor: 'rgba(63, 81, 181, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        data: [],
        label: 'Principal Paid',
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (CAD)'
        }
      }
    }
  };

  // Dropdown options
  paymentFrequencies = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'semi-monthly', label: 'Semi-Monthly' },
    { value: 'bi-weekly', label: 'Bi-Weekly' },
    { value: 'accelerated-bi-weekly', label: 'Accelerated Bi-Weekly' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'accelerated-weekly', label: 'Accelerated Weekly' }
  ];

  provinces = [
    'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'
  ];

  constructor(private fb: FormBuilder) {
    this.mortgageForm = this.createForm();
    this.setupFormListeners();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      homePrice: [500000, [Validators.required, Validators.min(1)]],
      downPaymentAmount: [100000, [Validators.required, Validators.min(0)]],
      downPaymentPercent: [20, [Validators.required, Validators.min(5), Validators.max(100)]],
      amortizationYears: [25, [Validators.required, Validators.min(1), Validators.max(30)]],
      mortgageTerm: [5, [Validators.required, Validators.min(1)]],
      interestRate: [4.5, [Validators.required, Validators.min(0.1), Validators.max(100)]],
      paymentFrequency: ['monthly', Validators.required],
      propertyLocation: ['ON', Validators.required],
      annualPropertyTax: [3000, [Validators.min(0)]],
      annualHeatingCost: [1500, [Validators.min(0)]],
      monthlyCondoFees: [0, [Validators.min(0)]]
    });
  }

  private setupFormListeners(): void {
    // Sync down payment amount and percentage
    this.mortgageForm.get('homePrice')?.valueChanges.subscribe(() => {
      this.syncDownPayment();
    });

    this.mortgageForm.get('downPaymentAmount')?.valueChanges.subscribe(() => {
      this.updateDownPaymentPercent();
    });

    this.mortgageForm.get('downPaymentPercent')?.valueChanges.subscribe(() => {
      this.updateDownPaymentAmount();
    });
  }

  private syncDownPayment(): void {
    const homePrice = this.mortgageForm.get('homePrice')?.value || 0;
    const percent = this.mortgageForm.get('downPaymentPercent')?.value || 20;
    const amount = (homePrice * percent) / 100;
    
    this.mortgageForm.patchValue({
      downPaymentAmount: Math.round(amount)
    }, { emitEvent: false });
  }

  private updateDownPaymentPercent(): void {
    const homePrice = this.mortgageForm.get('homePrice')?.value || 1;
    const amount = this.mortgageForm.get('downPaymentAmount')?.value || 0;
    const percent = (amount / homePrice) * 100;
    
    this.mortgageForm.patchValue({
      downPaymentPercent: Math.min(100, Math.round(percent * 100) / 100)
    }, { emitEvent: false });
  }

  private updateDownPaymentAmount(): void {
    const homePrice = this.mortgageForm.get('homePrice')?.value || 0;
    const percent = this.mortgageForm.get('downPaymentPercent')?.value || 20;
    const amount = (homePrice * percent) / 100;
    
    this.mortgageForm.patchValue({
      downPaymentAmount: Math.round(amount)
    }, { emitEvent: false });
  }

  // Calculate CMHC insurance premium
  private calculateCMHCPremium(loanAmount: number, downPaymentPercent: number): number {
    const ltv = 100 - downPaymentPercent;
    let premiumRate = 0;

    if (ltv > 95) premiumRate = 4.00;
    else if (ltv > 90) premiumRate = 3.10;
    else if (ltv > 85) premiumRate = 2.80;
    else if (ltv > 80) premiumRate = 2.40;
    else return 0;

    return (loanAmount * premiumRate) / 100;
  }

  // Get number of payments per year
  private getPaymentsPerYear(frequency: PaymentFrequency): number {
    const paymentsMap: Record<PaymentFrequency, number> = {
      'monthly': 12,
      'semi-monthly': 24,
      'bi-weekly': 26,
      'weekly': 52,
      'accelerated-bi-weekly': 26,
      'accelerated-weekly': 52
    };
    return paymentsMap[frequency] || 12;
  }

  // Calculate periodic interest rate (Canadian convention)
  private calculatePeriodicRate(annualRate: number, frequency: PaymentFrequency): number {
    // Canadian mortgages use semi-annual compounding
    const compoundedRate = Math.pow(1 + annualRate / 200, 1/6) - 1;
    const paymentsPerYear = this.getPaymentsPerYear(frequency);
    
    // Convert monthly rate to required frequency
    return Math.pow(1 + compoundedRate, 12 / paymentsPerYear) - 1;
  }

  // Calculate payment amount
  private calculatePayment(
    principal: number,
    periodicRate: number,
    totalPeriods: number,
    frequency: PaymentFrequency
  ): number {
    // For accelerated payments, use monthly payment and divide
    if (frequency === 'accelerated-bi-weekly') {
      const monthlyPayment = this.calculatePayment(principal, periodicRate, totalPeriods, 'monthly');
      return monthlyPayment / 2;
    } else if (frequency === 'accelerated-weekly') {
      const monthlyPayment = this.calculatePayment(principal, periodicRate, totalPeriods, 'monthly');
      return monthlyPayment / 4;
    }

    // Standard annuity formula
    if (periodicRate === 0) {
      return principal / totalPeriods;
    }
    
    return (principal * periodicRate * Math.pow(1 + periodicRate, totalPeriods)) /
           (Math.pow(1 + periodicRate, totalPeriods) - 1);
  }

  calculateMortgage(): void {
    if (this.mortgageForm.invalid) return;

    const formValue = this.mortgageForm.value;
    
    // Calculate principal amount
    const loanAmount = formValue.homePrice - formValue.downPaymentAmount;
    
    // Calculate CMHC insurance
    const cmhcPremium = this.calculateCMHCPremium(
      loanAmount,
      formValue.downPaymentPercent
    );
    
    const totalPrincipal = loanAmount + (formValue.downPaymentPercent < 20 ? cmhcPremium : 0);
    
    // Calculate periodic rate
    const periodicRate = this.calculatePeriodicRate(
      formValue.interestRate / 100,
      formValue.paymentFrequency
    );
    
    const paymentsPerYear = this.getPaymentsPerYear(formValue.paymentFrequency);
    const totalPayments = formValue.amortizationYears * paymentsPerYear;
    
    // Calculate payment amount
    const paymentAmount = this.calculatePayment(
      totalPrincipal,
      periodicRate,
      totalPayments,
      formValue.paymentFrequency
    );
    
    // Generate amortization schedule
    this.generateAmortizationSchedule(
      totalPrincipal,
      periodicRate,
      paymentAmount,
      totalPayments,
      formValue.paymentFrequency
    );
    
    // Update results
    this.updateResults(paymentAmount, totalPrincipal);
    
    // Update chart
    this.updateChart();
  }

  private generateAmortizationSchedule(
    principal: number,
    periodicRate: number,
    paymentAmount: number,
    totalPeriods: number,
    frequency: PaymentFrequency
  ): void {
    let balance = principal;
    this.amortizationSchedule = [];

    for (let i = 1; i <= totalPeriods; i++) {
      const interest = balance * periodicRate;
      const principalPaid = paymentAmount - interest;
      balance -= principalPaid;

      if (balance < 0) balance = 0;

      this.amortizationSchedule.push({
        period: i,
        payment: paymentAmount,
        principal: principalPaid,
        interest: interest,
        balance: balance
      });

      if (balance <= 0) break;
    }
  }

  private updateResults(paymentAmount: number, totalPrincipal: number): void {
    const totalInterest = this.amortizationSchedule.reduce(
      (sum, entry) => sum + entry.interest, 0
    );

    this.paymentResults = {
      paymentAmount: Math.round(paymentAmount * 100) / 100,
      totalPrincipal: Math.round(totalPrincipal * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalCost: Math.round((totalPrincipal + totalInterest) * 100) / 100,
      cmhcInsurance: this.mortgageForm.value.downPaymentPercent < 20 ? 
        this.calculateCMHCPremium(
          this.mortgageForm.value.homePrice - this.mortgageForm.value.downPaymentAmount,
          this.mortgageForm.value.downPaymentPercent
        ) : 0
    };
  }

  private updateChart(): void {
    const yearlyBalances: number[] = [];
    const yearlyPaid: number[] = [];
    const yearlyLabels: string[] = [];

    const paymentsPerYear = this.getPaymentsPerYear(this.mortgageForm.value.paymentFrequency);
    
    for (let year = 1; year <= this.mortgageForm.value.amortizationYears; year++) {
      const periodIndex = Math.min(year * paymentsPerYear, this.amortizationSchedule.length) - 1;
      if (periodIndex >= 0) {
        yearlyBalances.push(this.amortizationSchedule[periodIndex].balance);
        
        const totalPaid = this.amortizationSchedule
          .slice(0, periodIndex + 1)
          .reduce((sum, entry) => sum + entry.principal, 0);
        yearlyPaid.push(totalPaid);
        
        yearlyLabels.push(`Year ${year}`);
      }
    }

    this.chartData = {
      labels: yearlyLabels,
      datasets: [
        {
          data: yearlyBalances,
          label: 'Remaining Balance',
          borderColor: '#3F51B5',
          backgroundColor: 'rgba(63, 81, 181, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          data: yearlyPaid,
          label: 'Principal Paid',
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };

    this.chart?.update();
  }

  resetForm(): void {
    this.mortgageForm.reset({
      homePrice: 500000,
      downPaymentAmount: 100000,
      downPaymentPercent: 20,
      amortizationYears: 25,
      mortgageTerm: 5,
      interestRate: 4.5,
      paymentFrequency: 'monthly',
      propertyLocation: 'ON',
      annualPropertyTax: 3000,
      annualHeatingCost: 1500,
      monthlyCondoFees: 0
    });
    this.calculateMortgage();
  }

  getMinDownPayment(): number {
    const homePrice = this.mortgageForm.get('homePrice')?.value || 0;
    
    if (homePrice <= 500000) {
      return homePrice * 0.05;
    } else if (homePrice < 1000000) {
      return 500000 * 0.05 + (homePrice - 500000) * 0.10;
    } else {
      return homePrice * 0.20;
    }
  }

  getMaxAmortization(): number {
    return this.mortgageForm.get('downPaymentPercent')?.value < 20 ? 25 : 30;
  }
}