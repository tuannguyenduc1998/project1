import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypeForm } from 'src/app/constant/type-form';
import { MasterData, MasterDataChild } from 'src/app/model/masterData.model';
import { User } from 'src/app/model/user.model';
import { MasterdataService } from 'src/app/shared/service/masterdata.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() model: User = new User();
  userForm: FormGroup;
  userModel: User = new User();
  masterDataUserType: MasterData = new MasterData();
  masterDataChild: MasterDataChild[];
  typeForm = TypeForm;
  @Input() type: string;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private masterDataService: MasterdataService) { }

  ngOnInit(): void {
    this.userService.getUserItems()
      .subscribe( (users) => {
        this.userModel = users.data;
        console.log(this.userModel);
        if (this.userModel.userType === 'HouseHold'){
          this.masterDataService.getMasterData().subscribe( (masterData) => {
            this.masterDataUserType = masterData.data;
            this.masterDataChild = this.masterDataUserType.childs;
          });
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
      identityCardIssuedDate: [this.userModel.identityCardIssuedDate],
      village: [this.userModel.village],
      street: [this.userModel.street],
      district: [''],
      commune: [''],
      province: [''],
      forestOwnerType: [this.Child]
    });
  }

  get Child(){
    return this.masterDataChild.filter(x => x.displayText);
  }

}
