import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class TourService {
  private readonly baseUrl = 'http://localhost:3000/tours/';
  constructor(private http: HttpClient) {}
  getAllTours() {
    return this.http.get(this.baseUrl);
  }
  getTourById(id: string) {
    return this.http.get(`${this.baseUrl}${id}`);
  }
  deleteTourById(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
  patchTourById(id: string, updateData: any) {
    return this.http.put(this.baseUrl + id, updateData);
  }
  search(city: string, distance: number, maxGroupSize: number) {
    const query = `?city=${city}&distance=${distance}&maxGroupSize=${maxGroupSize}`;
    const endPoint = `/search/getTourBySearch${query}`;
    return this.http.get(this.baseUrl + endPoint);
  }
}
