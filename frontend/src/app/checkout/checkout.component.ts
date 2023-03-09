import { Component } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(private checkout: CheckoutService) {}
  title = 'sample payment';
  paymentHandler: any = null;

  success: boolean = false;

  failure: boolean = false;

  ngOnInit() {
    this.invokeStripe();
  }

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MdK34BHKpkIAv1vkMkBmtETNEKHmNhGwcBLFqyfFq4wOA2UK23Ehp7VvLIpqbUOjWLT1gAOu35I1PLMKq0mOCBE003bn2xmA5',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentstripe(stripeToken);
      },
    });

    const paymentstripe = (stripeToken: any) => {
      this.checkout.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);
        if (data.data === 'success') {
          this.success = true;
          //nav to home
        } else {
          this.failure = true;
        }
      });
    };

    paymentHandler.open({
      name: 'Coding Mostafa',
      description: 'This is a tour',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MdK34BHKpkIAv1vkMkBmtETNEKHmNhGwcBLFqyfFq4wOA2UK23Ehp7VvLIpqbUOjWLT1gAOu35I1PLMKq0mOCBE003bn2xmA5',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }
}
