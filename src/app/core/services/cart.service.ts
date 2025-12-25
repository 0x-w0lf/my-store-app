import { Injectable, computed, effect, signal } from '@angular/core';
import { CartItem } from '../models/cart-tem.model';
import { Product } from '../models/product.model';

const STORAGE_KEY = "my_store_cart_v1";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>(this.load());

  items = this.itemsSignal.asReadonly();

  totalItems = computed(()=>
    this.itemsSignal().reduce((acc, item) => acc + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.itemsSignal().reduce((acc, item) => acc + item.quantity * item.product.price, 0)
  );

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.itemsSignal()))
    });
  }

  add(product: Product, quantity: number = 1): void {
    if (quantity <= 0) return;

    const items = this.itemsSignal();
    const existing = items.find((i) => i.product.id === product.id);

    if (!existing) {
      this.itemsSignal.set([...items, { product, quantity }]);
      return;
    }

    this.itemsSignal.set(
      items.map((i) =>
        i.product.id === product.id
          ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
          : i
      )
    );
  }

  remove(productId: string): void {
    this.itemsSignal.set(this.itemsSignal().filter((i) => i.product.id !== productId));
  }

  setQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      return this.remove(productId);
      return;
    }

    this.itemsSignal.set(
      this.itemsSignal().map((i) =>
        i.product.id === productId
          ? { ...i, quantity: Math.min(quantity, i.product.stock)}
          : i
      )
    );
  }

  clear() : void {
    this.itemsSignal.set([]);
  }

  private load(): CartItem[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as CartItem[];
    } catch {
      console.error('An error happened trying to fetch the cart items');
      return [];
    }
  }
}
