import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-In/sign-In.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [{
  path: '',
        component: AuthComponent,
        children: [
            { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
            { path: 'sign-in', component: SignInComponent },
            {
              path: 'sign-up',
              loadChildren: () => import('./sign-up/sign-up.module').then(mod => mod.SignUpModule)
            },
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
