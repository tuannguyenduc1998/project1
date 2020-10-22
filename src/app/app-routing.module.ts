import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
   path: 'employee',
   loadChildren: () => import('./employee/employee.module').then(mod => mod.EmployeeModule),
   canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full'
  },
  {
    path: 'login-form',
    component: LoginFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
