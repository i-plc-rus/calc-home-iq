import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface Rate {
  type: string;
  value: string;
}

@Component({
  selector: 'app-rates',
  imports: [CommonModule],
  templateUrl: './rates.html',
  styleUrl: './rates.scss',
})
export class Rates {
rates: Rate[] = [
    { type: '5yr Fixed', value: '3.99%' },
    { type: '3yr Fixed', value: '3.75%' },
    { type: '5-Year Variable', value: '3.65%' }
  ];
}
