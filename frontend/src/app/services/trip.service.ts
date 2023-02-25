import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { url } from './baseUrl';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  // headers =new HttpHeaders().set('Content-type','application/json').set('Accept','application/json');

  constructor(private _HttpClint: HttpClient, private _Router: Router) {}

  addTrip(tripdata: any): Observable<any> {
    const formData = new FormData();
    for (let key in tripdata) {
      formData.append(key, tripdata[key]);
    }
    return this._HttpClint.post('http://localhost:3000/tours/', formData);
  }

  getTrips(): Observable<any> {
    return this._HttpClint.get(url + 'tours');
  }
  getCompanyTrip(): Observable<any> {
    const companyId = localStorage.getItem('companyID');
    return this._HttpClint.get(url + 'tours/company/' + companyId);
  }
  update(id: any, tripdata: any): Observable<any> {
    const formData = new FormData();
    for (let key in tripdata) {
      formData.append(key, tripdata[key]);
    }
    return this._HttpClint.put(url + `tours/${id}`, formData);
  }
  deleteTrip(id: any): Observable<any> {
    return this._HttpClint.delete(url + `tours/${id}`);
    //    return this._HttpClint.delete(url + `tours`, id);
  }
}
