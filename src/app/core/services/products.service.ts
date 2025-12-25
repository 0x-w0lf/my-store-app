import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly products: Product[] = [
    {
      id: '1',
      name: 'Laptop Pro',
      description: 'High performance laptop',
      price: 1500,
      imageUrl: 'https://media.wired.com/photos/5d5ec4d7a9558100099f379e/master/w_1280,c_limit/Gear-Razer-blade-pro-17-source-razer-FATA.jpg',
      stock: 5,
    },
    {
      id: '2',
      name: 'Wireless Headphones',
      description: 'Noise cancelling',
      price: 300,
      imageUrl: 'https://i5.walmartimages.com/seo/JBL-Tour-One-M2-Wireless-over-ear-Noise-Cancelling-headphones-Black_2a7d7c26-1683-4e37-a695-52a90e7a3a68.b1bf13a3b3c336fa41b503c1587b5a4d.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
      stock: 12,
    },
    {
      id: '3',
      name: 'Mechanical Keyboard',
      description: 'RGB backlit',
      price: 180,
      imageUrl: 'https://i.rtings.com/assets/products/RODjFo4y/nuphy-air75-v2-air60-v2-air96-v2/design-medium.jpg?format=auto',
      stock: 7,
    },
  ];
  getProducts() : Product[] {
    return this.products;
  }
  constructor() { }
}
