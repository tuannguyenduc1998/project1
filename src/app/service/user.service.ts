import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrls = 'http://hawadevapi.bys.vn/api/user/';
  constructor(private http: HttpClient) { }

  getUserItems(user: User){
    const url = `${this.userUrls}/get?${user.accountId}`;
    this.http.get(url);
  }
}
