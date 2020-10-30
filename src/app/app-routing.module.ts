import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { CustomPreloadingStrategy } from './model/custom-preloading';
import { AuthGuardService } from './shared/service/auth-guard.service';

const routes: Routes = [
  // {
  //  path: 'employee',
  //  loadChildren: () => import('./employee/employee.module').then(mod => mod.EmployeeModule),
  //  canActivate: [AuthGuardService]
  // },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
    canActivate: [AuthGuardService],
    data: {preload: true}
   },
  {
    path: 'login',
    component: LoginFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule { }
