import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private authServ: AuthService, private router: Router) {}
  usererr: string = '';
  companyerr: string = '';
  userisLoading: boolean = false;
  companyisLoading: boolean = false;

  UserRegisterForm: FormGroup = new FormGroup({
    User_name: new FormControl('', [Validators.required]),
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+@[a-z]+(.com)$/),
    ]),
    Phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(01)(1|2|5|0)[0-9]{8}$/),
    ]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
    ]),
  });
  CompanyRegisterForm: FormGroup = new FormGroup({
    Company_name: new FormControl('', [Validators.required]),
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]+@[a-z]+(.com)$/),
    ]),
    Phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(01)(1|2|5|0)[0-9]{8}$/),
    ]),
    Address: new FormControl('', [Validators.required]),
    CRN: new FormControl('', [Validators.required]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
    ]),
  });

  addUser(UserRegisterForm: FormGroup) {
    this.userisLoading = true;
    this.authServ.UserRegister(UserRegisterForm.value).subscribe({
      next: (response) => {
        this.userisLoading = false;
        if (response.message === 'Successfully added user') {
          this.router.navigate(['/signin']);
        } else if (response.message === 'Email is already exist') {
          this.usererr = response.message;
        }
      },
    });
  }
  addCompany(CompanyRegisterForm: FormGroup) {
    this.companyisLoading = true;
    this.authServ.CompanyRegister(CompanyRegisterForm.value).subscribe({
      next: (response) => {
        this.companyisLoading = false;
        if (response.message === 'Successfully added Company') {
          this.router.navigate(['/signin']);
        } else if (response.message === 'Email is already exist') {
          this.companyerr = response.message;
        }
      },
    });
  }
}
