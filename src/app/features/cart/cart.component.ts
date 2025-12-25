import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public cartService: CartService) {}
  increase(productId: string): void {
    const item = this.cartService.items().find((i) =>
      i.product.id === productId
    );
    if (!item) return;
    this.cartService.setQuantity(productId, item.quantity + 1);
  }
  decrease(productId: string): void {
    const item = this.cartService.items().find((i) =>
      i.product.id === productId
    );
    if (!item) return;
    this.cartService.setQuantity(productId, item.quantity - 1);
  }
}
