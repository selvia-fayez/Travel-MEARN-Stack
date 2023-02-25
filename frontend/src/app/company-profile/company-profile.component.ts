import { TripService } from './../services/trip.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CompanyInfoService } from './company-info/company-info.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent {
  triperr: string = '';
  isLoading: boolean = false;
  companyInfo: any;
  constructor(
    private tripServ: TripService,
    private authServ: AuthService,
    private companyInfoService: CompanyInfoService
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

  alldata: object = {};
  currentid: any;
  addTrip(addTripForm: FormGroup) {
    this.isLoading = true;
    this.alldata = addTripForm.value;
    this.alldata = {
      ...this.alldata,
      createdBy: this.authServ.CompanyId,
    };

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
    const file = input.files ? input.files[0] : null;
    this.addTripForm.patchValue({
      photo: file,
    });
    this.addTripForm.get('photo')?.updateValueAndValidity();
  }
  onPickEditImage(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    this.editTripForm.patchValue({
      photo: file,
    });
    this.editTripForm.get('photo')?.updateValueAndValidity();
  }
}
