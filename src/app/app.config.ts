/* ============================================
   APP.CONFIG.TS - CONFIGURACIÓN GLOBAL DE LA APP
   ============================================ */

/**
 * Archivo app.config.ts
 *
 * Este archivo define la configuración global de la aplicación Angular.
 * 
 * En aplicaciones standalone (Angular 14+), este archivo reemplaza
 * al antiguo AppModule en cuanto a su función de declarar:
 * - Providers globales
 * - Routing
 * - Configuración del framework
 * 
 * Aquí se centraliza toda la configuración necesaria para inicializar 
 * correctamente la aplicación.
 */

/* ============================================
   IMPORTS
   ============================================ */

/**
 * ApplicationConfig
 * 
 * - Interfaz que define la forma del objeto de configuración usado por 
 *   bootstrapApplication().
 * - Permite especificar providers globales para toda la app.
 * 
 * provideZoneChangeDetection
 * 
 * - Configuración de Zone.js para Angular.
 * - Controla cómo Angular detecta y agrupa eventos del navegador.
 * - eventCoalescing: true → combina múltiples eventos en uno solo,
 *   mejorando la performance.
 * 
 * Importado desde: @angular/core
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

/**
 * provideRouter
 * 
 * - Función que registra el sistema de routing en la aplicación.
 * - Permite definir las rutas principales de la app standalone.
 * 
 * Importado desde: @angular/router
 */
import { provideRouter } from '@angular/router';

/**
 * routes
 * 
 * - Arreglo que contiene la definición de rutas de la aplicación.
 * - Cada ruta indica:
 *   - path (URL)
 *   - componente asociado
 *   - lazy loading, guards, etc.
 * 
 * Ruta: ./app.routes
 */
import { routes } from './app.routes';

/* ============================================
   CONFIGURACIÓN GLOBAL DE LA APLICACIÓN
   ============================================ */

/**
 * appConfig
 * 
 * Objeto utilizado por bootstrapApplication() para inicializar la aplicación.
 * 
 * Contiene:
 * - providers: Lista de servicios globales que Angular registrará al iniciar.
 * 
 * Providers incluidos:
 * 
 * 1) provideZoneChangeDetection({ eventCoalescing: true })
 *    - Optimiza la detección de cambios agrupando múltiples eventos.
 *    - Mejora el rendimiento en aplicaciones con muchos listeners.
 * 
 * 2) provideRouter(routes)
 *    - Activa el sistema de enrutamiento.
 *    - Registra todas las rutas definidas en app.routes.
 * 
 * Equivalente moderno al array "providers" del antiguo AppModule.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
