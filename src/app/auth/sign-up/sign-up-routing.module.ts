import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpEnterpriseComponent } from './sign-up-enterprise/sign-up-enterprise.component';
import { SignUpHouseholdComponent } from './sign-up-household/sign-up-household.component';
import { SignUpComponent } from './sign-up.component';

const routes: Routes = [{
  path: '',
    component: SignUpComponent,
    children: [
      {
        path: 'sign-up-household',
        component: SignUpHouseholdComponent
      },
      {
        path: 'sign-up-enterprise',
        component: SignUpEnterpriseComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
