import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  
  // BehaviorSubjects para reactive programming
  private favoriteItemsSubject = new BehaviorSubject<FavoriteItem[]>([]);
  private favoritesCountSubject = new BehaviorSubject<number>(0);

  // Observables públicos
  public favoriteItems$: Observable<FavoriteItem[]> = this.favoriteItemsSubject.asObservable();
  public favoritesCount$: Observable<number> = this.favoritesCountSubject.asObservable();

  constructor() {
    // Cargar favoritos del localStorage si existe
    this.loadFavoritesFromStorage();
  }

  // Obtener items actuales
  private get currentItems(): FavoriteItem[] {
    return this.favoriteItemsSubject.value;
  }

  // Agregar producto a favoritos
  addToFavorites(product: any): void {
    const items = this.currentItems;
    const exists = items.find(item => item.id === product.id);

    if (!exists) {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description
      });
      this.updateFavorites(items);
    }
  }

  // Remover producto de favoritos
  removeFromFavorites(productId: number): void {
    const items = this.currentItems.filter(item => item.id !== productId);
    this.updateFavorites(items);
  }

  // Verificar si un producto está en favoritos
  isFavorite(productId: number): boolean {
    return this.currentItems.some(item => item.id === productId);
  }

  // Toggle favorito (agregar o quitar)
  toggleFavorite(product: any): void {
    if (this.isFavorite(product.id)) {
      this.removeFromFavorites(product.id);
    } else {
      this.addToFavorites(product);
    }
  }

  // Limpiar favoritos
  clearFavorites(): void {
    this.updateFavorites([]);
  }

  // Actualizar favoritos y notificar cambios
  private updateFavorites(items: FavoriteItem[]): void {
    this.favoriteItemsSubject.next(items);
    this.favoritesCountSubject.next(items.length);
    this.saveFavoritesToStorage(items);
  }

  // Guardar en localStorage
  private saveFavoritesToStorage(items: FavoriteItem[]): void {
    localStorage.setItem('favorites', JSON.stringify(items));
  }

  // Cargar desde localStorage
  private loadFavoritesFromStorage(): void {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const items = JSON.parse(savedFavorites);
      this.favoriteItemsSubject.next(items);
      this.favoritesCountSubject.next(items.length);
    }
  }
}