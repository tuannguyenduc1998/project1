import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { forkJoin } from 'rxjs';
import {
  MasterDataAddress,
  MasterDataAddressChildDistrict,
  MasterDataAddressChildProvince,
  MasterDataAddressChildWard,
} from 'src/app/shared/model/masterData.model';
import { SignUpData } from 'src/app/shared/model/sign-up-data.model';
import { UserCreate } from 'src/app/shared/model/user-create.model';
import { MasterdataService } from 'src/app/shared/service/masterdata.service';
import { UserService } from 'src/app/shared/service/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-sign-up-household',
  templateUrl: './sign-up-household.component.html',
  styleUrls: ['./sign-up-household.component.scss'],
})
export class SignUpHouseholdComponent implements OnInit {
  userCreateForm: FormGroup;
  userCreateModel: UserCreate = new UserCreate();
  checked = false;
  showModal: boolean;
  imgeModel: string[] = [];
  address: string;
  masterDataAddress: MasterDataAddress = new MasterDataAddress();
  signUpData: SignUpData = new SignUpData();
  dataBusinessTypes;
  dataBusinessTypes1;
  masterDataAddressChildProvince: MasterDataAddressChildProvince[];
  masterDataAddressChildDistrict: MasterDataAddressChildDistrict[];
  masterDataAddressChildWard: MasterDataAddressChildWard[];
  url = 'http://hawaddsapi.bys.vn/api/file/';
  id: string;
  index: number;
  invalidMessages: string[] = [];
  @Input() isActive = false;
  formErrors = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmpassword: '',
  };
  validationMessages = {
    required: 'Trường này là bắt buộc nhập',
    minlength: 'Mật khẩu phải ít nhất 6 kí tự',
  };
  constructor(
    private formBuilder: FormBuilder,
    private masterDataService: MasterdataService,
    private router: Router,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    forkJoin([this.masterDataService.getMasterDataAddress(), this.masterDataService.getSignUp()]).subscribe((res) => {
      if (res[0].data) {
        this.masterDataAddress = res[0].data;
        this.masterDataAddressChildProvince = this.masterDataAddress[0].childs;
      }
      if (res[1].data){
        this.signUpData = res[1].data;
        this.dataBusinessTypes = this.signUpData.businessTypes.map((item) => {
          return this.mappingData(item);
        });
      }
      this.createForm();
    });
    // this.masterDataService.addressmasterdata$.subscribe((res) => {
    //   if (res) {
    //     this.masterDataAddress = res;
    //     this.masterDataAddressChildProvince = this.masterDataAddress[0].childs;
    //   }
    // });
    // this.masterDataService.signUpData$.subscribe((result) => {
    //   if (result){
    //     this.signUpData = result;
    //     this.dataBusinessTypes1 = this.signUpData.businessTypes.filter( x => x.children.filter( y => y.registFor === 'All'));
    //     this.dataBusinessTypes = this.signUpData.businessTypes.filter( x => x.item.registFor === 'All').map((item) => {
    //       return this.mappingData(item);
    //     });
    //     console.log(this.dataBusinessTypes);
    //     console.log(this.dataBusinessTypes1);
    //     this.createForm();
    //   }
    // });
  }

  createForm(): void {
    this.userCreateForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      identityCard: ['', Validators.required],
      cellPhoneNumber: ['', Validators.required],
      images: [''],
      province: [''],
      district: [''],
      commune: [''],
      village: [''],
      street: [''],
      address: [''],
      checked: [this.checked]
    });
  }

  validateForm(): boolean {
    this.invalidMessages = this.getInvalidMessages(
      this.userCreateForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  getInvalidMessages(form: FormGroup, formErrors: object): string[] {
    if (!form) {
      return;
    }
    const errorMessages = [];
    for (let field in formErrors) {
      formErrors[field] = '';
      const control = form.get(field);
      if (control && !control.valid) {
        for (const key in control.errors) {
          formErrors[field] += this.validationMessages[key] + '';
          break;
        }
      }
    }
    for (const key in formErrors) {
      if (formErrors.hasOwnProperty(key) && formErrors[key].length > 0) {
        errorMessages.push(formErrors[key]);
      }
    }
    return errorMessages;
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

  mappingData(item) {
    const itemReturn = {
      title: item.item.name,
      key: item.item.id,
      expanded: false,
      children: item.children.map(itemChild => this.mappingData(itemChild))
    };
    return itemReturn;
  }

  onSelectFile(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.userService.setHouseRegistrationImages(file).subscribe((res) => {
        this.imgeModel.push(res.data.id);
      });
    }
  }

  removeSelectedFile(index): void {
    this.userCreateModel.images.splice(index, 1);
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

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  goBack(): void {
    this.location.back();
  }
}
