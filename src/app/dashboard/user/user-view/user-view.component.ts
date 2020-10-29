import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TypeForm } from 'src/app/constant/type-form';
import { User } from 'src/app/model/user.model';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  @ViewChild('form') form: UserFormComponent;
  user: User = new User();
  @Input() type: string;
  typeForm = TypeForm;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.type = this.typeForm.view;
  }

  onSubmit(): void{
    this.router.navigate(['/dashboard/user/edit']);
  }

}
