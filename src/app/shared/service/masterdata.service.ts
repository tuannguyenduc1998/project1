import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MasterDataAddress } from '../model/masterData.model';
import { UserLoginData } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class MasterdataService {

  constructor(private http: HttpClient) { }

  private masterDataUrl = 'http://hawaddsapi.bys.vn/api/data';
  private loggedInStatus = JSON.parse(localStorage.getItem('LoginStatus'));
  user: UserLoginData;
  public addressmasterdata$ = new BehaviorSubject<MasterDataAddress>(null);

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

  getAddressMasterData(): BehaviorSubject<MasterDataAddress>{
    return this.addressmasterdata$;
  }
}
