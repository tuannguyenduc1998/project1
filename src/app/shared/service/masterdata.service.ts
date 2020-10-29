import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginData } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class MasterdataService {

  constructor(private http: HttpClient) { }

  private masterDataUrl = 'http://hawaddsapi.bys.vn/api/data';
  private masterDataUrls = 'http://hawaddsapi.bys.vn/api/data/masterdata?groupsName=HouseholdForestOwnerType';
  private loggedInStatus = JSON.parse(localStorage.getItem('LoginStatus'));
  user: UserLoginData;

  getMasterData(): Observable<any>{
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization:
      `Bearer ${this.user.jwtToken}`})
    };
    return this.http.get(this.masterDataUrl + '/masterdata?groupsName=HouseholdForestOwnerType', httpOptions);
  }

  getMasterDataAddress(): Observable<any>{
    return this.http.get(this.masterDataUrl + '/addressmasterdata');
  }
}
