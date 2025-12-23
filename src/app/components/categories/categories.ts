import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Category {
  title: string;
  description: string;
  image: string;
  linkText: string;
  route?: string;
}

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements AfterViewInit {

  @ViewChild('findTrustedSection') ratesSection!: ElementRef;

  currentIndex = 0;
  chunkedCategories: Category[][] = [];

  categories: Category[] = [
    { title: 'Mortgage Brokers', description: 'Compare rates and find the best financing options for your home.', image: 'photo-1554224155-6726b3ff858f.avif', linkText: 'View Brokers →' , route: '/mortgage-brokers'},
    { title: 'Lawyers', description: 'Legal experts for contracts, titles, and smooth real estate transactions.', image: 'photo-1589829545856-d10d557cf95f.avif', linkText: 'View Lawyers →' , route: '/real-estate-lawyers'},
    { title: 'Inspectors', description: 'Thorough home inspections to identify issues before you buy.', image: 'photo-1585128792020-803d29415281.avif', linkText: 'View Inspectors →' , route: '/home-inspectors'},
    { title: 'Renovation Companies', description: 'Transform your property with trusted renovation and remodeling experts.', image: 'photo-1560520031-3a4dc4e9de0c.avif', linkText: 'View Companies →', route: '/renovation-companies' },
    { title: 'Property Managers', description: 'Professional management for rental properties and investment units.', image: 'photo-1560518883-ce09059eeffa.avif', linkText: 'View Managers →' , route: '/property-managers'},
    { title: 'Insurance Brokers', description: 'Top insurance brokers...', image: 'photo-1554224155-6726b3ff858f.avif', linkText: 'View Brokers →' , route: '/insurance-brokers'},

    /* NEW */
    { title: 'Electrical Companies', description: 'Licensed electricians', image: 'photo-1554224155-6726b3ff858f.avif', linkText: 'View →' , route:'electrical-companies'},
    { title: 'Pest Control', description: 'Protect your home', image: 'photo-1554224155-6726b3ff858f.avif', linkText: 'View →' , route:'pest-control'},
    { title: 'Real Estate Appraisal Firms', description: 'Professional appraisers', image: 'photo-1554224155-6726b3ff858f.avif', linkText: 'View →' , route:'appraisal-firms'},

    { title: 'Emergency Furnace Repair', description: 'Professional management...', image: 'photo-1554224155-6726b3ff858f.avif', linkText: 'View →' , route:'emergency-furnace'},
    { title: 'Roofers', description: 'Legal experts...', image: 'photo-1554224155-6726b3ff858f.avif', linkText: 'View →' , route:'roofers'},
    { title: 'Plumbing Companies', description: 'Legal experts..', image: 'photo-1554224155-6726b3ff858f.avif', linkText: 'View →' , route:'plumbing-companies'},
  ];

  constructor() {
    this.chunkCategories();
  }

  chunkCategories() {
    const size = 6;
    this.chunkedCategories = [];

    for (let i = 0; i < this.categories.length; i += size) {
      this.chunkedCategories.push(this.categories.slice(i, i + size));
    }
  }

  nextSlide() {
    if (this.currentIndex < this.chunkedCategories.length - 1) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  // anchor handling
  @HostListener('window:hashchange')
  onHashChange() {
    this.scrollToHash();
  }

  ngAfterViewInit() {
    setTimeout(() => this.scrollToHash(), 100);
  }

  private scrollToHash() {
    if (window.location.hash === '#find-trusted') {
      this.scrollToSection();
    }
  }

  scrollToSection() {
    this.ratesSection?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
