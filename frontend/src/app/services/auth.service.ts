import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router, RouterModule } from '@angular/router';
import { url } from './baseUrl';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  UserId: any;
  CompanyId: any;
  constructor(private _HttpClint: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.saveUserData();
    }
    if (localStorage.getItem('companyToken') != null) {
      this.saveCompanyData();
    }
  }
  userData: any = new BehaviorSubject(null);
  companyData: any = new BehaviorSubject(null);

  saveUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken: object = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
    this.UserId = localStorage.getItem('userID');
  }
  saveCompanyData() {
    let encodedToken = JSON.stringify(localStorage.getItem('companyToken'));
    let decodedToken: object = jwtDecode(encodedToken);
    this.companyData.next(decodedToken);
    this.CompanyId = localStorage.getItem('companyID');
  }

  UserRegister(userData: object): Observable<any> {
    return this._HttpClint.post('http://localhost:3000/users/signup', userData);
  }
  CompanyRegister(companyData: object): Observable<any> {
    return this._HttpClint.post(
      'http://localhost:3000/company/signup',
      companyData
    );
  }

  Userlogin(userdata: object): Observable<any> {
    return this._HttpClint.post('http://localhost:3000/users/signin', userdata);
  }
  Companylogin(companydata: object): Observable<any> {
    return this._HttpClint.post(
      'http://localhost:3000/company/signin',
      companydata
    );
  }
  userlogout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    this.userData.next(null);
    this._Router.navigate(['/LandingPage']);
  }
  companylogout() {
    localStorage.removeItem('companyToken');
    localStorage.removeItem('companyID');
    this.companyData.next(null);
    this._Router.navigate(['/LandingPage']);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /// TRIP METHODS :

  /*{
  headers: new HttpHeaders({
    'content-type': 'application/json',
    'token':token
  })
}
token:any

*/
}
