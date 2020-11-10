import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { forkJoin } from 'rxjs';
import { MasterData } from 'src/app/model/masterData.model';
import {
  ForestCreate,
  ForestPilots,
  ProfileForest,
} from 'src/app/model/profile-forest.model';
import { UserLoginData } from 'src/app/model/user.model';
import { ModalPlotsComponent } from 'src/app/shared/components/modal-plots/modal-plots.component';
import { ForestProfileService } from 'src/app/shared/service/forest-profile.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-profile-registration-create',
  templateUrl: './profile-registration-create.component.html',
  styleUrls: ['./profile-registration-create.component.scss'],
})
export class ProfileRegistrationCreateComponent implements OnInit {
  profileForm: FormGroup;
  forestForm: FormGroup;
  @Input() profileModel: ProfileForest = new ProfileForest();
  disabled = true;
  user: UserLoginData;
  setOfCheckedId = new Set<string>();
  forestPlotList: ForestPilots[];
  forestPlotLists: ForestPilots[];
  province: string;
  forestCreate: ForestCreate = new ForestCreate();
  forestCreates: ForestCreate[];
  masterData: MasterData = new MasterData();
  today = new Date();
  isSubmit: boolean;
  invalidMessages: string[] = [];
  formErrors = {
    profileName: '',
    profileDate: '',
    fromDate: '',
    toDate: '',
  };
  validationMessages = {
    required: 'Trường này là bắt buộc nhập',
  };
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private forestService: ForestProfileService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.LoginStatus;
    forkJoin([
      this.forestService.getForests(),
      this.forestService.getHarvestMethod(),
    ]).subscribe((result) => {
      this.masterData = result[1].data;
      this.profileModel = result[0].data;
      this.createForm();

      this.profileForm.valueChanges.subscribe((_) => {
        if (this.isSubmit) {
          this.validateForm();
        }
      });
    });
    // this.a = this.profileModel.forestPlots.filter( x => x.trees).reduce((accumulator, currentValue) => {
    //   return accumulator.concat(currentValue.trees);
    // }, []);
    // this.c = this.profileModel.forestPlots.filter( x => x.trees.forEach( y => y.area));
  }

  validateForm(): boolean {
    this.invalidMessages = this.getInvalidMessages(
      this.profileForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  getInvalidMessages(form: FormGroup, formErrors: object): string[] {
    if (!form) {
      return;
    }
    const errorMessages = [];
    for (const field in formErrors) {
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
  createForm(): void {
    this.profileForm = this.formBuilder.group({
      profileCode: [this.profileModel.profileCode],
      profileDate: [this.today, Validators.required],
      profileName: [this.profileModel.profileName, Validators.required],
      fullname: [this.user.fullName],
      standingTreeTraditionId: [''],
      isCheckMe: ['me'],
      profileID: [''],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      harvestMethod: [''],
      forestType: [''],
    });
  }

  showModal(): void {
    const modal = this.modalService.create({
      nzContent: ModalPlotsComponent,
      nzComponentParams: {
        usedId: this.setOfCheckedId,
      },
      nzWidth: '70%'
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        [...result.list1].forEach((o) => {
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
    return fromDate.getTime() <= this.today.getTime();
  }

  disabledToDate = (toDate: Date): boolean => {
    if (!toDate || !this.profileForm.getRawValue().fromDate) {
      return false;
    }
    return (
      toDate.getTime() <= this.profileForm.getRawValue().fromDate.getTime()
    );
  }

  disabledProfileDate = (profileDate: Date): boolean => {
    if (!profileDate || !this.today) {
      return false;
    }
    return profileDate.getTime() >= this.today.getTime();
  }

  deleteItem(id: string): void {
    this.setOfCheckedId.delete(id);
  }

  onSave(): void {
    this.isSubmit = true;
    if (this.validateForm()) {
      this.forestCreate.forestId = this.profileModel.forestPlots[0].forestId;
      this.forestCreate.harvesterId = this.user.userId;
      this.forestCreate.profileDate =
        Date.parse(this.profileForm.value.profileDate) / 1000;
      this.forestCreate.standingTreeTraditionId =
        this.profileForm.value.standingTreeTraditionId === ''
          ? null
          : this.profileForm.value.standingTreeTraditionId;
      this.forestCreate.profileName = this.profileForm.value.profileName;
      this.forestCreate.profileCreatedUserId = this.user.userId;
      this.forestCreate.fromDate =
        Date.parse(this.profileForm.value.fromDate) / 1000;
      this.forestCreate.toDate =
        Date.parse(this.profileForm.value.toDate) / 1000;
      this.forestCreate.harvestMethod = this.masterData[0].childs.filter(
        (x) => x.code === this.profileForm.value.harvestMethod
      )[0];
      this.forestCreate.forestType = this.profileForm.value.forestType;
      // this.a = this.profileModel.forestPlots.filter( x => x.trees).reduce((accumulator, currentValue) => {
      //     return accumulator.concat(currentValue.trees);
      //   }, []);
      console.log(this.forestCreate);
      this.forestService
        .create(this.forestCreate)
        .subscribe((insertedEmployee) => {
          // this.forestCreates.push(insertedEmployee);
          console.log(insertedEmployee);
        });
    }
  }
}
