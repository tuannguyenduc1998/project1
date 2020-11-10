import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CreateFrom } from 'src/app/constant/createFrom';
import { Status, StatusCustom } from 'src/app/constant/status';
import { DeclareHarvests, FilterModelProfile } from 'src/app/model/declareHarvests.model';
import { createFromForest, MasterData, MasterDataChild } from 'src/app/model/masterData.model';
import { UserLoginData } from 'src/app/model/user.model';
import { ForestProfileService } from 'src/app/shared/service/forest-profile.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-profile-registration-list',
  templateUrl: './profile-registration-list.component.html',
  styleUrls: ['./profile-registration-list.component.scss']
})
export class ProfileRegistrationListComponent implements OnInit {
  user: UserLoginData;
  masterData: MasterData = new MasterData();
  selectedValue = '-Tất cả(All)-';
  selectedMasterData: MasterDataChild[];
  listOfRandomUser: DeclareHarvests = new DeclareHarvests();
  loading = true;
  date = 0;
  filterModel = new FilterModelProfile();
  status = Status;
  statusCustom = StatusCustom;
  createFromForest = createFromForest;
  createFrom = CreateFrom;
  statusEnglish: string;
  constructor(private userService: UserService, private forestService: ForestProfileService) { }

  ngOnInit(): void {
    this.user = this.userService.LoginStatus;
    this.forestService.getDeclareHarvestStatus().subscribe((result) => {
      this.masterData = result.data;
      this.selectedMasterData = this.masterData[0].childs;
    });
    this.loadDataFromServer(this.listOfRandomUser.pageIndex, this.listOfRandomUser.pageSize);
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number
  ): void {
    this.loading = true;
    this.forestService.getDeclareHarvest(pageIndex, pageSize, this.filterModel).subscribe(results => {
      this.loading = false;
      const data = results.data;
      this.listOfRandomUser = new DeclareHarvests();
      this.listOfRandomUser.pageIndex = data.pageIndex + 1;
      this.listOfRandomUser.pageSize = data.pageSize;
      this.listOfRandomUser.totalCount = data.totalCount;
      this.listOfRandomUser.totalPages = data.totalPages;
      this.listOfRandomUser.items = data.items;
      this.listOfRandomUser.items.map( x => {
        if (x.status === this.status.new){
          x.status = this.statusCustom.new;
          this.statusEnglish = this.statusCustom.newEnglish;
        }
        else if (x.status === this.status.sent){
          x.status = this.statusCustom.sent;
          this.statusEnglish = this.statusCustom.sentEnglish;
        }
        else {
          x.status = this.statusCustom.cancelled;
          this.statusEnglish = this.statusCustom.cancelledEnglish;
        }

        if (x.standingTreeTraditionId === null){
          x.standingTreeTraditionId = this.createFrom.false;
        }
        else {
          x.standingTreeTraditionId = this.createFrom.true;
        }
      });
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex} = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  onSubmitFilter(): void{
   this.loadDataFromServer(this.listOfRandomUser.pageIndex, this.listOfRandomUser.pageSize);
  }
}
