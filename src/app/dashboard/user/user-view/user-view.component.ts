import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TypeForm } from 'src/app/shared/constant/type-form';
import { User } from 'src/app/shared/model/user.model';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  @ViewChild('form') form: UserFormComponent;
  @Input() type: string;
  @Input() fullname: string;
  user: User = new User();
  typeForm = TypeForm;
  nameTitle = 'Chỉnh sửa';
  changeTitle = 'Lưu';
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.type = this.typeForm.view;
  }

  onSubmit(): void {
    this.router.navigate(['/dashboard/user/edit']);
  }

}
