import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { TypeForestOwn, TypeForm } from 'src/app/constant/type-form';
import {
  MasterData,
  MasterDataAddress,
  MasterDataAddressChildDistrict,
  MasterDataAddressChildProvince,
  MasterDataAddressChildWard,
  MasterDataChild,
} from 'src/app/model/masterData.model';
import { User } from 'src/app/model/user.model';
import { DatePipe } from '@angular/common';
import { MasterdataService } from 'src/app/shared/service/masterdata.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private masterDataService: MasterdataService,
    private datepipe: DatePipe
  ) {}

  @Input() model: User = new User();
  userForm: FormGroup;
  userModel: User = new User();
  masterDataUserType: MasterData = new MasterData();
  masterDataChild: MasterDataChild[];
  typeForm = TypeForm;
  typeForestOwn = TypeForestOwn;
  pipe = new DatePipe('en-US');
  forestOwnerTypeDefault: MasterDataChild = new MasterDataChild();
  masterDataAddress: MasterDataAddress = new MasterDataAddress();
  masterDataAddressChildProvince: MasterDataAddressChildProvince[];
  masterDataAddressChildDistrict: MasterDataAddressChildDistrict[];
  masterDataAddressChildWard: MasterDataAddressChildWard[];
  cpfFormatadoValue: string;
  @Input() type: string;

  ngOnInit(): void {
    forkJoin([
      this.userService.getUserDetails(),
      this.masterDataService.getMasterData(),
      this.masterDataService.getMasterDataAddress(),
    ]).subscribe((result) => {
      this.userModel = result[0].data;
      if (this.userModel.userType === this.typeForestOwn.household) {
        this.masterDataUserType = result[1].data;
        this.masterDataChild = this.masterDataUserType[0].childs;
        this.masterDataAddress = result[2].data;
        this.masterDataAddressChildProvince = this.masterDataAddress[0].childs;
        this.masterDataAddressChildDistrict = this.masterDataAddressChildProvince.filter(
          (x) => x.code === this.userModel.province.code
        )[0].childs;
        this.masterDataAddressChildWard = this.masterDataAddressChildDistrict.filter(
          (x) => x.code === this.userModel.district.code
        )[0].childs;
      }
      this.createForm();
    });
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      coCode: [this.userModel.coCode],
      fullName: [this.userModel.fullName],
      cellphoneNumber: [this.userModel.cellphoneNumber],
      identityCard: [this.userModel.identityCard],
      identityCardIssuedDate: [this.userModel.identityCardIssuedDate * 1000],
      village: [this.userModel.village],
      street: [this.userModel.street],
      district: [this.userModel.district.code],
      commune: [this.userModel.commune.code],
      province: [this.userModel.province.code],
      forestOwnerType: [this.userModel.forestOwnerType.code],
    });
  }

  onSelectDistrict(countryid): void {
    this.masterDataAddressChildDistrict = this.masterDataAddressChildProvince.filter(
      (x) => x.code === countryid
    )[0].childs;
    this.masterDataAddressChildWard = this.masterDataAddressChildDistrict[0].childs;
  }

  onSelectWard(countryid): void {
    this.masterDataAddressChildWard = this.masterDataAddressChildDistrict.filter(
      (x) => x.code === countryid
    )[0].childs;
  }
}
