/* ============================================
   PRODUCT MODEL - INTERFACE DE PRODUCTO
   ============================================ */

/**
 * Interface que define la estructura de un producto
 * 
 * Archivo: src/app/models/product.model.ts
 */

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;           // Precio anterior (opcional, para mostrar descuentos)
  image?: string;              // URL de imagen real (opcional)
  icon: string;                // Icono de Bootstrap Icons (ej: 'bi-watch')
  badge?: string;              // Badge del producto: 'Nuevo', 'Oferta', 'Popular'
  rating: number;              // Puntuación de 0 a 5
  reviewCount: number;         // Cantidad de reseñas
  description?: string;        // Descripción del producto (opcional)
  inStock?: boolean;           // Si está en stock (opcional, default true)
}

/**
 * Interface para filtros de productos
 */
export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  badge?: string;              // 'Nuevo', 'Oferta', 'Popular', 'Todos'
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
}