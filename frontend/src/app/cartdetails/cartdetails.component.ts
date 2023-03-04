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
  TotalPrice: any;
  TotalQuantity: any;

  constructor(private _UserService: UserService) {}
  ngOnInit() {
    this._UserService.getUserCart().subscribe({
      next: (res: any) => {
        this.arr = res.cart.cart;
        this.cartDetails = res.cartDetails;
        this.TotalPrice = this.cartDetails.totalPrice;
        this.TotalQuantity = this.cartDetails.totalQuantity;
      },
    });
  }
  deleteFromCart(
    id: any,
    ItemQuantity: any,
    ItemPrice: any,
    availableSeats: any
  ) {
    availableSeats += parseInt(ItemQuantity);
    this._UserService
      .deleteFromCart(
        id,
        ItemQuantity,
        ItemPrice,
        this.TotalPrice,
        this.TotalQuantity,
        availableSeats
      )
      .subscribe({
        next: (res: any) => {
          this.deleteCart(id, ItemQuantity);
        },
      });
  }
  deleteCart(id: any, quantity: any) {
    const tripIndex = this.arr.findIndex((item) => {
      this.TotalPrice -= item.price * quantity;
      this.TotalQuantity -= quantity;
      return item._id == id;
    });

    this.arr.splice(tripIndex, 1);
  }

  changeQuantity(cartItem: any, quantity: any) {
    cartItem.totalPrice = cartItem.price * quantity;
    cartItem.totalQuantity = quantity;
    cartItem.availableSeats = cartItem.maxGroupSize - quantity;
    // while (cartItem.maxGroupSize >= 1) {
    // }
    this.TotalPrice += cartItem.totalPrice;
    this.TotalQuantity += parseInt(cartItem.totalQuantity);
    this._UserService
      .updateQuantity(
        cartItem._id,
        this.TotalQuantity,
        this.TotalPrice,
        cartItem.availableSeats,
        cartItem.totalPrice,
        cartItem.totalQuantity
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
      });
  }
}
