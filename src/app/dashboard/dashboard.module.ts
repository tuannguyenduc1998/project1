import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserViewComponent } from './user/user-view/user-view.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user-form/user-form.component';


@NgModule({
  declarations: [UserViewComponent, UserEditComponent, UserComponent, UserFormComponent],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class DashboardModule { }
