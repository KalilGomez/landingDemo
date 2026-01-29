/* ============================================
   SHOP COMPONENT
   ============================================ */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit, OnDestroy {

  // Productos totales del servicio
  allProducts: Product[] = [];
  
  // Productos a mostrar en la página actual
  products: Product[] = [];
  
  // Categorías disponibles
  categories: string[] = [];
  
  // Estado de carga
  loading: boolean = false;
  
  // Filtro activo
  activeFilter: string = 'Todos';
  
  // Orden seleccionado
  selectedSort: string = '';

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;

  private subscription: Subscription = new Subscription();

  constructor(public shopService: ShopService) { }

  ngOnInit(): void {
    // Suscribirse a los productos del servicio
    this.subscription.add(
      this.shopService.getProducts().subscribe(products => {
        this.allProducts = products;
        this.calculatePagination();
        this.updateDisplayedProducts();
      })
    );

    // Suscribirse al estado de carga
    this.subscription.add(
      this.shopService.loading$.subscribe(loading => {
        this.loading = loading;
      })
    );

    // Obtener categorías
    this.categories = ['Todos', ...this.shopService.getCategories()];

    // Cargar productos iniciales
    this.shopService.resetFilters();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /* ============================================
     PAGINACIÓN
     ============================================ */

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.allProducts.length / this.itemsPerPage);
    
    // Si la página actual es mayor que el total, volver a la primera
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = 1;
    }
  }

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.products = this.allProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProducts();
      this.scrollToTop();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
      this.scrollToTop();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
      this.scrollToTop();
    }
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ============================================
     FILTROS
     ============================================ */

  // Filtrar por badge (Todos, Nuevo, Ofertas, Populares)
  filterByBadge(filter: string): void {
    this.activeFilter = filter;
    this.currentPage = 1; // Reset a página 1

    const filterConfig: any = {
      badge: filter
    };

    if (this.selectedSort) {
      filterConfig.sortBy = this.selectedSort;
    }

    this.shopService.filterProducts(filterConfig);
    
    // Scroll a la sección de productos
    setTimeout(() => {
      const productsSection = document.querySelector('.products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // Filtrar por categoría
  filterByCategory(category: string): void {
    this.currentPage = 1; // Reset a página 1
    
    const filterConfig: any = {
      category: category
    };

    if (this.selectedSort) {
      filterConfig.sortBy = this.selectedSort;
    }

    this.shopService.filterProducts(filterConfig);
    
    // Scroll a la sección de productos
    setTimeout(() => {
      const productsSection = document.querySelector('.products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // Ordenar productos
  sortProducts(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedSort = select.value;
    this.currentPage = 1; // Reset a página 1

    if (this.selectedSort) {
      const filterConfig: any = {
        sortBy: this.selectedSort
      };

      if (this.activeFilter !== 'Todos') {
        filterConfig.badge = this.activeFilter;
      }

      this.shopService.filterProducts(filterConfig);
    }
  }

  /* ============================================
     MÉTODOS AUXILIARES
     ============================================ */

  // Obtiene el array de estrellas para mostrar el rating
  getStars(rating: number): { full: number; half: number; empty: number } {
    return this.shopService.getStarArray(rating);
  }

  // Calcula el porcentaje de descuento
  getDiscount(product: Product): number {
    return this.shopService.getDiscount(product);
  }

  // Verifica si un producto tiene descuento
  hasDiscount(product: Product): boolean {
    return this.shopService.hasDiscount(product);
  }

  // Devuelve la clase CSS del badge según el tipo
  getBadgeClass(badge: string | undefined): string {
    if (!badge) return '';
    
    switch (badge) {
      case 'Oferta':
        return 'sale';
      case 'Nuevo':
        return 'new';
      case 'Popular':
        return 'popular';
      default:
        return '';
    }
  }

  /* ============================================
     ACCIONES
     ============================================ */

  // Agrega producto al carrito (placeholder)
  addToCart(product: Product): void {
    console.log('Agregado al carrito:', product);
  }

  // Agrega/quita de favoritos (placeholder)
  toggleFavorite(product: Product): void {
    console.log('Toggle favorito:', product);
  }

  // Muestra vista rápida del producto (placeholder)
  quickView(product: Product): void {
    console.log('Vista rápida:', product);
  }
}