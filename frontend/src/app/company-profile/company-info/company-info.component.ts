import { CompanyInfoService } from '../../services/company-info.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripService } from 'src/app/services/trip.service';
import { ReviewService } from 'src/app/services/review.service';
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
    private reviewServ: ReviewService
  ) {
    this.getCompanyTrips();
  }

  ngOnInit(): void {
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
}
