import { CompanyInfoService } from './company-info.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css'],
})
export class CompanyInfoComponent {
  companyInfo: any;
  triperr: string = '';
  isLoading: boolean = false;
  constructor(private tripServ: TripService, private authServ: AuthService,private companyInfoService: CompanyInfoService) {    this.getAllTrips();


  }

  ngOnInit(): void {
    this.companyInfoService.getCompanyInfo().subscribe({
      next: (data: any) => {
        this.companyInfo = data.companyInfo;
      },
    });
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
  addTrip(addTripForm: FormGroup) {
    this.isLoading = true;
    this.alldata = addTripForm.value;
    this.alldata = { ...this.alldata, createdBy: this.authServ.CompanyId };
    // let token =localStorage.getItem('token')

    this.tripServ.addTrip(this.alldata).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.message === 'Successfully created tour') {
          this.getAllTrips();
          this.resetForm();
          this.triperr = '';
          //close modal
        }
      },
      error: (res: any) => {
        this.triperr = res.error.message;
      },
    });
  }


  allTrips: any = [];
  // token:any='';
  // constructor(private authServ: AuthService) {
  //   // this.token =localStorage.getItem('token')
  //   this.getAllTrips();
  // }
  getAllTrips() {
    this.tripServ.getCompanyTrip().subscribe((data) => {
      console.log(data);
      this.allTrips = data.data;

    });
  }
  resetForm() {
    this.addTripForm.reset();
  }

}
