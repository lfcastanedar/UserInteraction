import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from 'src/app/page/admin/dashboard/dashboard.component';

import { UserIndexComponent } from 'src/app/page/admin/users/user-index/user-index.component';
import { UserFormComponent } from 'src/app/page/admin/users/user-form/user-form.component';

import { FamilyIndexComponent } from 'src/app/page/admin/family/family-index/family-index.component';
import { FamilyFormComponent } from 'src/app/page/admin/family/family-form/family-form.component';

import { EtherIndexComponent } from 'src/app/page/admin/ether/ether-index/ether-index.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        data: { breadcrumb: 'Usuarios' },
        path: 'usuarios',
        children: [
          {
            path: '',
            component: UserIndexComponent
          },
          {
            data: { breadcrumb: 'Nuevo usuario' },
            path: 'nuevo_usuario',
            component: UserFormComponent
          },
          {
            data: { breadcrumb: 'Editar usuario' },
            path: 'editar_usuario/:user_id',
            component: UserFormComponent
          }
        ]
      },
      {
        data: { breadcrumb: 'Comisarias' },
        path: 'comisarias',
        children: [
          {
            path: '',
            component: FamilyIndexComponent
          },
          {
            data: { breadcrumb: 'Nueva comisaria' },
            path: 'nueva_comisaria',
            component: FamilyFormComponent
          },
          {
            data: { breadcrumb: 'Editar comisaria' },
            path: 'editar_comisaria/:family_id',
            component: FamilyFormComponent
          }
        ]
      },
      {
        data: { breadcrumb: 'Ether' },
        path: 'ether',
        children: [
          {
            path: '',
            component: EtherIndexComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
