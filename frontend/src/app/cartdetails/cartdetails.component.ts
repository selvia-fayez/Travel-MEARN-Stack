import { UserService } from '../services/user.service';
import { TourService } from './../services/tour.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private _UserService: UserService) {}
  ngOnInit() {
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
}
