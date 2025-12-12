import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = false;
  isMobileMenuOpen = false;
  
  constructor(private router: Router) {}


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isMobileMenuOpen = false;
  }

   toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }


  scrollToRates(event: Event) {
    event.preventDefault();
    this.closeMenu();
    
    // Переходим на главную страницу, если не на ней
    this.router.navigate(['/']).then(() => {
      // Ждем небольшое время для рендера контента
      setTimeout(() => {
        const ratesSection = document.getElementById('mortgage-rates');
        if (ratesSection) {
          ratesSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    });
  }

  scrollToFindTrusted(event: Event) {
    event.preventDefault();
    this.closeMenu();
    
    // Переходим на главную страницу, если не на ней
    this.router.navigate(['/']).then(() => {
      // Ждем небольшое время для рендера контента
      setTimeout(() => {
        const findTrustedSection = document.getElementById('find-trusted');
        if (findTrustedSection) {
          findTrustedSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    });
  }

scrollToSmartGuides(event: Event) {
    event.preventDefault();
    this.closeMenu();
    
    // Переходим на главную страницу, если не на ней
    this.router.navigate(['/']).then(() => {
      // Ждем небольшое время для рендера контента
      setTimeout(() => {
        const smartGuidesSection = document.getElementById('smart-guides');
        if (smartGuidesSection) {
          smartGuidesSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    });
  }

}
