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
  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
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

  addToFavorite(id: any) {
    this._UserService.addToFavorite(id).subscribe({
      next: (res: any) => {
        this.favorite = res.data;
        this._Router.navigate(['/favorite']);
      },
    });
  }
}
