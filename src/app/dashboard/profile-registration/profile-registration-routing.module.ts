import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileRegistrationFormComponent } from './profile-registration-form/profile-registration-form.component';
import { ProfileRegistrationListComponent } from './profile-registration-list/profile-registration-list.component';
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
    },
    {
      path: 'profile-registration-list',
      component: ProfileRegistrationListComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRegistrationRoutingModule { }
