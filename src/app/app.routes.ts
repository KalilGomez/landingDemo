/* ============================================
   ROUTES - CONFIGURACIÓN DE RUTAS PRINCIPALES
   ============================================ */

import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ProductsComponent } from './page/products/products.component';
import { AboutUsComponent } from './page/about-us/about-us.component';
import { ServicesComponent } from './page/services/services.component';
import { ContactComponent } from './page/contact/contact.component';
import { ShopComponent } from './page/shop/shop.component';

/**
 * Configuración de rutas de la aplicación
 * 
 * Cada ruta mapea un path URL a un componente específico:
 * - path: '' (vacío) → Ruta raíz, redirige a /inicio
 * - path: 'inicio' → Componente Home
 * - path: 'productos' → Componente Products
 * - path: 'acerca-de' → Componente AboutUs
 * - path: 'servicios' → Componente Services
 * - path: 'contacto' → Componente Contact
 * - path: 'shop' → Componente Shop
 * - path: '**' → Wildcard para rutas no encontradas, redirige a /inicio
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path: 'productos',
    component: ProductsComponent
  },
  {
    path: 'acerca-de',
    component: AboutUsComponent
  },
  {
    path: 'servicios',
    component: ServicesComponent
  },
  {
    path: 'contacto',
    component: ContactComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];