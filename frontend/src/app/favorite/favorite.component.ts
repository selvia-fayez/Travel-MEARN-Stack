import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { TourService } from '../services/tour.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent {
  cartId: string = '';
  trip: any;
  arr: any[] = [];
  deletedTrip: any;

  constructor(private _UserService: UserService) {}
  ngOnInit() {
    this._UserService.getUserFavorite().subscribe({
      next: (res: any) => {
        this.arr = res.favorite.favorite;
      },
    });
  }
  deleteFromFavorite(id: any) {
    this._UserService.deleteFromFavorite(id).subscribe({
      next: (res: any) => {
        this.deleteFavorite(id);
      },
    });
  }
  deleteFavorite(id: any) {
    const tripIndex = this.arr.findIndex((item) => {
      return item._id == id;
    });
    this.arr.splice(tripIndex, 1);
  }
}
