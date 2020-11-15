import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/model/data';
import { User, UserLoginData } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrls = 'http://hawaddsapi.bys.vn/api/user';
  private url = 'http://hawaddsapi.bys.vn/api/';
  private loggedInStatus = JSON.parse(localStorage.getItem('LoginStatus'));
  user: UserLoginData;
  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<any>{
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization:
      `Bearer ${this.user.jwtToken}`})
    };
    const url = `${this.userUrls}/getdetail`;
    return this.http.get(url, httpOptions);
  }

  setLoginStatus(value): void {
    this.loggedInStatus = value;
    localStorage.setItem('LoginStatus', JSON.stringify(value));
  }

  get LoginStatus(): any{
    return JSON.parse(localStorage.getItem('LoginStatus'));
  }

  getHouseRegistrationImages(file: any): Observable<any>{
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization:
      `Bearer ${this.user.jwtToken}`})
    };
    return this.http.get(`http://hawaddsapi.bys.vn/api/file/${file}`, httpOptions);
  }

  setHouseRegistrationImages(file: File): Observable<any>{
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' , Authorization:
      `Bearer ${this.user.jwtToken}`})
    };
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.url + `file`, formData);
  }

  updateUser(user: User): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.url + `user/updatedetail`, user, httpOptions);
  }
}
