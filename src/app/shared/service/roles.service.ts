import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoleModel } from 'src/app/model/roles.model';
import { UserLoginData } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  private url = 'http://hawaddsapi.bys.vn/api/';
  private loggedInStatus = JSON.parse(localStorage.getItem('LoginStatus'));
  user: UserLoginData;
  public roles$ = new BehaviorSubject<RoleModel>(null);

  getRoles(): Observable<any>{
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization:
          `Bearer ${this.user.jwtToken}`
      })
    };
    return this.http.get(this.url + `role/get`, httpOptions);
  }
}
