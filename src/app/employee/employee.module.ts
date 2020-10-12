import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { FormsModule } from '@angular/forms';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [EmployeeComponent, FormEmployeeComponent, ListEmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
  ],
})
export class EmployeeModule { }
