import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { AuthModule } from '../auth.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    AuthModule,
    SharedModule
  ]
})
export class SignUpModule { }
