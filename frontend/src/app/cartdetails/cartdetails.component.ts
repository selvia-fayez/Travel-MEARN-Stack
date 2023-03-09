import { UserService } from '../services/user.service';
import { TourService } from './../services/tour.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from '../services/checkout.service';
TourService;
@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.css'],
})
export class CartdetailsComponent {
  cartId: string = '';
  trip: any;
  deletedTrip: any;
  arr: any[] = [];
  cartDetails: any;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private _UserService: UserService,
    private checkout: CheckoutService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getCartDetails();
    this.invokeStripe();
  }
  getCartDetails() {
    this._UserService.getUserCart().subscribe({
      next: (res: any) => {
        this.arr = res.cart.cart;
        console.log(this.arr);
        this.cartDetails = res.cartDetails;
        this.arr.forEach((e) => {
          this.totalPrice += e.totalPrice ? e.totalPrice : 0;
          this.totalQuantity += parseInt(e.totalQuantity)
            ? parseInt(e.totalQuantity)
            : 0;
        });
      },
    });
  }
  deleteFromCart(
    id: any,
    ItemQuantity: any,
    ItemPrice: any,
    availableSeats: any
  ) {
    availableSeats += ItemQuantity ? parseInt(ItemQuantity) : 0;
    if (id) {
      this._UserService
        .deleteFromCart(
          id,
          ItemQuantity,
          ItemPrice,
          this.totalPrice,
          this.totalQuantity,
          availableSeats
        )
        .subscribe({
          next: (res: any) => {
            this.deleteCart(id, ItemQuantity);
          },
        });
    }
  }
  deleteCart(id: any, quantity: any) {
    const tripIndex = this.arr.findIndex((item) => {
      this.totalPrice -= item.price * quantity;
      this.totalQuantity -= quantity;
      return item._id == id;
    });

    this.arr.splice(tripIndex, 1);
  }

  changeQuantity(cartItem: any, quantity: any) {
    cartItem.totalPrice = cartItem.price * quantity;
    cartItem.totalQuantity = quantity;
    cartItem.availableSeats = cartItem.maxGroupSize - quantity;

    this.totalPrice = 0;
    this.totalQuantity = 0;
    this.arr.forEach((e) => {
      this.totalPrice += e.totalPrice ? e.totalPrice : 0;
      this.totalQuantity += parseInt(e.totalQuantity)
        ? parseInt(e.totalQuantity)
        : 0;
    });
    // this.totalPrice += cartItem.totalPrice;
    // this.totalQuantity += parseInt(cartItem.totalQuantity);
    this._UserService
      .updateQuantity(
        cartItem._id,
        this.totalQuantity,
        this.totalPrice,
        cartItem.availableSeats,
        cartItem.totalPrice,
        cartItem.totalQuantity
      )
      .subscribe({
        next: (res: any) => {
          // console.log(res);
        },
      });
  }
  goStripe(totalPrice: Number) {}

  title = 'sample payment';
  paymentHandler: any = null;

  success: boolean = false;

  failure: boolean = false;

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MdK34BHKpkIAv1vkMkBmtETNEKHmNhGwcBLFqyfFq4wOA2UK23Ehp7VvLIpqbUOjWLT1gAOu35I1PLMKq0mOCBE003bn2xmA5',
      locale: 'auto',
      token: function (stripeToken: any) {
        paymentstripe(stripeToken);
      },
    });

    const paymentstripe = (stripeToken: any) => {
      this._UserService.deleteCartAfterPay().subscribe({
        next: (res: any) => {
          this.getCartDetails();
          this.totalPrice = 0;
          this.totalQuantity = 0;
          this.router.navigate(['/UserHome']);
        },
      });
      // this.checkout.makePayment(stripeToken).subscribe((data: any) => {
      //   if (data.data === 'success') {
      //     this.success = true;
      //     //delete cart
      //   } else {
      //     this.failure = true;
      //   }
      // });
    };

    paymentHandler.open({
      name: 'Payment',
      description: '',
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
          token: function (stripeToken: any) {},
        });
      };

      window.document.body.appendChild(script);
    }
  }
}
