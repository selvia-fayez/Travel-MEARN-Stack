import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyProfileComponent } from '../company-profile/company-profile.component';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-company-landing-page',
  templateUrl: './company-landing-page.component.html',
  styleUrls: ['./company-landing-page.component.css'],
})
export class CompanyLandingPageComponent {
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
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
