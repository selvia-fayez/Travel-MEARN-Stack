import { TripService } from './../services/trip.service';
import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CompanyInfoService } from '../services/company-info.service';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent {
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
  triperr: string = '';
  isLoading: boolean = false;
  companyInfo: any;
  constructor(
    private tripServ: TripService,
    private tourServ: TourService,
    private authServ: AuthService,
    private fb: FormBuilder,
    private companyInfoService: CompanyInfoService
  ) {
    // this.addStopsForm = this.fb.group({
    //   stops: this.fb.array([]),
    // });
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
    stops: this.fb.array([]),
  });
  stops(): FormArray {
    return this.addTripForm.get('stops') as FormArray;
  }
  newStop(): FormGroup {
    return this.fb.group({
      Stoptitle: '',
      duration: '',
    });
  }
  addStop() {
    this.stops().push(this.newStop());
  }
  removeStop(i: number) {
    this.stops().removeAt(i);
  }

  alldata: object = {};
  currentid: any;
  addTrip(addTripForm: FormGroup) {
    this.isLoading = true;
    this.alldata = addTripForm.value;
    this.alldata = {
      ...this.alldata,
      createdBy: this.authServ.CompanyId,
      totalPrice: parseInt(this.addTripForm.get('price')?.value),
      availableSeats: parseInt(this.addTripForm.get('maxGroupSize')?.value),
    };
    console.log(this.alldata);
    this.tripServ.addTrip(this.alldata).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.message === 'Successfully created tour') {
          this.getCompanyTrips();
          this.resetForm();
          this.triperr = '';
        }
      },
      error: (res: any) => {
        this.triperr = res.error.message;
      },
    });
  }

  allTrips: any = [];
  // getAllTrips() {
  //   this.tripServ.getTrips().subscribe((data) => {
  //     this.allTrips = data.data;
  //   });
  // }
  getCompanyTrips() {
    this.tripServ.getCompanyTrip().subscribe((data) => {
      this.allTrips = data.data;
    });
  }
  resetForm() {
    this.addTripForm.reset();
  }

  editTripForm: FormGroup = new FormGroup({
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
    stops: this.fb.array([]),
  });
  show(trip: any) {
    this.currentid = trip._id;
    this.editTripForm.patchValue({
      title: trip.title,
      price: trip.price,
      city: trip.city,
      address: trip.address,
      distance: trip.distance,
      maxGroupSize: trip.maxGroupSize,
      desc: trip.desc,
      photo: trip.photo,
      startDate: trip.startDate,
      endDate: trip.endDate,
      _id: trip._id,
    });
  }

  editTrip(editTripForm: FormGroup) {
    this.tripServ.update(this.currentid, editTripForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.message === 'Successfully Updated tour') {
          this.getCompanyTrips();
          this.resetForm();
          this.triperr = '';
        }
      },
      error: (res: any) => {
        this.triperr = res.error.message;
      },
    });
  }

  deleteTrip(_id: any) {
    this.tripServ.deleteTrip(_id).subscribe({
      next: (response) => {
        if (response.message === 'Successfully Deleted tour') {
          this.getCompanyTrips();
        }
      },
    });
  }

  onPickImage(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files as FileList;
    this.addTripForm.patchValue({
      photo: files,
    });
    this.addTripForm.get('photo')?.updateValueAndValidity();
  }
  onPickEditImage(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files as FileList;
    this.editTripForm.patchValue({
      photo: files,
    });
    this.editTripForm.get('photo')?.updateValueAndValidity();
  }

  search(event: any) {
    let searchInput = event.target.value;
    this.tourServ.search(searchInput).subscribe({
      next: (response) => {
        this.allTrips = response.data;
      },
    });
  }
}
