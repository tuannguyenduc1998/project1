import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from 'src/app/model/data';
import { UserLoginData } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrls = 'http://hawadevapi.bys.vn/api/user/';
  constructor(private http: HttpClient) { }

  getUserItems(user: UserLoginData){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization:
      'Bareer ' + user.jwtToken})
    };
    const url = `${this.userUrls}/getdetail?userId=${user.userId}`;
    return this.http.get(url);
  }
}
