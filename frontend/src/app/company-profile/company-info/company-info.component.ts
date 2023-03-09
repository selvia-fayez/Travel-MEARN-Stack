import { CompanyInfoService } from '../../services/company-info.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripService } from 'src/app/services/trip.service';
import { ReviewService } from 'src/app/services/review.service';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css'],
})
export class CompanyInfoComponent {
  companyInfo: any;
  constructor(
    private tripServ: TripService,
    private companyInfoService: CompanyInfoService,
    private reviewServ: ReviewService,
    private router: Router
  ) {
    this.getCompanyInfo();
    this.getCompanyTrips();
  }

  ngOnInit(): void {
    this.invokeStripe();
  }
  getCompanyInfo() {
    this.companyInfoService.getCompanyInfo().subscribe({
      next: (data: any) => {
        this.companyInfo = data.companyInfo;
      },
    });
  }

  addTripForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    distance: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    maxGroupSize: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });
  allTrips: any;
  allReviews: any = [];
  getCompanyTrips() {
    this.tripServ.getCompanyTrip().subscribe((data) => {
      this.allTrips = data.data;
      for (let trip of this.allTrips) {
        for (let review of trip.reviews) {
          this.reviewServ.getReviewById(review).subscribe({
            next: (data: any) => {
              this.allReviews.push(data.review);
            },
          });
        }
      }
    });
  }
  resetForm() {
    this.addTripForm.reset();
  }

  CompanyPackage: any;
  amount: number = 0;
  onChangeRadio(data: MatRadioChange) {
    this.CompanyPackage = data.value;
    if (this.CompanyPackage === '1-year subscription') {
      this.amount = 35.88;
    } else {
      this.amount = 69.36;
    }
  }
  goStripe(totalPrice: Number) {}

  title = 'sample payment';
  paymentHandler: any = null;

  success: boolean = false;

  failure: boolean = false;

  makePayment() {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MdK34BHKpkIAv1vkMkBmtETNEKHmNhGwcBLFqyfFq4wOA2UK23Ehp7VvLIpqbUOjWLT1gAOu35I1PLMKq0mOCBE003bn2xmA5',
      locale: 'auto',
      token: function (stripeToken: any) {
        paymentstripe(stripeToken);
      },
    });

    const paymentstripe = (stripeToken: any) => {
      this.companyInfoService.UpdatePackage(this.CompanyPackage).subscribe({
        next: (data: any) => {
          this.getCompanyInfo();
          this.router.navigate(['/CompanyProfile']);
        },
      });
    };

    paymentHandler.open({
      name: 'Payment',
      description: '',
      amount: this.amount * 100,
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
