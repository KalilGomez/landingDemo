import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-favorites-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.css']
})
export class FavoritesModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  
  favoriteItems: any[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los favoritos
    this.favoritesService.favoriteItems$.subscribe(items => {
      this.favoriteItems = items;
    });
  }

  removeFromFavorites(productId: number): void {
    this.favoritesService.removeFromFavorites(productId);
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    // Opcional: mostrar mensaje de confirmación
  }

  moveToCart(product: any): void {
    this.cartService.addToCart(product);
    this.favoritesService.removeFromFavorites(product.id);
  }

  close(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}