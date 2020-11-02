import { NgModule } from '@angular/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserViewComponent } from './user/user-view/user-view.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { DatePipe } from '@angular/common';
import { KzMaskDirective } from '../shared/directices/kz-mask.directive';
import { ProfileRegistrationComponent } from './profile-registration/profile-registration.component';
import { ProfileRegistrationFormComponent } from './profile-registration/profile-registration-form/profile-registration-form.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [UserViewComponent, UserEditComponent, UserComponent, UserFormComponent,
     KzMaskDirective, ProfileRegistrationComponent, ProfileRegistrationFormComponent],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzDatePickerModule,
    NzRadioModule,
    NzTableModule,
    NzModalModule
  ],
  exports: [KzMaskDirective],
  providers: [DatePipe]
})
export class DashboardModule { }
