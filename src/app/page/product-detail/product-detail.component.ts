/* ============================================
   PRODUCT DETAIL COMPONENT
   ============================================ */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  product: Product | undefined;
  selectedImageIndex: number = 0;
  quantity: number = 1;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del producto desde la URL
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convertir a número
      this.loadProduct(id);
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    
    // Simular delay de carga (como si fuera una API)
    setTimeout(() => {
      this.product = this.shopService.getProductById(id);
      this.loading = false;
      
      // Si no se encuentra el producto, redirigir a shop
      if (!this.product) {
        this.router.navigate(['/shop']);
      } else {
        // Scroll al top al cargar
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 300);
  }

  // Cambiar imagen seleccionada
  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  // Incrementar cantidad
  increaseQuantity(): void {
    if (this.product && this.product.stock && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  // Decrementar cantidad
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Agregar al carrito
  addToCart(): void {
    if (this.product) {
      console.log(`Agregando ${this.quantity}x ${this.product.name} al carrito`);
      // Aquí implementarías la lógica real del carrito
      alert(`${this.quantity}x ${this.product.name} agregado al carrito`);
    }
  }

  // Comprar ahora
  buyNow(): void {
    if (this.product) {
      console.log(`Comprando ${this.quantity}x ${this.product.name}`);
      // Aquí implementarías la lógica de checkout
      alert('Redirigiendo a checkout...');
    }
  }

  // Volver a la tienda
  goBack(): void {
    this.router.navigate(['/shop']);
  }

  // Obtener estrellas para rating
  getStars(rating: number): { full: number; half: number; empty: number } {
    return this.shopService.getStarArray(rating);
  }

  // Calcular descuento
  getDiscount(): number {
    return this.product ? this.shopService.getDiscount(this.product) : 0;
  }

  // Verificar si tiene descuento
  hasDiscount(): boolean {
    return this.product ? this.shopService.hasDiscount(this.product) : false;
  }
}