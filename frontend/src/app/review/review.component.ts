import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';
import { TourService } from '../services/tour.service';
import { UserService } from '../services/user.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as mapboxgl from 'mapbox-gl';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements AfterViewInit {
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
  };
  tripData: any = [];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private Tourserv: TourService,
    private router: Router,
    private reviewserv: ReviewService,
    private _UserService: UserService,
    private Authserv: AuthService,
    private checkout: CheckoutService
  ) {
    this.getTripDetails();
    this.getTripReviews();
    (mapboxgl as typeof mapboxgl).accessToken =
      'pk.eyJ1IjoibW9zdGFmYW0yNSIsImEiOiJjbGV2YTFpc3MwMmhxM3lzODFnOW95bG45In0.bzvaVaSlpiRRtoqCRsOUCg';
  }
  ngOnInit() {
    this.invokeStripe();
  }
  ngAfterViewInit(): void {
    let map = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [32.89983, 24.088938],
      zoom: 13,
    });
    // Add the control to the map.
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
    (
      document.querySelector(
        '.mapboxgl-ctrl-geocoder--input'
      ) as HTMLInputElement
    ).value = `${this.address}`;
  }
  address: any;
  boolstops: any = true;
  getTripDetails() {
    let { id } = this._ActivatedRoute.snapshot.params;
    this.tripID = id;
    this.Tourserv.getTourById(id).subscribe({
      next: (response) => {
        this.tripData = response;
        this.address = this.tripData.data.address;
        if (this.tripData.data.address.stops.length === 1) {
          this.boolstops = false;
        }
      },
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
      this.router.navigate(['/UserHome']);
      // this.checkout.makePayment(stripeToken).subscribe((data: any) => {
      // if (data.data === 'success') {
      //   this.success = true;
      //delete cart
      // } else {
      //   this.failure = true;
      // }
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
