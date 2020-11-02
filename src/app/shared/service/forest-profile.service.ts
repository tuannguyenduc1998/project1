import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginData } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ForestProfileService {

  constructor(private http: HttpClient) { }

  private Url = 'http://hawaddsapi.bys.vn/api/forest/4cba385e-e411-4d22-b4de-1478dbbb382c';
  private loggedInStatus = JSON.parse(localStorage.getItem('LoginStatus'));
  user: UserLoginData;
  getForests(): Observable<any>{
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization:
      `Bearer ${this.user.jwtToken}`})
    };
    return this.http.get(this.Url, httpOptions);
  }
}
