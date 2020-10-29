import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';
import { DashboardModule } from '../dashboard.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    DashboardModule
  ]
})
export class UserModule { }
