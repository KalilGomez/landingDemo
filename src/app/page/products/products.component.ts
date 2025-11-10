import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  /**
   * Navega suavemente a la sección de contacto
   */
  scrollToContact(): void {
    const contactSection = document.getElementById('contacto');
    
    if (contactSection) {
      // Obtener la posición del elemento
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80; // 80px para compensar el navbar

      // Scroll suave
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}