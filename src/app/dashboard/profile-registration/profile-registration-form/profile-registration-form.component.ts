import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { forkJoin } from 'rxjs';
import { Status } from 'src/app/constant/status';
import { HarvestDeclare } from 'src/app/model/declare-harvests';
import { MasterData } from 'src/app/model/masterData.model';
import { ForestPilots, ProfileForest } from 'src/app/model/profile-forest.model';
import { UserLoginData } from 'src/app/model/user.model';
import { ModalPlotsComponent } from 'src/app/shared/components/modal-plots/modal-plots.component';
import { ForestProfileService } from 'src/app/shared/service/forest-profile.service';
import { UserService } from 'src/app/shared/service/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-profile-registration-form',
  templateUrl: './profile-registration-form.component.html',
  styleUrls: ['./profile-registration-form.component.scss'],
})
export class ProfileRegistrationFormComponent implements OnInit {
  harvestForm: FormGroup;
  @Input() harvestModel: HarvestDeclare = new HarvestDeclare();
  @Input() typeStatus: string;
  forestModel: ProfileForest = new ProfileForest();
  forestPilotsModel: ForestPilots = new ForestPilots();
  disabled = true;
  user: UserLoginData;
  setOfCheckedId = new Set<string>();
  forestPlotList: ForestPilots[];
  forestPlotLists: ForestPilots[];
  masterData: MasterData = new MasterData();
  province: string;
  today = new Date();
  isSubmit: boolean;
  status = Status;
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
    private modalService: NzModalService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.user = this.userService.LoginStatus;
    forkJoin([
      this.forestService.getHarvestMethod(),
    ]).subscribe((result) => {
      this.masterData = result[0].data;
      // this.forestPilotsModel.trees = this.forestModel.forestPlots.filter( x => x.trees).reduce((accumulator, currentValue) => {
      // return accumulator.concat(currentValue.trees);
      // }, []);
      // const items1 = this.harvestModel.items.filter( x => x.forestPlotTreeId);
      this.createForm();
      this.harvestForm.valueChanges.subscribe((_) => {
        if (this.isSubmit) {
          this.validateForm();
        }
      });
    });
  }

  validateForm(): boolean {
    this.invalidMessages = this.getInvalidMessages(
      this.harvestForm,
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
    this.harvestForm = this.formBuilder.group({
      profileCode:  [this.harvestModel.profileCode],
      profileDate: [this.harvestModel.status === this.status.sent ? this.harvestModel.profileDate : this.today, Validators.required],
      profileName: [this.harvestModel.profileName, Validators.required],
      fullname: [this.user.fullName],
      standingTreeTraditionId: [
        this.harvestModel.standingTreeTradition === null
          ? ''
          : this.harvestModel.standingTreeTradition.profileId,
      ],
      isCheckMe: ['me'],
      profileId: [
        this.harvestModel.forest === null
          ? this.harvestModel.standingTreeTradition.forestProfileId
          : this.harvestModel.forest.profileCode,
      ],
      fromDate: [this.harvestModel.fromDate * 1000, Validators.required],
      toDate: [this.harvestModel.toDate * 1000, Validators.required],
      harvestMethod: [this.harvestModel.harvestMethod.code],
      forestType: [this.harvestModel.forestType.code],
    });
  }

  showModal(): void {
    const modal = this.modalService.create({
      nzContent: ModalPlotsComponent,
      nzComponentParams: {
        usedId: this.setOfCheckedId,
      },
      nzWidth: '70%',
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

  goBack(): void {
    this.location.back();
  }

  disabledFromDate = (fromDate: Date): boolean => {
    if (!fromDate || !this.today) {
      return false;
    }
    return fromDate.getTime() <= this.today.getTime();
  }

  disabledToDate = (toDate: Date): boolean => {
    if (!toDate || !this.harvestForm.getRawValue().fromDate) {
      return false;
    }
    return (
      toDate.getTime() <= this.harvestForm.getRawValue().fromDate.getTime()
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
}
