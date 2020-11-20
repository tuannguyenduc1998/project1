import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MasterdataService } from 'src/app/shared/service/masterdata.service';
import { UserService } from 'src/app/shared/service/user.service';
import { HttpClient } from '@angular/common/http';
import { ImgeFiles, User } from 'src/app/shared/model/user.model';
import {
  AddressMasterData,
  MasterData,
  MasterDataAddress,
  MasterDataAddressChildDistrict,
  MasterDataAddressChildProvince,
  MasterDataAddressChildWard,
  MasterDataChild,
} from 'src/app/shared/model/masterData.model';
import { Router } from '@angular/router';
import { TypeForestOwn, TypeForm } from 'src/app/shared/constant/type-form';

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
    private datepipe: DatePipe,
    private http: HttpClient,
    private router: Router
  ) {}
  @Input() model: User = new User();
  userForm: FormGroup;
  userModel: User = new User();
  userImgModel: ImgeFiles = new ImgeFiles();
  masterDataUserType: MasterData = new MasterData();
  masterDataChild: MasterDataChild[];
  typeForm = TypeForm;
  typeForestOwn = TypeForestOwn;
  pipe = new DatePipe('en-US');
  forestOwnerTypeDefault: MasterDataChild = new MasterDataChild();
  masterDataAddress: MasterDataAddress = new MasterDataAddress();
  addressMasterData: AddressMasterData[];
  masterDataAddressChildProvince: AddressMasterData[];
  masterDataAddressChildDistrict: AddressMasterData[];
  masterDataAddressChildWard: AddressMasterData[];
  cpfFormatadoValue: string;
  @Input() type: string;
  url = 'http://hawaddsapi.bys.vn/api/file/';
  address: string;
  showModal: boolean;
  imgeModel: string[];
  id: string;
  index: number;

  ngOnInit(): void {
    forkJoin([
      this.userService.getUserDetails(),
      this.masterDataService.getMasterData(),
      this.masterDataService.addressMaster
    ]).subscribe(([result1, result2, result3]) => {
      this.userModel = result1.data;
      this.address = this.userModel.street.concat(
        ', ',
        this.userModel.commune.value,
        ', ',
        this.userModel.district.value,
        ', ',
        this.userModel.province.value
      );
      if (this.userModel.userType === this.typeForestOwn.household) {
        this.masterDataUserType = result2.data;
        this.masterDataAddressChildProvince = this.masterDataService.getProvince('1', result3);
        this.masterDataAddressChildDistrict = this.masterDataService.getDistrict(
          parseInt(this.userModel.province.code, 0),
          this.masterDataAddressChildProvince
        );
        this.masterDataAddressChildWard = this.masterDataService.getCommune(
          parseInt(this.userModel.district && this.userModel.district.code, 0),
          this.masterDataAddressChildDistrict
        );
        // if (result3) {
        //     this.addressMasterData = result3;
        //     this.masterDataAddressChildProvince = this.addressMasterData.childs;
        //     this.masterDataAddressChildDistrict = this.masterDataAddressChildProvince.filter(
        //       (x) => x.code === this.userModel.province.code
        //     )[0].childs;
        //     this.masterDataAddressChildWard = this.masterDataAddressChildDistrict.filter(
        //       (x) => x.code === this.userModel.district.code
        //     )[0].childs;
        //   }
        // this.masterDataChild = this.masterDataUserType[0].childs;
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
      houseRegistrationImages: [this.userModel.houseRegistrationImages],
      address: [this.address],
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

  onSelectFile(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.userService.setHouseRegistrationImages(file).subscribe((res) => {
        this.userModel.houseRegistrationImages.push(res.data.id);
        this.userImgModel = res.data;
        console.log(this.userModel);
      });
    }
  }

  removeSelectedFile(index): void {
    this.userModel.houseRegistrationImages.splice(index, 1);
  }

  onUpdate(): void {
    this.userModel.houseRegistrationImages = this.userForm.get(
      'houseRegistrationImages'
    ).value;
    this.userService.updateUser(this.userModel).subscribe((res) => {
      this.router.navigateByUrl(`/dashboard/user/view`);
    });
  }

  showModalImage(img: string[], id: string, index: number): void {
    this.showModal = true;
    this.imgeModel = img;
    this.id = id;
    this.index = index;
  }

  closeImageModal(): void {
    this.showModal = false;
  }
}
