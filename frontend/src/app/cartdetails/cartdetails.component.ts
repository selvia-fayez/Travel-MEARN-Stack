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
  constructor(private _UserService: UserService) {}
  ngOnInit() {
    this._UserService.getUserCart().subscribe({
      next: (res: any) => {
        this.arr = res.cart.cart;
      },
    });
  }
  deleteFromCart(id: any) {
    this._UserService.deleteFromCart(id).subscribe({
      next: (res: any) => {
        this.deleteCart(id);
      },
    });
  }
  deleteCart(id: any) {
    const tripIndex = this.arr.findIndex((item) => {
      return item._id == id;
    });
    this.arr.splice(tripIndex, 1);
  }
}
