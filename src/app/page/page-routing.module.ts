import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageComponent } from './page.component'

import { InboxComponent } from './inbox/inbox.component';
import { DetailReportComponent } from './detail-report/detail-report.component';
import { AddFileComponent } from './add-file/add-file.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { SearchIndexComponent } from 'src/app/page/search/search-index/search-index.component';
import { SearchDetailComponent } from 'src/app/page/search/search-detail/search-detail.component';



const routes: Routes = [
  /*
  { 
    path: '', 
    redirectTo: 'bandeja_entrada'
  },
  */
  {
    path: '',
    component: PageComponent,
    data: { breadcrumb: { skip: true } },
    children: [
      {
        path: 'bandeja_entrada',
        children: [
          {
            path: '',
            component: InboxComponent,
            data: { breadcrumb: 'Bandeja de entrada' }
          },
          {
            path: ':report_id',
            data: { breadcrumb: 'Proceso' },
            children: [
              {
                path: '',
                component: DetailReportComponent,
              },
              {
                path: 'gestionar_flujo',
                component: WorkflowComponent,
                data: { breadcrumb: 'Gestionar flujo' }
              },
              {
                path: 'agregar_archivo',
                component: AddFileComponent,
                data: { breadcrumb: 'Agregar archivo' }
              },
              
              {
                path: 'agregar_usuarios',
                component: AddUsersComponent,
                data: { breadcrumb: 'Gestionar participantes' }
              }
            ]
          }
        ]
      },
      {
        path: 'registrar_denuncia',
        component: CreateReportComponent,
        data: { breadcrumb: 'Registrar proceso' }
      },
      {
        path: 'buscador_denuncias',
        children: [
          {
            path: '',
            component: SearchIndexComponent,
            data: { breadcrumb: 'Buscador de denuncias' }
          },
          {
            path: ':report_id',
            component: SearchDetailComponent,
            data: { breadcrumb: 'Prcoceso' }
          }
        ]
      },
      {
        
        data: { breadcrumb: { skip: true } },
        path: 'usuario',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      },
      {
        
        data: { breadcrumb: 'Panel de administración' },
        path: 'administracion',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
      }
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
