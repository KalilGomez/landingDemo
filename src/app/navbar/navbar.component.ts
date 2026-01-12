/* ============================================
   IMPORTS Y DEPENDENCIAS
   ============================================ */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Directivas comunes de Angular
import { ScrollSpyService } from '../services/scroll-spy.service'; // Servicio personalizado para manejo de scroll
import { Subscription } from 'rxjs'; // Para manejar suscripciones a observables

/* ============================================
   CONFIGURACIÓN DEL COMPONENTE
   ============================================ */

@Component({
  selector: 'app-navbar',
  standalone: true, // Componente standalone (no requiere módulo)
  imports: [CommonModule], // Importa directivas necesarias (*ngFor, *ngIf, etc.)
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  /* ============================================
     PROPIEDADES DEL COMPONENTE
     ============================================ */

  /**
   * Sección actualmente visible en el viewport
   * Se actualiza automáticamente mediante el ScrollSpyService
   * @default 'home'
   */
  activeSection: string = 'home';

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
   * Cada item contiene: id (anchor), label (texto visible), icon (clase de Bootstrap Icons)
   * 
   * Estructura de cada item:
   * - id: identificador de la sección HTML (#home, #productos, etc.)
   * - label: texto que se muestra en el menú
   * - icon: clase de Bootstrap Icons para el ícono
   */
  menuItems = [
    { id: 'home', label: 'Inicio', icon: 'bi bi-house' },
    { id: 'productos', label: 'Productos', icon: 'bi bi-eyeglasses' },
    { id: 'acerca-de', label: 'Acerca de', icon: 'bi bi-info-circle' },
    { id: 'servicios', label: 'Servicios', icon: 'bi bi-tools' },
    { id: 'contacto', label: 'Contacto', icon: 'bi bi-telephone' }
  ];

  /* ============================================
     CONSTRUCTOR
     ============================================ */

  /**
   * Inyecta el servicio ScrollSpyService para manejar:
   * - Detección de sección activa basada en scroll
   * - Navegación suave entre secciones
   * 
   * @param scrollSpyService - Servicio que monitorea el scroll y gestiona navegación
   */
  constructor(private scrollSpyService: ScrollSpyService) { }

  /* ============================================
     LIFECYCLE HOOKS
     ============================================ */

  /**
   * Hook de inicialización del componente
   * Se ejecuta una vez después de que Angular inicializa las propiedades
   * 
   * Configura la suscripción al observable activeSection$ del ScrollSpyService
   * para mantener sincronizada la sección activa con el scroll del usuario
   */
  ngOnInit(): void {
    // Suscribe al observable que emite la sección activa
    this.subscription.add(
      this.scrollSpyService.activeSection$.subscribe(
        (section: string) => {
          this.activeSection = section; // Actualiza la sección activa
        }
      )
    );
  }

  /**
   * Hook de destrucción del componente
   * Se ejecuta justo antes de que Angular destruya el componente
   * 
   * Limpia todas las suscripciones para evitar memory leaks
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Cancela todas las suscripciones activas
  }

  /* ============================================
     MÉTODOS DE NAVEGACIÓN
     ============================================ */

  /**
   * Navega a una sección específica de la página mediante scroll suave
   * Si el menú móvil está abierto, lo cierra automáticamente
   * 
   * @param sectionId - ID de la sección HTML a la que se desea navegar
   * @returns void
   * 
   * Ejemplo de uso en template:
   * (click)="navigateToSection('productos')"
   */
  navigateToSection(sectionId: string): void {
    // Delega el scroll al servicio que maneja la lógica de scroll suave
    this.scrollSpyService.scrollToSection(sectionId);

    // Cierra el menú móvil si está abierto (mejora UX en móviles)
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /**
   * Verifica si una sección es la actualmente activa
   * Utilizado para aplicar estilos visuales al enlace de la sección visible
   * 
   * @param sectionId - ID de la sección a verificar
   * @returns true si la sección está activa, false en caso contrario
   * 
   * Ejemplo de uso en template:
   * [class.active]="isActiveSection('home')"
   */
  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  /**
   * Hace scroll suave hasta el inicio (top) de la página
   * Utilizado principalmente en el logo del navbar
   * 
   * @returns void
   * 
   * Ejemplo de uso en template:
   * (click)="scrollToTop()"
   */
  scrollToTop(): void {
    this.scrollSpyService.scrollToTop();
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
    // Invierte el estado actual (abierto ↔ cerrado)
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Controla el overflow del body según el estado del menú
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'; // Bloquea scroll del fondo
    } else {
      document.body.style.overflow = ''; // Restaura scroll normal
    }
  }

  /**
   * Cierra el menú móvil y restaura el scroll normal del body
   * Utilizado cuando el usuario:
   * - Hace click en el overlay
   * - Selecciona un enlace del menú
   * 
   * @returns void
   * 
   * Ejemplo de uso en template:
   * (click)="closeMobileMenu()"
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = ''; // Restaura scroll del body
  }
}