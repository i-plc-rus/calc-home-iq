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
  
  constructor(private router: Router) {}


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
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


}
