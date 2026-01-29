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
import { ProductDetailComponent } from './page/product-detail/product-detail.component';

/**
 * Configuración de rutas de la aplicación
 * 
 * NUEVA RUTA AGREGADA:
 * - path: 'tienda/:id' → Vista de detalle del producto
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
    path: 'tienda/:id',
    component: ProductDetailComponent
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];