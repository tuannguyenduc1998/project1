import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FilterModelProfile } from 'src/app/model/declareHarvests.model';
import { ForestCreate } from 'src/app/model/profile-forest.model';
import { UserLoginData } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ForestProfileService {

  constructor(private http: HttpClient) { }

  private url = 'http://hawaddsapi.bys.vn/api/';
  private loggedInStatus = JSON.parse(localStorage.getItem('LoginStatus'));
  user: UserLoginData;
  forestCreate: ForestCreate;
  forestOrTreeId: string;
  filterModel: FilterModelProfile = new FilterModelProfile();

  getHttpOptions(type: string): any{
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': type , Authorization:
      `Bearer ${this.user.jwtToken}`})
    };
    return httpOptions;
  }

  getForests(): Observable<any> {
    const httpOptions = this.getHttpOptions('application/json');
    return this.http.get(this.url + 'forest/4cba385e-e411-4d22-b4de-1478dbbb382c', httpOptions);
  }

  getHarvestMethod(): Observable<any> {
    return this.http.get(this.url + 'data/masterdata?groupsName=HarvestMethod');
  }

  create(forests: ForestCreate): Observable<ForestCreate> {
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization:
          `Bearer ${this.user.jwtToken}`
      })
    };
    return this.http.post<ForestCreate>(this.url + 'declare-harvest/create', forests, httpOptions).pipe(
      tap((forests: ForestCreate) => forests)
    );
  }

  getDeclareHarvestStatus(): Observable<any> {
    const httpOptions = this.getHttpOptions('application/json');
    return this.http.get(this.url + 'data/masterdata?groupsName=DeclareHarvestStatus', httpOptions);
  }

  getDeclareHarvest(pageIndex: number, pageSize: number, filterModel?: FilterModelProfile): Observable<any> {
    this.user = this.loggedInStatus;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization:
          `Bearer ${this.user.jwtToken}`
      }),
      params: this.setParams({...filterModel})
    };
    return this.http.get(this.url + `declare-harvest/filter/${pageIndex - 1}/${pageSize}`, httpOptions);
  }

  setParams(data: any): HttpParams {
    for (const item in data ) {
      if (data[item] instanceof Date) {
        data[item] = Math.floor(data[item].getTime() / 1000);
    }
    }
    return data;
  }

  getDeclareHarvestById(id: string): Observable<any> {
    const httpOptions = this.getHttpOptions('application/json');
    return this.http.get(this.url + `declare-harvest/${id}?isGroupByPlot=false`, httpOptions);
  }

  getForestByForestId(forestId: string, isForest: string): Observable<any> {
    const httpOptions = this.getHttpOptions('application/json');
    if (isForest){
      this.forestOrTreeId = 'forest';
    }
    else{
      this.forestOrTreeId = 'standing-tree-tradition';
    }
    return this.http.get(this.url + `${this.forestOrTreeId}/${forestId}`, httpOptions);
  }

  onSaveFilter(fromDate: number, toDate: number, status: string, createFromForest: boolean, searchKey: string): void{
    this.filterModel.fromDate = fromDate;
    this.filterModel.toDate = toDate;
    this.filterModel.status = status;
    this.filterModel.createFromForest = createFromForest;
    this.filterModel.searchKey = searchKey;
  }
}
