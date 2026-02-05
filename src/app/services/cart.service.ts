import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  // BehaviorSubjects para reactive programming
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartCountSubject = new BehaviorSubject<number>(0);

  // Observables públicos
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();
  public cartCount$: Observable<number> = this.cartCountSubject.asObservable();

  constructor() {
    // Cargar carrito del localStorage si existe
    this.loadCartFromStorage();
  }

  // Obtener items actuales
  private get currentItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  // Agregar producto al carrito
  addToCart(product: any): void {
    const items = this.currentItems;
    const existingItem = items.find(item => item.id === product.id);

    if (existingItem) {
      // Si ya existe, incrementar cantidad
      existingItem.quantity++;
    } else {
      // Si no existe, agregarlo
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        description: product.description
      });
    }

    this.updateCart(items);
  }

  // Remover producto del carrito
  removeFromCart(productId: number): void {
    const items = this.currentItems.filter(item => item.id !== productId);
    this.updateCart(items);
  }

  // Actualizar cantidad de un producto
  updateQuantity(productId: number, quantity: number): void {
    const items = this.currentItems;
    const item = items.find(i => i.id === productId);
    
    if (item) {
      if (quantity > 0) {
        item.quantity = quantity;
      } else {
        // Si la cantidad es 0, remover el item
        this.removeFromCart(productId);
        return;
      }
    }

    this.updateCart(items);
  }

  // Limpiar carrito
  clearCart(): void {
    this.updateCart([]);
  }

  // Actualizar carrito y notificar cambios
  private updateCart(items: CartItem[]): void {
    this.cartItemsSubject.next(items);
    this.cartCountSubject.next(items.length);
    this.saveCartToStorage(items);
  }

  // Guardar en localStorage
  private saveCartToStorage(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  // Cargar desde localStorage
  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      this.cartItemsSubject.next(items);
      this.cartCountSubject.next(items.length);
    }
  }
}