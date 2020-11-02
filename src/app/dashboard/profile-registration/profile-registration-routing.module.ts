import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileRegistrationFormComponent } from './profile-registration-form/profile-registration-form.component';
import { ProfileRegistrationComponent } from './profile-registration.component';

const routes: Routes = [{
  path: '',
  component: ProfileRegistrationComponent,
  children: [
    {
      path: '',
      redirectTo: 'profile-registration-form',
      pathMatch: 'full'
    },
    {
      path: 'profile-registration-form',
      component: ProfileRegistrationFormComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRegistrationRoutingModule { }
