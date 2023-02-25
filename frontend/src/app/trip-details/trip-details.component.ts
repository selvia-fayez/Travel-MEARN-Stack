import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
})
export class TripDetailsComponent implements OnInit {
  tripData: any = [];
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private Tourserv: TourService,
    private router: Router
  ) {
    this.getTripDetails();
  }
  ngOnInit(): void {}
  getTripDetails() {
    let { id } = this._ActivatedRoute.snapshot.params;
    this.Tourserv.getTourById(id).subscribe((data) => {
      this.tripData = data;
      console.log(this.tripData.data);
    });
  }
  goCheckout() {
    this.router.navigate(['/checkout']);
  }
}
