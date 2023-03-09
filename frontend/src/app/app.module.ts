import { CompanyInfoComponent } from './company-profile/company-info/company-info.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { CompanyLandingPageComponent } from './company-landing-page/company-landing-page.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FavoriteComponent } from './favorite/favorite.component';
import { CartdetailsComponent } from './cartdetails/cartdetails.component';
import { ReviewComponent } from './review/review.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    CompanyLandingPageComponent,
    CompanyProfileComponent,
    CompanyInfoComponent,
    FavoriteComponent,
    CartdetailsComponent,
    ReviewComponent,
    ScrollToTopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatRadioModule,
  ],
  providers: [MatTabsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
