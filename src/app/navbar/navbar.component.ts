/* ============================================
   IMPORTS Y DEPENDENCIAS
   ============================================ */

import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router'; // Módulos de routing
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

/* ============================================
   CONFIGURACIÓN DEL COMPONENTE
   ============================================ */

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule // IMPORTANTE: Importar RouterModule para usar routerLink y routerLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {

  /* ============================================
     PROPIEDADES DEL COMPONENTE
     ============================================ */

  /**
   * Estado del menú móvil (abierto/cerrado)
   * Controla la visibilidad del panel lateral en dispositivos móviles
   * @default false
   */
  isMobileMenuOpen: boolean = false;

  /**
   * Contenedor de todas las suscripciones del componente
   * Facilita la limpieza de memoria al destruir el componente
   */
  private subscription: Subscription = new Subscription();

  /**
   * Array de items del menú de navegación
   * Cada item contiene: id, label, icon y route (ruta de navegación)
   * 
   * Estructura de cada item:
   * - id: identificador único del item
   * - label: texto que se muestra en el menú
   * - icon: clase de Bootstrap Icons para el ícono
   * - route: ruta de Angular Router (debe coincidir con las rutas definidas en app.routes.ts)
   */
  menuItems = [
    { id: 'home', label: 'Inicio', icon: 'bi bi-house', route: '/' },
    { id: 'productos', label: 'Productos', icon: 'bi bi-eyeglasses', route: '/productos' },
    { id: 'acerca-de', label: 'Acerca de', icon: 'bi bi-info-circle', route: '/acerca-de' },
    { id: 'servicios', label: 'Servicios', icon: 'bi bi-tools', route: '/servicios' },
    { id: 'contacto', label: 'Contacto', icon: 'bi bi-telephone', route: '/contacto' }
  ];

  /* ============================================
     CONSTRUCTOR
     ============================================ */

  /**
   * Inyecta el Router de Angular para:
   * - Detectar cambios de ruta
   * - Cerrar automáticamente el menú móvil en cada navegación
   * 
   * @param router - Servicio de Angular Router
   */
  constructor(private router: Router) {
    // Suscribe a los eventos de navegación para cerrar el menú móvil automáticamente
    this.subscription.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        // Cierra el menú móvil después de cada navegación exitosa
        this.closeMobileMenu();
        // Hace scroll al top de la página en cada cambio de ruta
        window.scrollTo(0, 0);
      })
    );
  }

  /* ============================================
     LIFECYCLE HOOKS
     ============================================ */

  /**
   * Hook de destrucción del componente
   * Se ejecuta justo antes de que Angular destruya el componente
   * 
   * Limpia todas las suscripciones para evitar memory leaks
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /* ============================================
     MÉTODOS DEL MENÚ MÓVIL
     ============================================ */

  /**
   * Alterna el estado del menú móvil entre abierto y cerrado
   * También controla el overflow del body para prevenir scroll cuando el menú está abierto
   * 
   * Comportamiento:
   * - Abierto: bloquea el scroll del body (overflow: hidden)
   * - Cerrado: restaura el scroll normal del body
   * 
   * @returns void
   * 
   * Ejemplo de uso en template:
   * (click)="toggleMobileMenu()"
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Cierra el menú móvil y restaura el scroll normal del body
   * Se ejecuta automáticamente al:
   * - Hacer click en el overlay
   * - Hacer click en cualquier enlace del menú
   * - Completar una navegación
   * 
   * @returns void
   * 
   * Ejemplo de uso en template:
   * (click)="closeMobileMenu()"
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}