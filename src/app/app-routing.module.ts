import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-form',
    pathMatch: 'full'
  },
  {
    path: 'login-form',
    component: LoginFormComponent
  },
  {
   path: 'employee',
   loadChildren: () => import('./employee/employee.module').then(mod => mod.EmployeeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
