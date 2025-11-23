/* ============================================
   IMPORTS Y DEPENDENCIAS
   ============================================ */

import { Component } from '@angular/core';

/* ============================================
   COMPONENTE ABOUT US
   ============================================ */

/**
 * Componente AboutUsComponent
 * 
 * Componente de presentación (presentational component) que muestra
 * información institucional sobre la empresa/negocio.
 * 
 * Características:
 * - Componente standalone (no requiere NgModule)
 * - Sin dependencias externas (imports vacío)
 * - Sin lógica de negocio (componente estático)
 * - Contenido completamente definido en el template HTML
 * 
 * @Component Decorador que define los metadatos del componente
 */
@Component({
  /**
   * Selector CSS para usar el componente en templates
   * Uso: <app-about-us></app-about-us>
   */
  selector: 'app-about-us',
  
  /**
   * Array de módulos/componentes importados
   * Vacío porque este componente no usa directivas ni pipes externos
   * Solo utiliza HTML y CSS estáticos
   */
  imports: [],
  
  /**
   * Ruta al archivo de template HTML
   * Contiene la estructura visual del componente
   */
  templateUrl: './about-us.component.html',
  
  /**
   * Ruta al archivo de estilos CSS
   * Contiene los estilos específicos del componente (encapsulados)
   */
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  /* ============================================
     PROPIEDADES Y MÉTODOS
     ============================================ */
  
  /**
   * Este componente no requiere lógica adicional
   */
}