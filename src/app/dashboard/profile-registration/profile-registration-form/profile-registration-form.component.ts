import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzModalService } from 'ng-zorro-antd/modal';
import { forkJoin } from 'rxjs';
import { MasterData } from 'src/app/model/masterData.model';
import { ForestCreate, ForestPilots, ProfileForest } from 'src/app/model/profile-forest.model';
import { UserLoginData } from 'src/app/model/user.model';
import { ModalPlotsComponent } from 'src/app/shared/components/modal-plots/modal-plots.component';
import { ForestProfileService } from 'src/app/shared/service/forest-profile.service';
import { MasterdataService } from 'src/app/shared/service/masterdata.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-profile-registration-form',
  templateUrl: './profile-registration-form.component.html',
  styleUrls: ['./profile-registration-form.component.scss']
})
export class ProfileRegistrationFormComponent implements OnInit {

  profileForm: FormGroup;
  forestForm: FormGroup;
  profileModel: ProfileForest = new ProfileForest();
  disabled = true;
  user: UserLoginData;
  dateNow = 1604496411;
  setOfCheckedId = new Set<string>();
  forestPlotList: ForestPilots[];
  forestPlotLists: ForestPilots[];
  province: string;
  forestCreate: ForestCreate = new ForestCreate();
  forestCreates: ForestCreate[];
  masterData: MasterData = new MasterData();
  today = new Date();
  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private forestService: ForestProfileService, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.user = this.userService.LoginStatus;
    forkJoin([this.forestService.getForests(), this.forestService.getHarvestMethod()]).subscribe((result) => {
      this.masterData = result[1].data;
      this.profileModel = result[0].data;
      this.createForm();
    });
      // this.a = this.profileModel.forestPlots.filter( x => x.trees).reduce((accumulator, currentValue) => {
      //   return accumulator.concat(currentValue.trees);
      // }, []);
      // this.c = this.profileModel.forestPlots.filter( x => x.trees.forEach( y => y.area));
  }

  createForm(): void {
    this.profileForm = this.formBuilder.group({
      profileCode: [this.profileModel.profileCode],
      profileDate: [this.dateNow * 1000],
      profileName: [this.profileModel.profileName],
      fullname: [this.user.fullName],
      isCheckMe: ['me'],
      profileID: [''],
      fromDate: [''],
      toDate: [''],
      harvestMethod: [''],
      forestType: ['']
    });
  }

  showModal(): void {
    const modal = this.modalService.create({
      nzContent: ModalPlotsComponent,
      nzComponentParams: {
        usedId: this.setOfCheckedId
      },
      nzWidth: '70%',
      nzFooter: [
        {label: ''}
      ]
    });

    modal.afterClose.subscribe(result => {
      if (result){
      [...result.list1].forEach(o => {
        this.setOfCheckedId.add(o);
      });

      console.log(result.list1);
      this.forestPlotLists = result.list1;
      this.forestPlotList = result.list2;
      this.province = result.province;
    }
    });

  }

  disabledFromDate = (fromDate: Date): boolean => {
    if (!fromDate || !this.today) {
      return false;
    }
    return fromDate.getTime() < this.today.getTime();
  }

  disabledToDate = (toDate: Date): boolean => {
    if (!toDate || !this.profileForm.getRawValue().fromDate) {
      return false;
    }
    return toDate.getTime() <= this.profileForm.getRawValue().fromDate.getTime();
  }

  deleteItem(id: string): void {
    this.setOfCheckedId.delete(id);
  }

  createFormForest(): void{
    this.forestForm = this.formBuilder.group({
      profileCode: [this.profileForm.value.profileCode],
      profileDate: [this.profileForm.value.profileDate],
      profileName: [this.profileForm.value.profileName],
      fullname: [this.profileForm.value.fullname],
      isCheckMe: ['me'],
      profileID: [this.profileForm.value.profileID],
      fromDate: [this.profileForm.value.fromDate],
      toDate: [this.profileForm.value.toDate],
      harvestMethod: [this.profileForm.value.harvestMethod],
      forestType: [this.profileForm.value.forestType]
    });
  }
  onSave(): void{
    this.forestForm = this.formBuilder.group({
      profileCode: [this.profileForm.value.profileCode],
      profileDate: [this.profileForm.value.profileDate / 1000],
      profileName: [this.profileForm.value.profileName],
      fullname: [this.profileForm.value.fullname],
      isCheckMe: ['me'],
      profileID: [this.profileForm.value.profileID],
      fromDate: [Date.parse(this.profileForm.value.fromDate) / 1000],
      toDate: [Date.parse(this.profileForm.value.toDate) / 1000],
      harvestMethod: [this.profileForm.value.harvestMethod],
      forestType: [this.profileForm.value.forestType]
    });
    this.forestCreate.forestId = null;
    this.forestCreate.harvesterId = null;
    this.forestCreate.profileDate = this.forestForm.value.profileDate;
    this.forestCreate.standingTreeTraditionId = null;
    this.forestCreate.profileName = this.forestForm.value.profileName;
    this.forestCreate.profileCreatedUserId = this.user.userId;
    this.forestCreate.fromDate = this.forestForm.value.fromDate;
    this.forestCreate.toDate = this.forestForm.value.toDate;
    this.forestCreate.harvestMethod = this.masterData[0].childs.filter( x => x.code === this.forestForm.value.harvestMethod)[0];
    this.forestCreate.forestType = this.forestForm.value.forestType;
    // this.a = this.profileModel.forestPlots.filter( x => x.trees).reduce((accumulator, currentValue) => {
    //     return accumulator.concat(currentValue.trees);
    //   }, []);
    console.log(this.forestForm.value);
    console.log(this.forestCreate);
    this.forestService.create(this.forestCreate)
      .subscribe(insertedEmployee => {
        // this.forestCreates.push(insertedEmployee);
        console.log(insertedEmployee);
      });
  }
}
