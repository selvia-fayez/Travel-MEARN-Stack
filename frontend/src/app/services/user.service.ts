import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
Observable;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'http://localhost:3000/users/cart/';
  constructor(private _HttpClient: HttpClient) {}
  addToCart(id: any) {
    let userID = localStorage.getItem('userID');
    return this._HttpClient.post(this.baseUrl + userID + '?tripId=' + id, {});
  }
  getUserCart() {
    let userID = localStorage.getItem('userID');
    return this._HttpClient.get('http://localhost:3000/users/cart/' + userID);
  }
  addToFavorite(id: any) {
    let userID = localStorage.getItem('userID');
    return this._HttpClient.post(
      'http://localhost:3000/users/favorite/' + userID + '?tripId=' + id,
      {}
    );
  }
  getUserFavorite() {
    let userID = localStorage.getItem('userID');
    return this._HttpClient.get(
      'http://localhost:3000/users/favorite/' + userID
    );
  }
  deleteFromCart(id: any) {
    let userID = localStorage.getItem('userID');
    return this._HttpClient.delete(
      'http://localhost:3000/users/cart/' + userID + '?tripId=' + id,
      {}
    );
  }
  deleteFromFavorite(id: any) {
    let userID = localStorage.getItem('userID');
    return this._HttpClient.delete(
      'http://localhost:3000/users/favorite/' + userID + '?tripId=' + id,
      {}
    );
  }
}
