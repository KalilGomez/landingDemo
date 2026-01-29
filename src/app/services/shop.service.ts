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
      images: [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        'https://images.unsplash.com/photo-1495856458515-0637185db551?w=500'
      ],
      icon: 'bi-watch',
      badge: 'Nuevo',
      rating: 4.5,
      reviewCount: 128,
      description: 'Elegante reloj con diseño minimalista',
      fullDescription: 'Reloj de pulsera con diseño minimalista contemporáneo. Caja de acero inoxidable con acabado pulido y correa de cuero genuino. Movimiento de cuarzo japonés de alta precisión. Resistente al agua hasta 50m.',
      features: [
        'Correa de cuero genuino',
        'Movimiento de cuarzo japonés',
        'Resistente al agua 50m',
        'Garantía de 2 años'
      ],
      specifications: {
        'Material': 'Acero inoxidable',
        'Diámetro': '40mm',
        'Grosor': '8mm',
        'Tipo de movimiento': 'Cuarzo'
      },
      stock: 15,
      inStock: true
    },
    {
      id: 2,
      name: 'Mochila Urbana',
      category: 'Bolsos',
      price: 69.99,
      oldPrice: 99.99,
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500',
        'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=500'
      ],
      icon: 'bi-bag',
      badge: 'Oferta',
      rating: 4.0,
      reviewCount: 95,
      description: 'Mochila resistente al agua',
      fullDescription: 'Mochila urbana perfecta para el día a día. Fabricada con material resistente al agua con costuras selladas. Compartimento acolchado para laptop de hasta 15.6 pulgadas. Múltiples bolsillos organizadores y correas ergonómicas.',
      features: [
        'Resistente al agua',
        'Compartimento para laptop 15.6"',
        'Puerto USB de carga',
        'Bolsillo antirrobo trasero'
      ],
      specifications: {
        'Material': 'Poliéster resistente',
        'Capacidad': '25 litros',
        'Dimensiones': '45x30x15 cm',
        'Peso': '800g'
      },
      stock: 8,
      inStock: true
    },
    {
      id: 3,
      name: 'Gafas de Sol',
      category: 'Lifestyle',
      price: 129.99,
      images: [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
        'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500'
      ],
      icon: 'bi-sunglasses',
      rating: 5.0,
      reviewCount: 203,
      description: 'Gafas con protección UV400',
      fullDescription: 'Gafas de sol de alta calidad con lentes polarizadas y protección UV400. Marco de acetato premium con bisagras de resorte. Diseño atemporal que combina con cualquier estilo. Incluye estuche rígido y paño de limpieza.',
      features: [
        'Lentes polarizadas',
        'Protección UV400',
        'Marco de acetato premium',
        'Incluye estuche y paño'
      ],
      specifications: {
        'Material del marco': 'Acetato',
        'Tipo de lente': 'Polarizada',
        'Protección UV': 'UV400',
        'Ancho': '145mm'
      },
      stock: 22,
      inStock: true
    },
    {
      id: 4,
      name: 'Billetera Premium',
      category: 'Accesorios',
      price: 49.99,
      images: [
        'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
        'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500',
        'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500'
      ],
      icon: 'bi-wallet2',
      badge: 'Popular',
      rating: 4.5,
      reviewCount: 167,
      description: 'Billetera de cuero con protección RFID',
      fullDescription: 'Billetera compacta de cuero genuino con tecnología de bloqueo RFID para proteger tus tarjetas. Diseño slim que cabe cómodamente en cualquier bolsillo. Múltiples compartimentos para tarjetas, billetes y monedas.',
      features: [
        'Cuero genuino premium',
        'Protección RFID',
        '8 ranuras para tarjetas',
        'Diseño compacto'
      ],
      specifications: {
        'Material': 'Cuero genuino',
        'Dimensiones': '11x9x2 cm',
        'Capacidad': '8 tarjetas',
        'Color': 'Negro / Marrón'
      },
      stock: 30,
      inStock: true
    },
    {
      id: 5,
      name: 'Auriculares Inalámbricos',
      category: 'Tech',
      price: 159.99,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
        'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500'
      ],
      icon: 'bi-headphones',
      rating: 4.0,
      reviewCount: 89,
      description: 'Auriculares con cancelación de ruido',
      fullDescription: 'Auriculares over-ear con cancelación activa de ruido y audio de alta fidelidad. Batería de larga duración hasta 30 horas. Conectividad Bluetooth 5.0 y conexión por cable auxiliar. Almohadillas de espuma con memoria para máximo confort.',
      features: [
        'Cancelación activa de ruido',
        'Batería 30 horas',
        'Bluetooth 5.0',
        'Audio de alta fidelidad'
      ],
      specifications: {
        'Tipo': 'Over-ear',
        'Batería': '30 horas',
        'Bluetooth': '5.0',
        'Respuesta de frecuencia': '20Hz - 20kHz'
      },
      stock: 12,
      inStock: true
    },
    {
      id: 6,
      name: 'Carcasa Minimalista',
      category: 'Tech',
      price: 24.99,
      oldPrice: 31.99,
      images: [
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
        'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500',
        'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500'
      ],
      icon: 'bi-phone',
      badge: 'Oferta',
      rating: 5.0,
      reviewCount: 312,
      description: 'Carcasa delgada con protección',
      fullDescription: 'Carcasa ultra delgada con protección antimicrobiana integrada. Material flexible pero resistente que absorbe impactos. Bordes elevados para proteger cámara y pantalla. Compatible con carga inalámbrica.',
      features: [
        'Protección antimicrobiana',
        'Ultra delgada',
        'Compatible con carga inalámbrica',
        'Bordes elevados'
      ],
      specifications: {
        'Material': 'TPU flexible',
        'Grosor': '1.5mm',
        'Compatibilidad': 'iPhone / Samsung',
        'Certificación': 'Militar MIL-STD-810G'
      },
      stock: 50,
      inStock: true
    },
    {
      id: 7,
      name: 'Libreta Premium',
      category: 'Papelería',
      price: 19.99,
      images: [
        'https://images.unsplash.com/photo-1517971071642-9003d8c4e1c5?w=500',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500',
        'https://images.unsplash.com/photo-1531346590655-ab11abc46705?w=500'
      ],
      icon: 'bi-journal',
      rating: 3.5,
      reviewCount: 76,
      description: 'Libreta de papel reciclado',
      fullDescription: 'Libreta de lujo con papel reciclado de 100gsm. Tapa dura con acabado de tela premium. Papel sin ácidos ideal para escritura y bocetos. Incluye marcador de página y bolsillo interior.',
      features: [
        'Papel reciclado 100gsm',
        'Tapa dura premium',
        '192 páginas',
        'Marcador incluido'
      ],
      specifications: {
        'Tamaño': 'A5 (21x14.8 cm)',
        'Páginas': '192',
        'Tipo de papel': 'Reciclado sin ácido',
        'Encuadernación': 'Cosida'
      },
      stock: 18,
      inStock: true
    },
    {
      id: 8,
      name: 'Taza Térmica',
      category: 'Hogar',
      price: 34.99,
      images: [
        'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500',
        'https://images.unsplash.com/photo-1534832467-6c9b1c5b0b9f?w=500',
        'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=500'
      ],
      icon: 'bi-cup',
      badge: 'Nuevo',
      rating: 4.0,
      reviewCount: 54,
      description: 'Taza de acero inoxidable',
      fullDescription: 'Taza térmica de doble pared de acero inoxidable. Mantiene bebidas calientes por 6 horas y frías por 12 horas. Tapa hermética a prueba de derrames. Apta para lavavajillas.',
      features: [
        'Doble pared de acero inoxidable',
        'Mantiene temperatura 12h',
        'Tapa hermética',
        'Apta para lavavajillas'
      ],
      specifications: {
        'Capacidad': '500ml',
        'Material': 'Acero inoxidable 18/8',
        'Altura': '18cm',
        'Diámetro': '8.5cm'
      },
      stock: 25,
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

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
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