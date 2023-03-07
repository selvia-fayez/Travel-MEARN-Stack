import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-company-landing-page',
  templateUrl: './company-landing-page.component.html',
  styleUrls: ['./company-landing-page.component.css'],
})
export class CompanyLandingPageComponent {
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
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
        items: 4,
      },
    },
    nav: true,
  };
}
