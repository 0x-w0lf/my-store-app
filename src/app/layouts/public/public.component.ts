import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from "@angular/router";

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss'
})
export class PublicComponent {

}
