import { Component, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
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

  constructor(private productsService: ProductsService) {
    this.products.set(this.productsService.getProducts());
  }
}
