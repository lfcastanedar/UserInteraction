import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PasswordComponent }  from './password/password.component'

const routes: Routes = [
  {
    data: { breadcrumb: 'Cambiar contraseña' },
    path: 'cambiar_contrasena',
    component: PasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
