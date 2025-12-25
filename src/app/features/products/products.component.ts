import { Component, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = signal<Product[]>([]);

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    this.products.set(this.productsService.getProducts());
  }

  public addToCart(product: Product): void {
    this.cartService.add(product, 1);
  }
}
