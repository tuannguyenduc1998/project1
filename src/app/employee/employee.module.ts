import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmployeeComponent, FormEmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule
  ],
})
export class EmployeeModule { }
