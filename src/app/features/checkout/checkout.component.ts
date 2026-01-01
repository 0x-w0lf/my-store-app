import { Component, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  checkoutDisabled = computed(() => this.cartService.totalItems() === 0);

  form = this.fb.nonNullable.group({
    customer: this.fb.nonNullable.group({
      fullName: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email,
      ]),
      phone: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    }),
    shipping: this.fb.nonNullable.group({
      address1: this.fb.nonNullable.control('', [Validators.required]),
      address2: this.fb.nonNullable.control(''),
      city: this.fb.nonNullable.control('', [Validators.required]),
      country: this.fb.nonNullable.control('Costa Rica', [Validators.required]),
      postalCode: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    }),
    payment: this.fb.nonNullable.group({
      cardHolder: this.fb.nonNullable.control('', [Validators.required]),
      cardNumber: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(19),
      ]),
      expMonth: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2),
      ]),
      expYear: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2),
      ]),
      cvc: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
      ]),
    }),
  });

  constructor(private fb: FormBuilder, public cartService: CartService) {}

  submit(): void {
    if (this.checkoutDisabled()) return;

    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const payload = this.form.getRawValue();

    console.log('CHECKOUT_PAYLOAD', payload);

    this.cartService.clear();
    this.form.reset({
      customer: { fullName: '', email: '', phone: '' },
      shipping: { address1: '', address2: '', city: '', country: 'Costa Rica', postalCode: '' },
      payment: { cardHolder: '', cardNumber: '', expMonth: '', expYear: '', cvc: '' },
    });

    alert('Order placed (mock).');
  }
}

