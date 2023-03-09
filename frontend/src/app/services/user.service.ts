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
  deleteFromCart(
    id: any,
    ItemQuantity: any,
    ItemPrice: any,
    totalPrice: any,
    totalQuantity: any,
    availableSeats: any
  ) {
    let userID = localStorage.getItem('userID');
    const query = `&ItemQuantity=${ItemQuantity}&ItemPrice=${ItemPrice}&totalPrice=${totalPrice}&totalQuantity=${totalQuantity}&availableSeats=${availableSeats}`;
    return this._HttpClient.delete(
      'http://localhost:3000/users/cart/' + userID + '?tripId=' + id + query,
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
  deleteCartAfterPay() {
    let userID = localStorage.getItem('userID');
    return this._HttpClient.delete(
      `http://localhost:3000/users/cartAfterPay/${userID}`
    );
  }
  updateQuantity(
    tripID: any,
    totalQuantity: any,
    totalPrice: any,
    availableSeats: any,
    ItemPrice: any,
    ItemQuanity: any
  ): Observable<any> {
    let userID = localStorage.getItem('userID');
    const query = `?totalQuantity=${totalQuantity}&totalPrice=${totalPrice}&availableSeats=${availableSeats}&ItemPrice=${ItemPrice}&ItemQuanity=${ItemQuanity}`;
    return this._HttpClient.put(
      `http://localhost:3000/users/cart/${userID}/${tripID}${query}`,
      {}
    );
  }
}
