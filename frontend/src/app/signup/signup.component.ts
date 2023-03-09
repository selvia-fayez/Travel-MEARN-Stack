import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
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
    this.invokeStripe();
  }
  usererr: string = '';
  companyerr: string = '';
  userisLoading: boolean = false;
  companyisLoading: boolean = false;
  CompanyPackage: string = '';
  alldata: any;

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
    this.alldata = CompanyRegisterForm.value;
    this.alldata = {
      ...this.alldata,
      packageType: this.CompanyPackage,
    };
    if (this.CompanyPackage === 'Free subscription') {
      this.authServ.CompanyRegister(this.alldata).subscribe({
        next: (response) => {
          this.companyisLoading = false;
          if (response.message === 'Successfully added Company') {
            this.router.navigate(['/signin']);
          } else if (response.message === 'Email is already exist') {
            this.companyerr = response.message;
          }
        },
      });
    } else {
      this.makePayment();
    }
  }
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
      this.authServ.CompanyRegister(this.alldata).subscribe({
        next: (response) => {
          this.companyisLoading = false;
          if (response.message === 'Successfully added Company') {
            this.router.navigate(['/signin']);
          } else if (response.message === 'Email is already exist') {
            this.companyerr = response.message;
          }
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
