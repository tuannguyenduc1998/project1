import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { EmployeeComponent } from './employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { ViewComponent } from './view/view.component';
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
