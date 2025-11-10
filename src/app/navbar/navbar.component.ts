// src/app/shared/navbar/navbar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSpyService } from '../services/scroll-spy.service'; // Ajustar ruta según tu estructura
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  activeSection: string = 'home';
  isMobileMenuOpen: boolean = false;
  private subscription: Subscription = new Subscription();

  // Enlaces del menú (con IDs que coinciden con los del service)
  menuItems = [
    { id: 'home', label: 'Inicio', icon: 'bi bi-house' },
    { id: 'productos', label: 'Productos', icon: 'bi bi-eyeglasses' },
    { id: 'acerca-de', label: 'Acerca de', icon: 'bi bi-info-circle' },
    { id: 'servicios', label: 'Servicios', icon: 'bi bi-tools' },
    { id: 'contacto', label: 'Contacto', icon: 'bi bi-telephone' }
  ];

  constructor(private scrollSpyService: ScrollSpyService) { }

  ngOnInit(): void {
    // Suscribirse a cambios de sección activa
    this.subscription.add(
      this.scrollSpyService.activeSection$.subscribe(
        (section: string) => {
          this.activeSection = section;
        }
      )
    );
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones
    this.subscription.unsubscribe();
  }

  /**
   * Navegar a una sección específica
   */
  navigateToSection(sectionId: string): void {
    console.log(`Navegando a sección: ${sectionId}`); // Debug
    this.scrollSpyService.scrollToSection(sectionId);
    
    // Cerrar menú móvil al navegar
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /**
   * Verificar si una sección está activa
   */
  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  /**
   * Scroll al inicio
   */
  scrollToTop(): void {
    this.scrollSpyService.scrollToTop();
  }

  /**
   * Toggle del menú móvil
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Prevenir scroll del body cuando el menú está abierto
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Cerrar menú móvil
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}