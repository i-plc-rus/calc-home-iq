import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

export interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  category: string;
}



@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
  
  @ViewChild('smartGuidesSection') ratesSection!: ElementRef;

  blogPosts: BlogPost[] = [
    {
      title: 'How to Choose a Realtor in Calgary',
      excerpt: 'Learn what to look for when selecting the right real estate professional...',
      image: 'photo-1560518883-ce09059eeffa (1).avif',
      category: 'Buying Guide'
    },
    {
      title: 'Best Mortgage Strategies in 2025',
      excerpt: 'Current market trends and smart financing approaches for home buyers...',
      image: 'photo-1560520031-3a4dc4e9de0c.avif',
      category: 'Financing'
    },
    {
      title: 'Legal Fees & Penalties Explained',
      excerpt: 'Understanding closing costs and potential penalties in real estate transactions...',
      image: 'photo-1560448204-603b3fc33ddc.avif',
      category: 'Legal'
    }
  ];

  // Обработчик якорных ссылок
  @HostListener('window:hashchange', ['$event'])
  onHashChange(event: HashChangeEvent) {
    this.scrollToHash();
  }

  ngAfterViewInit() {
    // Проверяем хэш при загрузке компонента
    setTimeout(() => {
      this.scrollToHash();
    }, 100);
  }

  private scrollToHash() {
    if (window.location.hash === '#smart-guides') {
      this.scrollToSection();
    }
  }

  scrollToSection() {
    if (this.ratesSection) {
      this.ratesSection.nativeElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }


}
