import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class TourService {
  private readonly baseUrl = 'http://localhost:3000/tours/';
  constructor(private http: HttpClient) {}
  getAllTours(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getTourById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }
  deleteTourById(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }
  patchTourById(id: string, updateData: any): Observable<any> {
    return this.http.put(this.baseUrl + id, updateData);
  }
  search(
    title: string,
    city?: string,
    distance?: number,
    maxGroupSize?: number
  ): Observable<any> {
    const companyId = localStorage.getItem('companyID');
    //const query = `?city=${city}&distance=${distance}&maxGroupSize=${maxGroupSize}`;
    const query = `?title=${title}`;
    //const endPoint = `search/getTourBySearch${query}`;
    return this.http.get(
      `${this.baseUrl}search/${companyId}/getTourBySearch${query}`
    );
  }
  searchBytitle(title: string): Observable<any> {
    const query = `?title=${title}`;
    return this.http.get(`${this.baseUrl}search/getTourBySearch${query}`);
  }
}
