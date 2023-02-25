import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
UserisLogin:boolean=false
CompanyisLogin:boolean=false
  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
  next:()=>{
    if(this._AuthService.userData.getValue() != null){
      this.UserisLogin=true
    }else{
      this.UserisLogin=false 
    }
  }
  })
  this._AuthService.companyData.subscribe({
  next:()=>{
     if(this._AuthService.companyData.getValue() !=null){
      this.CompanyisLogin=true
    }else{
      this.CompanyisLogin=false 
    }
  }
  })
  }

  signOut(){
    if (this.UserisLogin){
      this._AuthService.userlogout()
    }
    else if(this.CompanyisLogin){
      this._AuthService.companylogout()
    }
  }
}
