/* ============================================
   ROUTES - CONFIGURACIÓN DE RUTAS PRINCIPALES
   ============================================ */

/**
 * Archivo de definición de rutas de la aplicación Angular
 * 
 * Este archivo se utiliza para declarar el arreglo de rutas
 * que define la navegación dentro de la aplicación.
 * 
 * Flujo de uso:
 * 1. Se importa la interfaz Routes desde @angular/router
 * 2. Se crea un arreglo de objetos de ruta
 * 3. Cada objeto define un path y el componente asociado
 * 4. Este arreglo se provee al enrutador mediante provideRouter()
 */

/* ============================================
   IMPORTS
   ============================================ */

/**
 * Routes
 * Interfaz de Angular que representa un conjunto de rutas.
 * 
 * Cada ruta puede incluir:
 * - path: la URL que activa la ruta
 * - component: el componente que se renderiza
 * - redirectTo: redirecciones automáticas
 * - children: rutas hijas (nested routing)
 * - canActivate / canDeactivate: guards de navegación
 * 
 * Importado desde: @angular/router
 * Este package contiene las APIs necesarias para implementar routing.
 */
import { Routes } from '@angular/router';

/* ============================================
   DECLARACIÓN DE RUTAS
   ============================================ */

/**
 * routes
 * Constante que define el arreglo de rutas de la aplicación.
 * 
 * Inicialmente vacío, se completa con objetos de ruta:
 * Ejemplo:
 * { path: 'home', component: HomeComponent }
 * 
 * Este arreglo se exporta para ser usado en app.config.ts
 */
export const routes: Routes = [];
