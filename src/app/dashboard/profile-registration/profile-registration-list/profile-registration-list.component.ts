import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { forkJoin } from 'rxjs';
import { CreateFrom } from 'src/app/constant/createFrom';
import { Status, StatusCustom } from 'src/app/constant/status';
import {
  DeclareHarvests,
  FilterModelProfile,
} from 'src/app/model/declareHarvests.model';
import {
  createFromForest,
  MasterData,
  MasterDataChild,
} from 'src/app/model/masterData.model';
import { RoleModel } from 'src/app/model/roles.model';
import { UserLoginData } from 'src/app/model/user.model';
import { ForestProfileService } from 'src/app/shared/service/forest-profile.service';
import { RolesService } from 'src/app/shared/service/roles.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-profile-registration-list',
  templateUrl: './profile-registration-list.component.html',
  styleUrls: ['./profile-registration-list.component.scss'],
})
export class ProfileRegistrationListComponent implements OnInit {
  user: UserLoginData;
  masterData: MasterData = new MasterData();
  selectedValue = '-Tất cả(All)-';
  selectedMasterData: MasterDataChild[];
  declareHarvests: DeclareHarvests = new DeclareHarvests();
  roleModel: RoleModel = new RoleModel();
  loading = true;
  date = 0;
  filterModel = new FilterModelProfile();
  status = Status;
  statusCustom = StatusCustom;
  createFromForest = createFromForest;
  createFrom = CreateFrom;
  statusEnglish: string;
  roles: string[];
  constructor(
    private userService: UserService,
    private forestService: ForestProfileService,
    private router: Router,
    private roleService: RolesService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.LoginStatus;
    forkJoin([this.forestService.getDeclareHarvestStatus()]).subscribe( (results) => {
      this.masterData = results[0].data;
      this.selectedMasterData = this.masterData[0].childs;
      // this.roleModel = results[1].data;
      // this.roles = this.roleModel.roles.filter( x => x === 'HarvestedTimberSourceViewAllProfiles');
    });
    this.loadDataFromServer(
      this.declareHarvests.pageIndex,
      this.declareHarvests.pageSize
    );
  }

  loadDataFromServer(pageIndex: number, pageSize: number): void {
    this.loading = true;
    if (this.forestService.filterModel.fromDate){
      this.filterModel.fromDate = this.forestService.filterModel.fromDate;
    }
    if (this.forestService.filterModel.toDate){
      this.filterModel.toDate = this.forestService.filterModel.toDate;
    }
    if (this.forestService.filterModel.status){
      this.filterModel.status = this.forestService.filterModel.status;
    }
    if (this.forestService.filterModel.createFromForest){
      this.filterModel.createFromForest = this.forestService.filterModel.createFromForest;
    }
    if (this.forestService.filterModel.searchKey){
      this.filterModel.searchKey = this.forestService.filterModel.searchKey;
    }
    this.forestService
      .getDeclareHarvest(pageIndex, pageSize, this.filterModel)
      .subscribe((results) => {
        this.loading = false;
        const data = results.data;
        this.declareHarvests = new DeclareHarvests();
        this.declareHarvests.pageIndex = data.pageIndex + 1;
        this.declareHarvests.pageSize = data.pageSize;
        this.declareHarvests.totalCount = data.totalCount;
        this.declareHarvests.totalPages = data.totalPages;
        this.declareHarvests.items = data.items;
        this.declareHarvests.items.map((x) => {
          if (x.status === this.status.new) {
            x.status = this.statusCustom.new;
            this.statusEnglish = this.statusCustom.newEnglish;
          } else if (x.status === this.status.sent) {
            x.status = this.statusCustom.sent;
            this.statusEnglish = this.statusCustom.sentEnglish;
          } else {
            x.status = this.statusCustom.cancelled;
            this.statusEnglish = this.statusCustom.cancelledEnglish;
          }

          if (x.standingTreeTraditionId === null) {
            x.standingTreeTraditionId = this.createFrom.false;
          } else {
            x.standingTreeTraditionId = this.createFrom.true;
          }
        });
      });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex } = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  onSubmitFilter(): void {
    this.loadDataFromServer(
      this.declareHarvests.pageIndex,
      this.declareHarvests.pageSize
    );
  }

  onSubmitRemoveFilter(): void {
    this.forestService.onSaveFilter(
      null,
      null,
      null,
      null,
      null
    );
    this.loadDataFromServer(
      this.declareHarvests.pageIndex,
      this.declareHarvests.pageSize
    );
  }

  nextView(): void {
    this.forestService.onSaveFilter(
      this.filterModel.fromDate,
      this.filterModel.toDate,
      this.filterModel.status,
      this.filterModel.createFromForest,
      this.filterModel.searchKey
    );
  }
}
