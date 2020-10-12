import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full',
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
