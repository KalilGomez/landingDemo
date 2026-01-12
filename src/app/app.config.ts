/* ============================================
   APP.CONFIG.TS - CONFIGURACIÓN DE LA APLICACIÓN
   ============================================ */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';

/**
 * Configuración principal de la aplicación
 * 
 * Providers incluidos:
 * - provideZoneChangeDetection: Optimiza la detección de cambios
 * - provideRouter: Configura el sistema de rutas
 *   - withInMemoryScrolling: Scroll automático al cambiar de ruta
 *   - withViewTransitions: Transiciones suaves entre vistas (opcional)
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      // Scroll automático al top al cambiar de ruta
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      // Transiciones suaves (opcional, puedes comentar si no las quieres)
      withViewTransitions()
    )
  ]
};