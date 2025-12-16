/* ============================================
   IMPORTS Y DEPENDENCIAS
   ============================================ */

import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common'; // Servicio para manejo de scroll en Angular

// Declaración global de Bootstrap (cargado desde CDN en index.html)
declare var bootstrap: any;

/* ============================================
   COMPONENTE FOOTER
   ============================================ */

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  /* ============================================
     CONSTRUCTOR
     ============================================ */

  /**
   * Inyecta ViewportScroller para manejar navegación y scroll
   * @param viewportScroller - Servicio de Angular para control de scroll
   */
  constructor(private viewportScroller: ViewportScroller) { }

  /* ============================================
     MÉTODOS DE NAVEGACIÓN
     ============================================ */

  /**
   * Navega suavemente a una sección específica de la página por su ID
   * Utilizado en los enlaces del footer para navegación interna
   * 
   * @param sectionId - ID del elemento HTML al que se desea navegar (ej: 'home', 'productos')
   * @returns void
   * 
   * Ejemplo de uso en template:
   * (click)="navigateToSection('home')"
   */
  navigateToSection(sectionId: string): void {
    // Busca el elemento DOM por su ID
    const element = document.getElementById(sectionId);

    // Si el elemento existe, hace scroll suave hasta él
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',  // Animación suave de scroll
        block: 'start'       // Alinea el elemento al inicio del viewport
      });
    }
  }

  /**
   * Hace scroll suave hasta el inicio (top) de la página
   * Útil para botones de "volver arriba"
   * 
   * @returns void
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,              // Posición superior de la página
      behavior: 'smooth'   // Animación suave de scroll
    });
  }

  /* ============================================
     MÉTODOS DE MODALES
     ============================================ */

  /**
   * Abre un modal de Bootstrap según el tipo especificado
   * Maneja la apertura de modales de Privacidad y Términos y Condiciones
   * 
   * @param tipo - Tipo de modal a abrir: 'privacidad' o 'terminos'
   * @returns void
   * 
   * Ejemplo de uso en template:
   * (click)="openModal('privacidad')"
   */
  openModal(tipo: string): void {
    // Determina el ID del modal según el tipo solicitado
    const modalId = tipo === 'privacidad' ? 'privacidadModal' : 'terminosModal';

    // Busca el elemento del modal en el DOM
    const modalElement = document.getElementById(modalId);

    // Si el elemento existe, crea una instancia de Bootstrap Modal y lo muestra
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show(); // Muestra el modal con las animaciones de Bootstrap
    }
  }
}