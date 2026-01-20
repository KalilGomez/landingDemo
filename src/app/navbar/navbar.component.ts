/* ============================================
   NAVBAR COMPONENT - VERSIÓN CON ANGULAR ROUTER
   ============================================ */

/**
 * CAMBIOS REALIZADOS:
 * - Eliminado ScrollSpyService (ya no es necesario)
 * - Agregado RouterModule para usar routerLink y routerLinkActive
 * - Cambiado 'id' por 'route' en menuItems
 * - Eliminados métodos de scroll (navigateToSection, scrollToTop)
 * - El router maneja automáticamente la navegación y la clase active
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule  // ← NUEVO: Importa RouterLink y RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  /* ============================================
     PROPIEDADES
     ============================================ */

  /**
   * Estado del menú móvil (abierto/cerrado)
   * Controla la visibilidad del panel lateral en dispositivos móviles
   */
  isMobileMenuOpen: boolean = false;

  /**
   * Items del menú de navegación
   * ACTUALIZADO: Ahora usa 'route' en lugar de 'id'
   * 
   * Estructura de cada item:
   * - route: ruta de Angular (/inicio, /productos, etc.)
   * - label: texto que se muestra en el menú
   * - icon: clase de Bootstrap Icons para el ícono
   */
  menuItems = [
    { route: '/inicio', label: 'Inicio', icon: 'bi bi-house' },
    { route: '/productos', label: 'Productos', icon: 'bi bi-eyeglasses' },
    { route: '/acerca-de', label: 'Acerca de', icon: 'bi bi-info-circle' },
    { route: '/servicios', label: 'Servicios', icon: 'bi bi-tools' },
    { route: '/contacto', label: 'Contacto', icon: 'bi bi-telephone' },
    { route: '/tienda', label: 'Tienda', icon: 'bi bi-cart' }
  ];

  /* ============================================
     MÉTODOS DEL MENÚ MÓVIL
     ============================================ */

  /**
   * Alterna el estado del menú móvil entre abierto y cerrado
   * También controla el overflow del body para prevenir scroll
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
   * Se llama cuando:
   * - El usuario hace click en el overlay
   * - El usuario hace click en un enlace del menú
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}