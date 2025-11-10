// src/app/services/scroll-spy.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, Subscription } from 'rxjs';
import { throttleTime, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService implements OnDestroy {
  // Observable para la sección activa
  private activeSection = new BehaviorSubject<string>('home');
  public activeSection$: Observable<string> = this.activeSection.asObservable();

  // Mapeo de secciones (actualizado según tu navbar)
  private sections: string[] = ['home', 'productos', 'acerca-de', 'servicios', 'contacto'];
  
  // Subscripción para el scroll listener
  private scrollSubscription?: Subscription;
  
  // Flag para evitar conflictos entre scroll automático y manual
  private isScrolling = false;

  constructor() {
    // Inicializar el listener después de que el DOM esté listo
    setTimeout(() => {
      this.initScrollListener();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  /**
   * Inicializa el listener de scroll automático
   */
  private initScrollListener(): void {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(50),
        debounceTime(10)
      )
      .subscribe(() => {
        if (!this.isScrolling) {
          this.detectActiveSection();
        }
      });
  }

  /**
   * Actualiza la sección activa
   */
  updateActiveSection(sectionId: string): void {
    if (this.sections.includes(sectionId) && this.activeSection.value !== sectionId) {
      this.activeSection.next(sectionId);
    }
  }

  /**
   * Obtiene la sección activa actual
   */
  getCurrentActiveSection(): string {
    return this.activeSection.value;
  }

  /**
   * Hace scroll suave hacia una sección específica
   */
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`Sección '${sectionId}' no encontrada`);
      return;
    }

    // Prevenir detección automática durante el scroll manual
    this.isScrolling = true;

    // Obtener la altura del navbar
    const navbar = document.querySelector('.navbar-container') as HTMLElement;
    const navbarHeight = navbar?.offsetHeight || 80;
    
    // Calcular posición final
    const elementPosition = element.offsetTop;
    const offsetPosition = Math.max(0, elementPosition - navbarHeight - 20);

    // Scroll suave
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Actualizar sección activa inmediatamente
    this.updateActiveSection(sectionId);

    // Reactivar detección automática después del scroll
    setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }

  /**
   * Detecta automáticamente qué sección está visible
   */
  detectActiveSection(): void {
    const navbar = document.querySelector('.navbar-container') as HTMLElement;
    const navbarHeight = navbar?.offsetHeight || 80;
    
    // Posición actual del scroll + offset del navbar
    const scrollPosition = window.pageYOffset + navbarHeight + 100;
    
    // Detectar si estamos cerca del final de la página
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const isNearBottom = (window.pageYOffset + windowHeight) >= (documentHeight - 100);

    // Si estamos cerca del final, activar la última sección
    if (isNearBottom) {
      const lastSection = this.sections[this.sections.length - 1];
      this.updateActiveSection(lastSection);
      return;
    }

    // Si estamos al inicio de la página
    if (window.pageYOffset < 100) {
      this.updateActiveSection('home');
      return;
    }

    // Buscar la sección activa
    for (let i = 0; i < this.sections.length; i++) {
      const sectionId = this.sections[i];
      const element = document.getElementById(sectionId);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        const elementBottom = elementTop + rect.height;

        // Si esta sección está visible
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          this.updateActiveSection(sectionId);
          break;
        }
      }
    }
  }

  /**
   * Obtiene todas las secciones disponibles
   */
  getAllSections(): string[] {
    return [...this.sections];
  }

  /**
   * Scroll al inicio de la página
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.updateActiveSection('home');
  }

  /**
   * Verifica si una sección existe
   */
  sectionExists(sectionId: string): boolean {
    return this.sections.includes(sectionId) && !!document.getElementById(sectionId);
  }
}