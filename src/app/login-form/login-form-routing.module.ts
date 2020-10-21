import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form.component';
import { FormLoginModule } from './login-form.module';
const routes: Routes = [
  {
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginFormRoutingModule { }
