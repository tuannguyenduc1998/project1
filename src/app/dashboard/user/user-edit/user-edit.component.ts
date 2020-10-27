import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TypeForm } from 'src/app/constant/type-form';
import { User } from 'src/app/model/user.model';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @ViewChild('form') form: UserFormComponent;
  user: User;
  @Input() type: string;
  typeForm = TypeForm;
  constructor() { }

  ngOnInit(): void {
  }

}
