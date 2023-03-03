import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(private authServ: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authServ.userData.subscribe({
      next: () => {
        if (this.authServ.userData.getValue() != null) {
          this.router.navigate(['/UserHome']);
        }
        if (this.authServ.companyData.getValue() != null) {
          this.router.navigate(['/CompanyProfile']);
        }
      },
    });
  }
  usererr: string = '';
  companyerr: string = '';
  userisLoading: boolean = false;
  companyisLoading: boolean = false;
  UserloginForm: FormGroup = new FormGroup({
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+@[a-z]+(.com)$/),
    ]),
    Password: new FormControl('', [Validators.required]),
  });
  CompanyloginForm: FormGroup = new FormGroup({
    Company_name: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
  });
  addUser(UserloginForm: FormGroup) {
    this.userisLoading = true;
    this.authServ.Userlogin(UserloginForm.value).subscribe({
      next: (response) => {
        this.userisLoading = false;
        if (response.message === 'User is logged') {
          localStorage.setItem('userToken', response.token);
          localStorage.setItem('userID', response.data._id);
          this.authServ.saveUserData();
          this.router.navigate(['/UserHome']);
        } else {
          this.companyerr = response.message;
        }
      },
    });
  }
  addCompany(CompanyloginForm: FormGroup) {
    this.companyisLoading = true;
    this.authServ.Companylogin(CompanyloginForm.value).subscribe({
      next: (response) => {
        this.companyisLoading = false;
        if (response.message === 'Company is logged') {
          localStorage.setItem('companyToken', response.token);
          console.log(response.data._id);
          localStorage.setItem('companyID', response.data._id);
          this.authServ.saveCompanyData();
          this.router.navigate(['/CompanyProfile']);
        } else {
          this.companyerr = response.message;
        }
      },
    });
  }
}
