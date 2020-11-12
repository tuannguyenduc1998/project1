import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    component: DashboardComponent,
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
      },
      {
        path: 'profile-registration',
        loadChildren: () => import('./profile-registration/profile-registration.module').then(mod => mod.ProfileRegistrationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
