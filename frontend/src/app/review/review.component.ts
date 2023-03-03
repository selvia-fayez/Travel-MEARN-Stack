import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';
import { TourService } from '../services/tour.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    dots: true,
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
    nav: true,
  };
  tripData: any = [];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private Tourserv: TourService,
    private router: Router,
    private reviewserv: ReviewService,
    private _UserService: UserService,
    private Authserv: AuthService
  ) {
    this.getTripDetails();
    this.getTripReviews();
  }
  getTripDetails() {
    let { id } = this._ActivatedRoute.snapshot.params;
    this.tripID = id;
    this.Tourserv.getTourById(id).subscribe((data) => {
      this.tripData = data;
      //console.log(this.tripData.data);
    });
  }
  // goCheckout() {
  //   this.router.navigate(['/checkout']);
  // }

  ReviewForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    reviewText: new FormControl('', [Validators.required]),
    rating: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
  });
  isLoading = false;
  alldata: any;
  err: any;
  reviewID: any;
  tripID: any;
  reviews: any = [];
  totalRate: any;
  fakeArray: any;
  reviewLength: any;
  addReview(ReviewForm: FormGroup) {
    this.isLoading = true;
    this.alldata = ReviewForm.value;
    this.alldata = {
      ...this.alldata,
      createdBy: this.Authserv.UserId,
    };
    this.reviewserv.addReview(this.tripID, this.alldata).subscribe({
      next: (response) => {
        if (response.message === 'Successfully added Review') {
          this.reviewID = response.data._id;
          this.reviewserv
            .addReviewToTour(this.tripID, this.reviewID)
            .subscribe({
              next: (response) => {
                this.isLoading = false;
                if (response.message === 'Successfully added Review') {
                  this.err = '';
                  ReviewForm.patchValue({
                    title: '',
                    rating: '',
                    reviewText: '',
                  });
                  this.getTripReviews();
                }
              },
              error: (res: any) => {
                this.err = res.error.message;
              },
            });
        }
      },
      error: (res: any) => {
        this.err = res.error.message;
      },
    });
  }

  getTripReviews() {
    this.reviewserv.getTripReviews(this.tripID).subscribe((data) => {
      this.reviews = data.review;
      this.totalRate = Math.round(data.totalRate);
      this.fakeArray = new Array(this.totalRate);
      this.reviewLength = this.reviews.length;
    });
  }
  addToCart(id: any) {
    this._UserService.addToCart(id).subscribe({
      next: (res: any) => {
        // this.trip = res.data;
        this.router.navigate(['/cart']);
      },
    });
  }
}
