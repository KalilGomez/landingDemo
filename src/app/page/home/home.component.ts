import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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

  /**
   * Alternativa usando scrollIntoView (más simple)
   */
  scrollToContactSimple(): void {
    const contactSection = document.getElementById('contacto');
    
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}