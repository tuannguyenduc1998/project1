import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ForestCreate } from 'src/app/model/profile-forest.model';
import { UserLoginData } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ForestProfileService {

  constructor(private http: HttpClient) { }

  private Url = 'http://hawaddsapi.bys.vn/api/';
  private loggedInStatus = JSON.parse(localStorage.getItem('LoginStatus'));
  user: UserLoginData;
  forestCreate: ForestCreate;
  getForests(): Observable<any> {
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization:
          `Bearer ${this.user.jwtToken}`
      })
    };
    return this.http.get(this.Url + 'forest/4cba385e-e411-4d22-b4de-1478dbbb382c', httpOptions);
  }

  getHarvestMethod(): Observable<any> {
    return this.http.get(this.Url + 'data/masterdata?groupsName=HarvestMethod');
  }

  create(forests: ForestCreate): Observable<ForestCreate> {
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization:
          `Bearer ${this.user.jwtToken}`
      })
    };
    return this.http.post<ForestCreate>(this.Url + 'declare-harvest/create', forests, httpOptions).pipe(
      tap((forests: ForestCreate) => forests)
    );
  }

  getDeclareHarvestStatus(): Observable<any> {
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization:
          `Bearer ${this.user.jwtToken}`
      })
    };
    return this.http.get(this.Url + 'data/masterdata?groupsName=DeclareHarvestStatus', httpOptions);
  }

  getDeclareHarvest(pageIndex: number, pageSize: number): Observable<any> {
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization:
          `Bearer ${this.user.jwtToken}`
      })
    };
    return this.http.get(this.Url + `declare-harvest/filter/${pageIndex - 1}/${pageSize}`, httpOptions);
  }
}
