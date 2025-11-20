/* ============================================
   MAIN.TS - PUNTO DE ENTRADA DE LA APLICACIÓN
   ============================================ */

/**
 * Archivo main.ts - Entry point de la aplicación Angular
 * 
 * Este es el primer archivo TypeScript que se ejecuta cuando la aplicación inicia.
 * Es responsable de "arrancar" (bootstrap) la aplicación Angular.
 * 
 * Flujo de ejecución:
 * 1. index.html carga los bundles JS compilados
 * 2. El navegador ejecuta main.ts (compilado a main.js)
 * 3. main.ts inicializa la aplicación Angular
 * 4. Angular renderiza AppComponent en <app-root>
 */

/* ============================================
   IMPORTS
   ============================================ */

/**
 * bootstrapApplication
 * Función que inicializa una aplicación Angular standalone
 * 
 * Diferencia con versiones anteriores:
 * - Angular <14: se usaba platformBrowserDynamic().bootstrapModule(AppModule)
 * - Angular 14+: se puede usar bootstrapApplication para apps standalone sin NgModule
 * 
 * Importado desde: @angular/platform-browser
 * Este package contiene las APIs necesarias para ejecutar Angular en el navegador
 */
import { bootstrapApplication } from '@angular/platform-browser';

/**
 * AppComponent
 * Componente raíz de la aplicación
 * 
 * Es el componente principal que:
 * - Se monta en el selector <app-root> del index.html
 * - Contiene la estructura base de la aplicación (router-outlet, etc.)
 * - Es el primer componente que Angular renderiza
 * 
 * Ruta: ./app/app.component
 */
import { AppComponent } from './app/app.component';

/**
 * appConfig
 * Objeto de configuración de la aplicación
 * 
 * Contiene:
 * - Providers: servicios globales (routing, HTTP, etc.)
 * - Configuración de routing
 * - Interceptors
 * - Guards
 * - Y cualquier otra configuración global
 * 
 * Equivale al "providers" array del antiguo AppModule
 * 
 * Ruta: ./app/app.config
 */
import { appConfig } from './app/app.config';

/* ============================================
   BOOTSTRAP DE LA APLICACIÓN
   ============================================ */

/**
 * Inicializa la aplicación Angular
 * 
 * @param AppComponent - Componente raíz a renderizar
 * @param appConfig - Configuración de la aplicación (providers, routing, etc.)
 * 
 * Proceso interno:
 * 1. Crea una instancia de la aplicación Angular
 * 2. Registra todos los providers del appConfig
 * 3. Compila el componente AppComponent
 * 4. Busca el selector <app-root> en el DOM
 * 5. Reemplaza <app-root> con el template de AppComponent
 * 6. Inicializa el sistema de detección de cambios
 * 7. Ejecuta los lifecycle hooks (ngOnInit, etc.)
 * 
 * Si falla:
 * - Se lanza una excepción
 * - La aplicación no se renderiza
 * - Se muestra error en la consola
 * 
 * Arquitectura Standalone:
 * Este enfoque moderno (Angular 14+) elimina la necesidad de NgModules,
 * permitiendo una aplicación más modular y con mejor tree-shaking.
 * 
 * Tree-shaking: eliminación de código no usado en el bundle final,
 * resultando en aplicaciones más pequeñas y rápidas.
 */
bootstrapApplication(AppComponent, appConfig);