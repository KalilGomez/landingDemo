import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  imports: [],
  templateUrl: './whatsapp.component.html',
  styleUrl: './whatsapp.component.css'
})
export class WhatsappComponent {
  whatsappUrl: string = 'https://wa.me/+5491122889080?text=¡Hola!%20Me%20interesa%20más%20información.'; // Reemplaza con tu número y mensaje
}
