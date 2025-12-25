import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product = signal<Product | null>(null);

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product.set(this.productsService.getProductById(id) ?? null);
    }
  }

  addToCart(): void {
    const p = this.product();
    if (!p) return;
    this.cartService.add(p, 1);
  }
}
