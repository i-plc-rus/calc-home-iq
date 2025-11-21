import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Основные данные формы
  mortgageAmount: number | null = null;
  
  // Параметры по умолчанию для простого режима
  defaultInterestRate: number = 4.590;
  defaultAmortizationYears: number = 25;
  defaultAmortizationMonths: number = 0;
  defaultPaymentFrequency: string = 'monthly';
  
  // Данные для расширенного режима
  interestRate: number | null = 4.590;
  amortizationYears: number = 25;
  amortizationMonths: number = 0;
  interestTermYears: number = 5;
  interestTermMonths: number = 0;
  paymentFrequency: string = 'monthly';
  
  // Результаты расчета
  paymentAmount: number = 0;
  showResults: boolean = false;
  
  // Управление вкладками
  activeTab: string = 'simple';

  // Опции для выпадающих списков
  yearsOptions: any[] = [];
  monthsOptions: any[] = [];

  frequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'biweekly', label: 'Bi-Weekly' },
    { value: 'weekly', label: 'Weekly' }
  ];

  constructor() {
    this.initializeOptions();
  }

  initializeOptions() {
    // Генерируем опции для лет (0-59)
    for (let i = 0; i <= 59; i++) {
      this.yearsOptions.push({
        value: i,
        label: i === 1 ? '1 Year' : `${i} Years`
      });
    }

    // Генерируем опции для месяцев (0-11)
    for (let i = 0; i <= 11; i++) {
      this.monthsOptions.push({
        value: i,
        label: i === 1 ? '1 Month' : `${i} Months`
      });
    }
  }

  formatInterestRate() {
    if (this.interestRate !== null) {
      // Ограничиваем до 3 знаков после запятой
      this.interestRate = parseFloat(this.interestRate.toFixed(3));
    }
  }

  calculate() {
    console.log('Calculate clicked', {
      mortgageAmount: this.mortgageAmount,
      activeTab: this.activeTab,
      interestRate: this.interestRate,
      amortizationYears: this.amortizationYears,
      amortizationMonths: this.amortizationMonths,
      paymentFrequency: this.paymentFrequency
    });

    // Базовая валидация
    if (!this.mortgageAmount) {
      console.error('Please fill mortgage amount');
      return;
    }

    if (this.activeTab === 'advanced' && !this.interestRate) {
      console.error('Please fill interest rate in advanced mode');
      return;
    }

    this.calculateMortgagePayment();
    this.showResults = true;
  }

  private calculateMortgagePayment() {
    if (!this.mortgageAmount) return;

    const principal = this.mortgageAmount;
    
    // Используем разные параметры в зависимости от режима
    let annualInterestRate: number;
    let totalMonths: number;
    let frequency: string;

    if (this.activeTab === 'simple') {
      // Используем параметры по умолчанию для простого режима
      annualInterestRate = this.defaultInterestRate / 100;
      totalMonths = (this.defaultAmortizationYears * 12) + this.defaultAmortizationMonths;
      frequency = this.defaultPaymentFrequency;
    } else {
      // Используем пользовательские параметры для расширенного режима
      annualInterestRate = (this.interestRate || 0) / 100;
      totalMonths = (this.amortizationYears * 12) + this.amortizationMonths;
      frequency = this.paymentFrequency;
    }
    
    // Расчет количества платежей в год
    let paymentsPerYear = 12; // по умолчанию monthly
    if (frequency === 'biweekly') {
      paymentsPerYear = 26;
    } else if (frequency === 'weekly') {
      paymentsPerYear = 52;
    }

    const monthlyInterestRate = annualInterestRate / paymentsPerYear;
    const totalPayments = (totalMonths * paymentsPerYear) / 12;

    // Формула расчета аннуитетного платежа
    if (monthlyInterestRate === 0) {
      // Если процентная ставка 0%
      this.paymentAmount = principal / totalPayments;
    } else {
      this.paymentAmount = principal * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / 
        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    }

    // Округление до 2 знаков после запятой
    this.paymentAmount = Math.round(this.paymentAmount * 100) / 100;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    
    if (tab === 'simple') {
      // Сбрасываем расширенные поля при переходе на простой режим
      this.interestRate = this.defaultInterestRate;
      this.amortizationYears = this.defaultAmortizationYears;
      this.amortizationMonths = this.defaultAmortizationMonths;
      this.paymentFrequency = this.defaultPaymentFrequency;
    } else {
      // Устанавливаем значения по умолчанию для расширенного режима
      this.interestRate = this.defaultInterestRate;
      this.amortizationYears = this.defaultAmortizationYears;
      this.amortizationMonths = this.defaultAmortizationMonths;
      this.interestTermYears = 5;
      this.interestTermMonths = 0;
      this.paymentFrequency = this.defaultPaymentFrequency;
    }
    
    this.showResults = false;
    console.log('Active tab:', tab);
  }

  getFrequencyLabel(): string {
    const option = this.frequencyOptions.find(opt => opt.value === this.paymentFrequency);
    return option ? option.label : '';
  }

  getTotalAmortization(): string {
    const years = this.amortizationYears;
    const months = this.amortizationMonths;
    
    if (years > 0 && months > 0) {
      return `${years} years, ${months} months`;
    } else if (years > 0) {
      return `${years} years`;
    } else if (months > 0) {
      return `${months} months`;
    } else {
      return '0';
    }
  }

  getInterestTerm(): string {
    const years = this.interestTermYears;
    const months = this.interestTermMonths;
    
    if (years > 0 && months > 0) {
      return `${years} years, ${months} months`;
    } else if (years > 0) {
      return `${years} years`;
    } else if (months > 0) {
      return `${months} months`;
    } else {
      return '0';
    }
  }

  resetForm() {
    this.mortgageAmount = null;
    this.interestRate = this.defaultInterestRate;
    this.amortizationYears = 25;
    this.amortizationMonths = 0;
    this.interestTermYears = 5;
    this.interestTermMonths = 0;
    this.paymentFrequency = 'monthly';
    this.showResults = false;
    this.paymentAmount = 0;
  }
}