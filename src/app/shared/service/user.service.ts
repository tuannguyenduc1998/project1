import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from 'src/app/model/data';
import { User, UserLoginData } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrls = 'http://hawadevapi.bys.vn/api/user';
  private loggedInStatus = JSON.parse(localStorage.getItem('LoginStatus'));
  user: UserLoginData;
  constructor(private http: HttpClient) { }

  getUserItems(){
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization:
      `Bearer ${this.user.jwtToken}`})
    };
    const url = `${this.userUrls}/getdetail`;
    return this.http.get<any>(url, httpOptions);
  }

  setLoginStatus(value): void {
    this.loggedInStatus = value;
    localStorage.setItem('LoginStatus', JSON.stringify(value));
  }

  get LoginStatus(){
    return JSON.parse(localStorage.getItem('LoginStatus'));
  }
}
