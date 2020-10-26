import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuardService } from './service/auth-guard.service';
import { SharedComponent } from './shared/shared.component';

const routes: Routes = [
  {
   path: 'employee',
   loadChildren: () => import('./employee/employee.module').then(mod => mod.EmployeeModule),
   canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'header',
    pathMatch: 'full'
  },
  {
    path: 'header',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
