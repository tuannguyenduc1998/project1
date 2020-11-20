import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AddressMasterData, MasterDataAddress, MasterDataAddressChildDistrict, MasterDataAddressChildProvince } from '../model/masterData.model';
import { SignUpData } from '../model/sign-up-data.model';
import { UserLoginData } from '../model/user.model';

const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class MasterdataService {

  constructor(private http: HttpClient) { }

  private masterDataUrl = 'http://hawaddsapi.bys.vn/api/data';
  private loggedInStatus = JSON.parse(localStorage.getItem('LoginStatus'));
  user: UserLoginData;
  public addressmasterdata$: Observable<MasterDataAddress[]>;
  public signUpData$ = new BehaviorSubject<SignUpData>(null);

  getMasterData(): Observable<any>{
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' , Authorization:
      `Bearer ${this.user.jwtToken}`})
    };
    return this.http.get(this.masterDataUrl + '/masterdata?groupsName=HouseholdForestOwnerType');
  }

  getMasterDataAddress(): Observable<any>{
    return this.http.get(this.masterDataUrl + '/addressmasterdata');
  }

  // getAddressMasterData(): BehaviorSubject<MasterDataAddress>{
  //   return this.addressmasterdata$;
  // }

  get addressMaster(): Observable<AddressMasterData[]> {
    if (!this.addressmasterdata$) {
      this.addressmasterdata$ = this.getMasterData().pipe(
        shareReplay(CACHE_SIZE)
      );
    }
    return this.addressmasterdata$;
  }

  getSignUp(): Observable<any>{
    return this.http.get(this.masterDataUrl + `/getsignupdata`);
  }

  getSignUpData(): BehaviorSubject<SignUpData>{
    return this.signUpData$;
  }

  getProvince(idCountry: string, dataAddressMasterData: AddressMasterData[]): AddressMasterData[] {
    const data = (dataAddressMasterData || []).find(
      item => item.code === idCountry
    );
    return data ? data.childs : null;
  }

  getDistrict(idProvince: string, dataCountry: AddressMasterData[]): AddressMasterData[] {
    const data = (dataCountry || []).find(item => item.code === idProvince);
    return data ? data.childs : null;
  }

  getCommune(idDistrict: string, dataDistrict: AddressMasterData[]): AddressMasterData[] {
    const data = (dataDistrict || []).find(item => item.code === idDistrict);
    return data ? data.childs : null;
  }
}
