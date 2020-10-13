import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { FormsModule } from '@angular/forms';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { CreateComponent } from './form-employee/create/create.component';
import { ViewComponent } from './form-employee/view/view.component';
import { EditComponent } from './form-employee/edit/edit.component';

@NgModule({
  declarations: [EmployeeComponent, FormEmployeeComponent, ListEmployeeComponent, CreateComponent, ViewComponent, EditComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
  ],
})
export class EmployeeModule { }
