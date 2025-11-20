/* ============================================
   APP.COMPONENT.TS - COMPONENTE RAÍZ DE LA APLICACIÓN
   ============================================ */

/**
 * Archivo app.component.ts
 *
 * Este archivo define el componente raíz de la aplicación Angular.
 * 
 * Es el componente que:
 * - Se renderiza dentro del selector <app-root>.
 * - Carga la estructura principal (navbar, footer, secciones).
 * - Maneja eventos globales como scroll y resize.
 * - Inicializa el servicio de ScrollSpy para detectar la sección activa.
 */

/* ============================================
   IMPORTS
   ============================================ */

/**
 * Component, OnInit, HostListener
 * 
 * - Component: Decorador para definir un componente Angular.
 * - OnInit: Hook del ciclo de vida que se ejecuta al iniciar el componente.
 * - HostListener: Permite escuchar eventos del DOM directamente en la clase.
 * 
 * Importado desde: @angular/core
 */
import { Component, OnInit, HostListener } from '@angular/core';

/**
 * CommonModule
 * 
 * - Módulo que provee directivas estructurales comunes (ngIf, ngFor, etc.).
 * - Necesario cuando se usa un componente standalone.
 * 
 * Importado desde: @angular/common
 */
import { CommonModule } from '@angular/common';

/**
 * ScrollSpyService
 * 
 * - Servicio encargado de detectar la sección activa en la página.
 * - Monitorea el scroll y determina qué sección está visible.
 * 
 * Ruta: ./services/scroll-spy.service
 */
import { ScrollSpyService } from './services/scroll-spy.service';

/**
 * Componentes principales incluidos en la app standalone:
 * 
 * - NavbarComponent: Barra de navegación superior.
 * - FooterComponent: Pie de página.
 * - WhatsappComponent: Botón flotante para contacto rápido.
 * - HomeComponent: Página principal.
 * - ProductsComponent: Sección de productos.
 * - ContactComponent: Formulario de contacto.
 * - AboutUsComponent: Información de la empresa.
 * - ServicesComponent: Servicios ofrecidos.
 * 
 * Todos son standalone y se importan directamente aquí.
 */
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { HomeComponent } from './page/home/home.component';
import { ProductsComponent } from './page/products/products.component';
import { ContactComponent } from './page/contact/contact.component';
import { AboutUsComponent } from './page/about-us/about-us.component';
import { ServicesComponent } from './page/services/services.component';

/* ============================================
   COMPONENT METADATA
   ============================================ */

/**
 * Decorador @Component
 *
 * Define:
 * - selector: nombre del componente en el DOM (<app-root>)
 * - standalone: true → el componente no depende de NgModule
 * - imports: componentes y módulos necesarios
 * - templateUrl: archivo HTML asociado
 * - styleUrls: estilos aplicados al componente
 * 
 * Este es el componente raíz de la app.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    WhatsappComponent,
    HomeComponent,
    ProductsComponent,
    ContactComponent,
    AboutUsComponent,
    ServicesComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/* ============================================
   LÓGICA DEL COMPONENTE
   ============================================ */

export class AppComponent implements OnInit {

  /**
   * title
   * 
   * Título de la aplicación. Puede utilizarse para mostrar información 
   * global o identificar la app en el DOM.
   */
  title = 'optica-omega';

  /**
   * Constructor
   * 
   * Injecta el servicio ScrollSpyService para detectar la sección activa.
   * Este servicio se utiliza tanto al iniciar como al hacer scroll o resize.
   */
  constructor(private scrollSpyService: ScrollSpyService) { }

  /**
   * ngOnInit()
   * 
   * Hook del ciclo de vida que se ejecuta una vez que el componente se inicializa.
   * 
   * Aquí:
   * - Se usa un pequeño delay (setTimeout) para asegurar que el DOM ya está renderizado.
   * - Luego se ejecuta detectActiveSection() para calcular la sección activa inicial.
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.scrollSpyService.detectActiveSection();
    }, 100);
  }

  /**
   * Evento: Scroll de la ventana
   * 
   * @HostListener('window:scroll')
   * - Escucha el evento de scroll del navegador.
   * - Cada vez que el usuario se desplaza, se recalcula la sección activa.
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrollSpyService.detectActiveSection();
  }

  /**
   * Evento: Resize de la ventana
   * 
   * @HostListener('window:resize')
   * - Escucha el evento resize del navegador.
   * - Cuando la ventana cambia de tamaño:
   *   - Se recalcula la posición de las secciones.
   *   - Se usa delay para evitar cálculos antes de que el layout termine de ajustarse.
   */
  @HostListener('window:resize', [])
  onWindowResize(): void {
    setTimeout(() => {
      this.scrollSpyService.detectActiveSection();
    }, 100);
  }
}
