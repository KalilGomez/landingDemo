/* ============================================
   APP.ROUTES.TS - CONFIGURACIÓN DE RUTAS
   ============================================ */

import { Routes } from '@angular/router';

/**
 * Definición de rutas de la aplicación
 * 
 * Cada ruta mapea una URL a un componente específico:
 * - path: URL relativa (ej: 'productos' → localhost:4200/productos)
 * - loadComponent: Carga lazy del componente (mejor performance)
 * - title: Título de la pestaña del navegador (SEO)
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./page/home/home.component').then(m => m.HomeComponent),
    title: 'Inicio - Landing Demo'
  },
  {
    path: 'productos',
    loadComponent: () => import('./page/products/products.component').then(m => m.ProductsComponent),
    title: 'Productos - Landing Demo'
  },
  {
    path: 'servicios',
    loadComponent: () => import('./page/services/services.component').then(m => m.ServicesComponent),
    title: 'Servicios - Landing Demo'
  },
  {
    path: 'acerca-de',
    loadComponent: () => import('./page/about-us/about-us.component').then(m => m.AboutUsComponent),
    title: 'Acerca de - Landing Demo'
  },
  {
    path: 'contacto',
    loadComponent: () => import('./page/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contacto - Landing Demo'
  },
  {
    path: 'shop',
    loadComponent: () => import('./page/shop/shop.component').then(m => m.ShopComponent),
    title: 'Tienda - Landing Demo'
  },
  {
    // Ruta wildcard: redirige cualquier ruta no encontrada al home
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];