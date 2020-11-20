import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { AddressMasterData, MasterDataAddress } from 'src/app/shared/model/masterData.model';
import { SignUpData } from 'src/app/shared/model/sign-up-data.model';
import { UserCreate } from 'src/app/shared/model/user-create.model';
import { MasterdataService } from 'src/app/shared/service/masterdata.service';
import { UserService } from 'src/app/shared/service/user.service';
import {Location} from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sign-up-enterprise',
  templateUrl: './sign-up-enterprise.component.html',
  styleUrls: ['./sign-up-enterprise.component.scss']
})
export class SignUpEnterpriseComponent implements OnInit {

  userCreateForm: FormGroup;
  userCreateModel: UserCreate = new UserCreate();
  showModal: boolean;
  imgeModel: string[] = [];
  masterDataAddress: MasterDataAddress = new MasterDataAddress();
  signUpData: SignUpData = new SignUpData();
  dataBusinessTypes;
  dataBusinessTypes1;
  masterDataAddressChildProvince: AddressMasterData[];
  masterDataAddressChildDistrict: AddressMasterData[];
  masterDataAddressChildWard: AddressMasterData[];
  url = 'http://hawaddsapi.bys.vn/api/file/';
  id: string;
  index: number;
  invalidMessages: string[] = [];
  @Input() isActive = false;
  checked = false;
  formErrors = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmpassword: '',
    shortName: '',
    representativeName: '',
    taxCode: ''
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
    forkJoin([this.masterDataService.getMasterDataAddress(), this.masterDataService.getSignUp()]).subscribe(([res1, res2]) => {
      this.masterDataAddress = res1.data;
      this.masterDataAddressChildProvince = this.masterDataAddress[0].childs;
      this.signUpData = res2.data;
      this.dataBusinessTypes = this.signUpData.businessTypes.map((item) => {
          return this.mappingData(item);
        });
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
    //   }
    // });
    // this.createForm();
  }

  createForm(): void {
    this.userCreateForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      identityCard: ['', Validators.required],
      cellPhoneNumber: ['', Validators.required],
      images: [''],
      shortName: [''],
      taxCode: [''],
      representativeName: [''],
      fax: [''],
      website: [''],
      phoneNumber: [''],
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

  mappingData(item): object {
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
    this.imgeModel.splice(index, 1);
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

  changeProvince(event): void {
    this.userCreateForm.get('district').patchValue(null);
    this.userCreateForm.get('commune').patchValue(null);
    this.masterDataAddressChildWard = null;
    if (!event) {
      this.masterDataAddressChildDistrict = null;
      return;
    }
    this.masterDataAddressChildDistrict = this.masterDataService.getDistrict(
      event ? event.code : null,
      this.masterDataAddressChildProvince
    );
  }

  changeDistrict(event): void {
    this.userCreateForm.get('commune').patchValue(null);
    if (!event) {
      this.masterDataAddressChildWard = null;
      return;
    }
    this.masterDataAddressChildWard = this.masterDataService.getCommune(
      event ? event.code : null,
      this.masterDataAddressChildDistrict
    );
  }

  get address(): string {
    if (!this.userCreateForm) {
      return '';
    }
    const valueForm = this.userCreateForm.value;
    return this.addressData([
      valueForm.street,
      valueForm.village,
      valueForm.commune && valueForm.commune.name,
      valueForm.district && valueForm.district.name,
      valueForm.province && valueForm.province.name,
    ]);
  }

  addressData(data: any[]): string {
    let address = '';
    data.forEach(item => {
      address =
        address +
        (address !== '' ? (item ? ', ' + item : '') : item ? item : '');
    });
    return address;
  }

}
