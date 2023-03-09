import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class CompanyInfoService {
  private readonly baseUrl = 'http://localhost:3000/company/';
  constructor(private http: HttpClient) {}
  getCompanyInfo(): Observable<any> {
    const companyId = localStorage.getItem('companyID');
    return this.http.get(this.baseUrl + companyId);
  }
  UpdatePackage(packageType: any): Observable<any> {
    const companyId = localStorage.getItem('companyID');
    return this.http.put(this.baseUrl + companyId, { packageType });
  }
}
