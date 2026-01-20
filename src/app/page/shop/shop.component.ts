/* ============================================
   SHOP COMPONENT
   ============================================ */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit, OnDestroy {

  // Productos a mostrar
  products: Product[] = [];
  
  // Categorías disponibles
  categories: string[] = [];
  
  // Estado de carga
  loading: boolean = false;
  
  // Filtro activo
  activeFilter: string = 'Todos';
  
  // Orden seleccionado
  selectedSort: string = '';

  private subscription: Subscription = new Subscription();

  constructor(public shopService: ShopService) { }

  ngOnInit(): void {
    // Suscribirse a los productos del servicio
    this.subscription.add(
      this.shopService.getProducts().subscribe(products => {
        this.products = products;
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

  // Filtrar por badge (Todos, Nuevo, Ofertas, Populares)
  filterByBadge(filter: string): void {
    this.activeFilter = filter;

    const filterConfig: any = {
      badge: filter
    };

    if (this.selectedSort) {
      filterConfig.sortBy = this.selectedSort;
    }

    this.shopService.filterProducts(filterConfig);
  }

  // Filtrar por categoría
  filterByCategory(category: string): void {
    const filterConfig: any = {
      category: category
    };

    if (this.selectedSort) {
      filterConfig.sortBy = this.selectedSort;
    }

    this.shopService.filterProducts(filterConfig);
  }

  // Ordenar productos
  sortProducts(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedSort = select.value;

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