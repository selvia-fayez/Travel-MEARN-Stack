import { TripDetailsComponent } from './trip-details/trip-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CompanyLandingPageComponent } from './company-landing-page/company-landing-page.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CompanyInfoComponent } from './company-profile/company-info/company-info.component';
import { CartdetailsComponent } from './cartdetails/cartdetails.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', redirectTo: 'LandingPage', pathMatch: 'full' },
  {
    path: 'LandingPage',
    component: CompanyLandingPageComponent,
  },
  {
    path: 'CompanyProfile',
    canActivate: [AuthGuard],
    component: CompanyProfileComponent,
  },
  { path: 'UserHome', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'tripDetails/:id',
    canActivate: [AuthGuard],
    component: TripDetailsComponent,
  },
  {
    path: 'company-info',
    canActivate: [AuthGuard],
    component: CompanyInfoComponent,
  },
  {
    path: 'cartdetails/:id',
    canActivate: [AuthGuard],
    component: CartdetailsComponent,
  },
  {
    path: 'favorite/:id',
    canActivate: [AuthGuard],
    component: FavoriteComponent,
  },
  { path: 'cart', canActivate: [AuthGuard], component: CartdetailsComponent },
  { path: 'favorite', canActivate: [AuthGuard], component: FavoriteComponent },
  { path: 'checkout', canActivate: [AuthGuard], component: CheckoutComponent },
  { path: 'review/:id', canActivate: [AuthGuard], component: ReviewComponent },

  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
