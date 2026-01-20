/* ============================================
   SHOP SERVICE - SERVICIO DE PRODUCTOS
   ============================================ */

/**
 * Servicio que gestiona los productos de la tienda
 * 
 * Archivo: src/app/services/shop.service.ts
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductFilter } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  /* ============================================
     DATOS DE PRODUCTOS (Mock Data)
     ============================================ */

  private products: Product[] = [
    {
      id: 1,
      name: 'Reloj Minimalista',
      category: 'Accesorios',
      price: 89.99,
      icon: 'bi-watch',
      badge: 'Nuevo',
      rating: 4.5,
      reviewCount: 128,
      description: 'Elegante reloj con diseño minimalista',
      inStock: true
    },
    {
      id: 2,
      name: 'Mochila Urbana',
      category: 'Bolsos',
      price: 69.99,
      oldPrice: 99.99,
      icon: 'bi-bag',
      badge: 'Oferta',
      rating: 4.0,
      reviewCount: 95,
      description: 'Mochila resistente al agua',
      inStock: true
    },
    {
      id: 3,
      name: 'Gafas de Sol',
      category: 'Lifestyle',
      price: 129.99,
      icon: 'bi-sunglasses',
      rating: 5.0,
      reviewCount: 203,
      description: 'Gafas con protección UV400',
      inStock: true
    },
    {
      id: 4,
      name: 'Billetera Premium',
      category: 'Accesorios',
      price: 49.99,
      icon: 'bi-wallet2',
      badge: 'Popular',
      rating: 4.5,
      reviewCount: 167,
      description: 'Billetera de cuero con protección RFID',
      inStock: true
    },
    {
      id: 5,
      name: 'Auriculares Inalámbricos',
      category: 'Tech',
      price: 159.99,
      icon: 'bi-headphones',
      rating: 4.0,
      reviewCount: 89,
      description: 'Auriculares con cancelación de ruido',
      inStock: true
    },
    {
      id: 6,
      name: 'Carcasa Minimalista',
      category: 'Tech',
      price: 24.99,
      oldPrice: 31.99,
      icon: 'bi-phone',
      badge: 'Oferta',
      rating: 5.0,
      reviewCount: 312,
      description: 'Carcasa delgada con protección',
      inStock: true
    },
    {
      id: 7,
      name: 'Libreta Premium',
      category: 'Papelería',
      price: 19.99,
      icon: 'bi-journal',
      rating: 3.5,
      reviewCount: 76,
      description: 'Libreta de papel reciclado',
      inStock: true
    },
    {
      id: 8,
      name: 'Taza Térmica',
      category: 'Hogar',
      price: 34.99,
      icon: 'bi-cup',
      badge: 'Nuevo',
      rating: 4.0,
      reviewCount: 54,
      description: 'Taza de acero inoxidable',
      inStock: true
    }
  ];

  /* ============================================
     STATE MANAGEMENT
     ============================================ */

  private filteredProductsSubject = new BehaviorSubject<Product[]>(this.products);
  public filteredProducts$ = this.filteredProductsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  /* ============================================
     MÉTODOS PÚBLICOS
     ============================================ */

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProducts(): Observable<Product[]> {
    return this.filteredProducts$;
  }

  getCategories(): string[] {
    const categories = this.products.map(p => p.category);
    return [...new Set(categories)];
  }

  filterProducts(filter: ProductFilter): void {
    this.loadingSubject.next(true);

    setTimeout(() => {
      let filtered = [...this.products];

      // Filtrar por categoría
      if (filter.category && filter.category !== 'Todos') {
        filtered = filtered.filter(p => p.category === filter.category);
      }

      // Filtrar por badge
      if (filter.badge && filter.badge !== 'Todos') {
        filtered = filtered.filter(p => p.badge === filter.badge);
      }

      // Filtrar por rango de precio
      if (filter.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= filter.minPrice!);
      }
      if (filter.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= filter.maxPrice!);
      }

      // Ordenar
      if (filter.sortBy) {
        filtered = this.sortProducts(filtered, filter.sortBy);
      }

      this.filteredProductsSubject.next(filtered);
      this.loadingSubject.next(false);
    }, 300);
  }

  private sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.filter(p => p.badge === 'Nuevo')
          .concat(sorted.filter(p => p.badge !== 'Nuevo'));
      case 'popular':
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        return sorted;
    }
  }

  resetFilters(): void {
    this.filteredProductsSubject.next([...this.products]);
  }

  getDiscount(product: Product): number {
    if (product.oldPrice) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return 0;
  }

  hasDiscount(product: Product): boolean {
    return !!product.oldPrice && product.oldPrice > product.price;
  }

  getStarArray(rating: number): { full: number; half: number; empty: number } {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return { full, half, empty };
  }
}