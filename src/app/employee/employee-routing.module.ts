import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { CreateComponent } from './form-employee/create/create.component';
import { EditComponent } from './form-employee/edit/edit.component';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { ViewComponent } from './form-employee/view/view.component';
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
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'view/:id',
        component: ViewComponent
      },
      {
        path: 'edit/:id',
        component: EditComponent
      }
    ]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
