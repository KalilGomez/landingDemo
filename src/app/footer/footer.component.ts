// footer.component.ts
import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';

declare var bootstrap: any; // Para usar Bootstrap JS

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private viewportScroller: ViewportScroller) {}

  navigateToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  }

  openModal(tipo: string): void {
    const modalId = tipo === 'privacidad' ? 'privacidadModal' : 'terminosModal';
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}