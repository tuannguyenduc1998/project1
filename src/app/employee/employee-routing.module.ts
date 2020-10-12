import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      {
        path: '',
        redirectTo: 'listemployee',
        pathMatch: 'full'
      },
      {
        path: 'listemployee',
        component: ListEmployeeComponent
      },
      {
        path: 'formemployee',
        component: FormEmployeeComponent
      },
    ]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
