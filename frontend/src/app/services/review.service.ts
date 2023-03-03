import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { url } from './baseUrl';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}
  addReview(tripID: any, reviewdata: any): Observable<any> {
    return this._HttpClient.post(`${url}review/${tripID}`, reviewdata);
  }
  addReviewToTour(tripID: any, reviewID: any): Observable<any> {
    return this._HttpClient.post(url + `tours/${tripID}/${reviewID}`, {});
  }
  getTripReviews(tripID: any): Observable<any> {
    return this._HttpClient.get(url + `review/${tripID}`, {});
  }
  getReviewById(reviewID: any): Observable<any> {
    return this._HttpClient.get(`${url}review/reviewById/${reviewID}`, {});
  }
}
