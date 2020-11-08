import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DeclareHarvests } from 'src/app/model/declareHarvests.model';
import { MasterData, MasterDataChild } from 'src/app/model/masterData.model';
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
  total = 1;
  // listOfRandomUser: DeclareHarvests[] = [];
  listOfRandomUser: DeclareHarvests = new DeclareHarvests();
  loading = true;
  pageSize = 10;
  pageIndex = 0;
  date = '';
  constructor(private userService: UserService, private forestService: ForestProfileService ) { }

  ngOnInit(): void {
    this.user = this.userService.LoginStatus;
    this.forestService.getDeclareHarvestStatus().subscribe( (result) => {
      this.masterData = result.data;
      this.selectedMasterData = this.masterData[0].childs;
    });
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number
  ): void {
    this.loading = true;
    this.forestService.getDeclareHarvest(pageIndex, pageSize).subscribe(results => {
      this.loading = false;
      this.listOfRandomUser = results.data;
      this.total = this.listOfRandomUser.totalCount; // mock the total data here
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex} = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

}
