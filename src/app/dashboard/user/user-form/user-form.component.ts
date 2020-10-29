import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypeForm } from 'src/app/constant/type-form';
import { User } from 'src/app/model/user.model';
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
  typeForm = TypeForm;
  @Input() type: string;
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserItems()
      .subscribe( (users) => {
        this.userModel = users.data;
        console.log(this.userModel);
        this.createForm();
      });
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      code: [this.userModel.coCode],
      // fullName: [this.userModel.fullName],
      // cellphoneNumber: [this.userModel.cellphoneNumber],
      // identityCard: [this.userModel.identityCard],
      // identityCardIssuedDate: [this.userModel.identityCardIssuedDate],
      // village: [this.userModel.village],
      // street: [this.userModel.street]
    });
  }

}
