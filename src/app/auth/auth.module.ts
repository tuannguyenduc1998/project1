import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-In/sign-In.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpHouseholdComponent } from './sign-up/sign-up-household/sign-up-household.component';
import { SignUpEnterpriseComponent } from './sign-up/sign-up-enterprise/sign-up-enterprise.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [SignUpComponent , SignInComponent, SignUpHouseholdComponent, SignUpEnterpriseComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NzInputModule,
    NzCheckboxModule
  ]
})
export class AuthModule { }
