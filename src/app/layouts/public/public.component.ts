import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss'
})
export class PublicComponent {
  constructor(public cartService: CartService, pulic authService: AuthService) {}
}
