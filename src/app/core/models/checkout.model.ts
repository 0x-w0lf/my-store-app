export interface CheckoutFormValue {
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shipping: {
    address1: string;
    address2: string;
    city: string;
    country: string;
    postalCode: string;
  };
  payment: {
    cardHolder: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
    cvc: string;
  };
}

