import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { url } from './baseUrl';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  // headers =new HttpHeaders().set('Content-type','application/json').set('Accept','application/json');

  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  addTrip(tripdata: any): Observable<any> {
    const companyId = localStorage.getItem('companyID');
    const formData = new FormData();
    for (let key in tripdata) {
      if (key === 'stops') {
        for (let i = 0; i < tripdata['stops'].length; i++) {
          formData.append('stoptitle', tripdata['stops'][i].Stoptitle);
          formData.append('duration', tripdata['stops'][i].duration);
        }
      } else {
        formData.append(key, tripdata[key]);
        if (key === 'photo') {
          for (let i = 0; i < tripdata['photo'].length; i++) {
            formData.append('photo', tripdata['photo'][i]);
          }
        }
      }
    }
    console.log(formData.get('stops'));
    return this._HttpClient.post(
      `http://localhost:3000/tours/${companyId}`,
      formData
    );
  }

  getTrips(): Observable<any> {
    return this._HttpClient.get(url + 'tours');
  }
  getCompanyTrip(): Observable<any> {
    const companyId = localStorage.getItem('companyID');
    return this._HttpClient.get(url + 'tours/company/' + companyId);
  }
  update(id: any, tripdata: any): Observable<any> {
    const formData = new FormData();
    for (let key in tripdata) {
      if (key === 'newstops') {
        for (let i = 0; i < tripdata['newstops'].length; i++) {
          formData.append('stoptitle', tripdata['newstops'][i].Stoptitle);
          formData.append('duration', tripdata['newstops'][i].duration);
        }
      } else {
        formData.append(key, tripdata[key]);
        if (key === 'photo') {
          for (let i = 0; i < tripdata['photo'].length; i++) {
            formData.append('photo', tripdata['photo'][i]);
          }
        }
      }
    }
    return this._HttpClient.put(url + `tours/${id}`, formData);
  }
  deleteTrip(id: any): Observable<any> {
    return this._HttpClient.delete(url + `tours/${id}`);
  }
  deleteStops(id: any): Observable<any> {
    return this._HttpClient.put(url + `tours/stops/${id}`, {});
  }
}
