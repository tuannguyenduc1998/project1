import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileRegistrationCreateComponent } from './profile-registration-create/profile-registration-create.component';
import { ProfileRegistrationEditComponent } from './profile-registration-edit/profile-registration-edit.component';
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
      path: 'profile-registration-create',
      component: ProfileRegistrationCreateComponent
    },
    {
      path: 'profile-registration-list',
      component: ProfileRegistrationListComponent
    },
    {
      path: 'profile-registration-edit/:id',
      component: ProfileRegistrationEditComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRegistrationRoutingModule { }
