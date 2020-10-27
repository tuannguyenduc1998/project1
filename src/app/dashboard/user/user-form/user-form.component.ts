import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypeForm } from 'src/app/constant/type-form';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/shared/components/service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() model: User = new User();
  userForm: FormGroup;
  typeForm = TypeForm;
  @Input() type: string;
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      coCode: [this.model.coCode],
      fullName: [this.model.fullName],
      cellphoneNumber: [this.model.cellphoneNumber],
      identityCard: [this.model.identityCard],
      identityCardIssuedDate: [this.model.identityCardIssuedDate],
      village: [this.model.village],
      street: [this.model.street]
    });
  }

}
