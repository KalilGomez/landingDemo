/* ============================================
   NAVBAR COMPONENT - VERSIÓN CON ANGULAR ROUTER
   ============================================ */

import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { FavoritesService } from '../services/favorites.service';
import { Subscription } from 'rxjs';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { FavoritesModalComponent } from '../favorites-modal/favorites-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CartModalComponent,
    FavoritesModalComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  /* ============================================
     PROPIEDADES
     ============================================ */

  isMobileMenuOpen: boolean = false;
  showCartModal: boolean = false;
  showFavoritesModal: boolean = false;
  
  // Contadores
  cartCount: number = 0;
  favoritesCount: number = 0;

  // Subscripciones
  private subscription = new Subscription();

  menuItems = [
    { route: '/inicio', label: 'Inicio', icon: 'bi bi-house' },
    { route: '/productos', label: 'Productos', icon: 'bi bi-eyeglasses' },
    { route: '/acerca-de', label: 'Acerca de', icon: 'bi bi-info-circle' },
    { route: '/servicios', label: 'Servicios', icon: 'bi bi-tools' },
    { route: '/contacto', label: 'Contacto', icon: 'bi bi-telephone' }
  ];

  /* ============================================
     CONSTRUCTOR
     ============================================ */

  constructor(
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}

  /* ============================================
     LIFECYCLE HOOKS
     ============================================ */

  ngOnInit(): void {
    // Suscribirse al contador del carrito
    this.subscription.add(
      this.cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      })
    );

    // Suscribirse al contador de favoritos
    this.subscription.add(
      this.favoritesService.favoritesCount$.subscribe(count => {
        this.favoritesCount = count;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /* ============================================
     MÉTODOS DEL MENÚ MÓVIL
     ============================================ */

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  /* ============================================
     MÉTODOS PARA MODALES
     ============================================ */

  openCartModal(): void {
    this.showCartModal = true;
    this.closeMobileMenu();
    document.body.style.overflow = 'hidden';
  }

  closeCartModal(): void {
    this.showCartModal = false;
    document.body.style.overflow = '';
  }

  openFavoritesModal(): void {
    this.showFavoritesModal = true;
    this.closeMobileMenu();
    document.body.style.overflow = 'hidden';
  }

  closeFavoritesModal(): void {
    this.showFavoritesModal = false;
    document.body.style.overflow = '';
  }

  /* ============================================
     LISTENER PARA CERRAR MENÚ CON ESC
     ============================================ */

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
    if (this.showCartModal) {
      this.closeCartModal();
    }
    if (this.showFavoritesModal) {
      this.closeFavoritesModal();
    }
  }
}