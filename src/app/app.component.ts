import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

// ✅ Importar el servicio
import { ScrollSpyService } from './services/scroll-spy.service';

// ✅ Importar tus componentes (ajusta las rutas según tu estructura)
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { HomeComponent } from './page/home/home.component';
import { ProductsComponent } from './page/products/products.component';
import { ContactComponent } from './page/contact/contact.component';
import { AboutUsComponent } from './page/about-us/about-us.component';
import { ServicesComponent } from './page/services/services.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,           // ✅ Para directivas como *ngFor, *ngIf
    NavbarComponent,
    FooterComponent,
    WhatsappComponent,
    HomeComponent,
    ProductsComponent,
    ContactComponent,
    AboutUsComponent,
    ServicesComponent      // ✅ Solo una vez, no duplicado
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // ✅ styleUrls (plural), no styleUrl
})
export class AppComponent implements OnInit {
  title = 'optica-omega';

  constructor(private scrollSpyService: ScrollSpyService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.scrollSpyService.detectActiveSection();
    }, 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrollSpyService.detectActiveSection();
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    setTimeout(() => {
      this.scrollSpyService.detectActiveSection();
    }, 100);
  }
}