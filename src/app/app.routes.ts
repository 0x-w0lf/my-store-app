import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public/public.component').then(
        (m) => m.PublicComponent
      ),
      children: [
        {
          path: '',
          pathMatch: 'full',
          loadComponent: () =>
            import('./features/home/home.component').then(
              (m) => m.HomeComponent
            )
        },
        {
          path: 'products',
          loadComponent: () =>
            import('./features/products/products.component').then(
              (m) => m.ProductsComponent
            )
        },
        {
          path: 'products/:id',
          loadComponent: () =>
            import('./features/product-details/product-details.component').then(
              (m) => m.ProductDetailsComponent
            )
        },
        {
          path: 'cart',
          loadComponent: () =>
            import('./features/cart/cart.component').then(
              (m) => m.CartComponent
            )
        },
        {
          path: 'checkout',
          loadComponent: () =>
            import('./features/checkout/checkout.component').then(
              (m) => m.CheckoutComponent
            )
        }
      ]
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./layouts/admin/admin.component').then(
        (m) => m.AdminComponent
      ),
      children: [
        {
          path: '',
          pathMatch: 'full',
          loadComponent: () =>
            import('./features/admin/admin.component').then(
              (m) => m.AdminComponent
            )
        }
      ]
  },
  {
    path: '**',
    redirectTo: '',
  }
];
