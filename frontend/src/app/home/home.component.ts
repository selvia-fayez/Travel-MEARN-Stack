import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Component } from '@angular/core';
import { TourService } from '../services/tour.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  trips: any;
  trip: any;
  favorite: any;
  constructor(
    private _TourService: TourService,
    private _UserService: UserService,
    private _Router: Router
  ) {}
  ngOnInit() {
    this._TourService.getAllTours().subscribe({
      next: (res: any) => {
        this.trips = res.data;
      },
    });
  }
  addToCart(id: any) {
    this._UserService.addToCart(id).subscribe({
      next: (res: any) => {
        this.trip = res.data;
        this._Router.navigate(['/cart']);
      },
    });
  }
  addToFavorite(id: any) {
    this._UserService.addToFavorite(id).subscribe({
      next: (res: any) => {
        this.favorite = res.data;
        this._Router.navigate(['/favorite']);
      },
    });
  }
}
