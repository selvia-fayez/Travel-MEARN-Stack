import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class CompanyInfoService {
  private readonly baseUrl = 'http://localhost:3000/company/';
  constructor(private http: HttpClient) {}
  getCompanyInfo() {
    const companyId = localStorage.getItem('companyID');
    return this.http.get(this.baseUrl + companyId);
  }
}
