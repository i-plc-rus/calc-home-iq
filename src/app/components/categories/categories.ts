import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface Category {
  title: string;
  description: string;
  image: string;
  linkText: string;
}

@Component({
  selector: 'app-categories',
  imports: [CommonModule,],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {

   categories: Category[] = [
    {
      title: 'Mortgage Brokers',
      description: 'Compare rates and find the best financing options for your home purchase.',
      image: 'photo-1554224155-6726b3ff858f.avif',
      linkText: 'View Brokers →'
    },
    {
      title: 'Lawyers',
      description: 'Legal experts for contracts, titles, and smooth real estate transactions.',
      image: 'photo-1589829545856-d10d557cf95f.avif',
      linkText: 'View Lawyers →'
    },
    {
      title: 'Inspectors',
      description: 'Thorough home inspections to identify issues before you buy.',
      image: 'photo-1585128792020-803d29415281.avif',
      linkText: 'View Inspectors →'
    },
    {
      title: 'Renovation Companies',
      description: 'Transform your property with trusted renovation and remodeling experts.',
      image: 'photo-1560520031-3a4dc4e9de0c.avif',
      linkText: 'View Companies →'
    },
    {
      title: 'Property Managers',
      description: 'Professional management for rental properties and investment units.',
      image: 'photo-1560518883-ce09059eeffa.avif',
      linkText: 'View Managers →'
    },
    {
      title: 'Insurance Brokers',
      description: 'Top 3 Insurance Brokers in Calgary – Trusted Coverage for Homeowners & Real Estate Investors.',
      image: 'photo-1554224155-6726b3ff858f.avif',
      linkText: 'View Brokers →'
    }
  ];

}
