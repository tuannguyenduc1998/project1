import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzModalService } from 'ng-zorro-antd/modal';
import { forkJoin } from 'rxjs';
import { ForestPilots, ProfileForest } from 'src/app/model/profile-forest.model';
import { UserLoginData } from 'src/app/model/user.model';
import { ModalPlotsComponent } from 'src/app/shared/components/modal-plots/modal-plots.component';
import { ForestProfileService } from 'src/app/shared/service/forest-profile.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-profile-registration-form',
  templateUrl: './profile-registration-form.component.html',
  styleUrls: ['./profile-registration-form.component.scss']
})
export class ProfileRegistrationFormComponent implements OnInit {

  profileForm: FormGroup;
  profileModel: ProfileForest = new ProfileForest();
  disabled = true;
  user: UserLoginData;
  dateNow = 1604308011;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
             private forestService: ForestProfileService, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.user = this.userService.LoginStatus;
    this.forestService.getForests().subscribe( (result) => {
      this.profileModel = result.data;
      // this.a = this.profileModel.forestPlots.filter( x => x.trees).reduce((accumulator, currentValue) => {
      //   return accumulator.concat(currentValue.trees);
      // }, []);
      // this.c = this.profileModel.forestPlots.filter( x => x.trees.forEach( y => y.area));
      this.createForm();
    });
  }

  createForm(): void {
    this.profileForm = this.formBuilder.group({
      profileCode: [this.profileModel.profileCode],
      profileDate: [this.dateNow * 1000],
      profileName: [this.profileModel.profileName],
      fullname: [this.user.fullName]
    });
  }

  showModal(): void {
    this.modalService.create({
      nzContent: ModalPlotsComponent,
      nzWidth: '70%',
    });
  }
}
