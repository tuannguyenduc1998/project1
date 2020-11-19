import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserLoginData } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://hawaddsapi.bys.vn/api/';
  private loggedInStatus = JSON.parse(localStorage.getItem('LoginStatus'));
  user: UserLoginData;
  constructor(private http: HttpClient) { }

  getHttpOptions(type: string): any{
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': type , Authorization:
      `Bearer ${this.user.jwtToken}`})
    };
    return httpOptions;
  }

  getUserDetails(): Observable<any>{
    const httpOptions = this.getHttpOptions('application/json');
    const url = `${this.url}user/getdetail`;
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
    const httpOptions = this.getHttpOptions('application/json');
    return this.http.get(`http://hawaddsapi.bys.vn/api/file/${file}`, httpOptions);
  }

  setHouseRegistrationImages(file: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.url + `file`, formData);
  }

  updateUser(user: User): Observable<any>{
    const httpOptions = this.getHttpOptions('application/json');
    return this.http.put(this.url + `user/updatedetail`, user, httpOptions);
  }

  createUser(): Observable<any>{
    const httpOptions = this.getHttpOptions('application/json');
    return this.http.post(this.url + `user/create`, httpOptions);
  }
}
