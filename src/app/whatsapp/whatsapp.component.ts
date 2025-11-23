/* ============================================
   WHATSAPP.COMPONENT.TS - LÓGICA DEL BOTÓN FLOTANTE
   ============================================ */

/**
 * Este archivo contiene la lógica del componente flotante de WhatsApp.
 *
 * Funciones principales:
 * - Definir el selector <app-whatsapp>
 * - Cargar el template HTML y la hoja de estilos
 * - Exponer la URL dinámica que abrirá el chat de WhatsApp
 */

/* ============================================
   IMPORTS
   ============================================ */

/**
 * Component
 * 
 * - Decorador fundamental de Angular que transforma la clase en un componente.
 * - Permite definir:
 *   • selector
 *   • template
 *   • estilos
 *   • configuración standalone (imports)
 * 
 * Importado desde: @angular/core
 */
import { Component } from '@angular/core';

/* ============================================
   COMPONENTE WHATSAPP
   ============================================ */

/**
 * @Component({
 *   selector: 'app-whatsapp'
 *   imports: []
 *   templateUrl: './whatsapp.component.html'
 *   styleUrl: './whatsapp.component.css'
 * })
 * 
 * - selector → etiqueta personalizada del componente.
 * - templateUrl → archivo HTML con la estructura del botón flotante.
 * - styleUrl → archivo CSS con los estilos del botón.
 * - imports → vacío porque este componente no usa otros componentes Angular.
 */
@Component({
  selector: 'app-whatsapp',
  imports: [],
  templateUrl: './whatsapp.component.html',
  styleUrl: './whatsapp.component.css'
})

/**
 * Clase WhatsappComponent
 * 
 * - Contiene la propiedad whatsappUrl, que genera un enlace directo
 *   a un chat prellenado mediante wa.me.
 * - El texto está codificado en formato URL (espacios como %20).
 * 
 * Este valor se enlaza en el template mediante:
 *   [href]="whatsappUrl"
 */
export class WhatsappComponent {

  /**
   * whatsappUrl
   * 
   * - Enlace directo a WhatsApp con mensaje predefinido.
   * - El prefijo +549 indica número de Argentina (BS. AS.).
   * - El texto está URL-encoded.
   */
  whatsappUrl: string = 'https://wa.me/+5491124746126?text=¡Hola!%20Me%20interesa%20más%20información.';
}
