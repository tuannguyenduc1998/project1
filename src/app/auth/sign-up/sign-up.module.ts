import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { AuthModule } from '../auth.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    AuthModule
  ]
})
export class SignUpModule { }
