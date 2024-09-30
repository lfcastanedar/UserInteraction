import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserIndexComponent } from './users/user-index/user-index.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { FamilyIndexComponent } from './family/family-index/family-index.component';
import { FamilyFormComponent } from './family/family-form/family-form.component';
import { EtherIndexComponent } from './ether/ether-index/ether-index.component';

import { EnabledPipe } from 'src/core/pipes/enablePipe';


@NgModule({
  declarations: [
    DashboardComponent,
    UserIndexComponent,
    UserFormComponent,
    FamilyIndexComponent,
    FamilyFormComponent,
    EtherIndexComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    EnabledPipe
  ]
})
export class AdminModule { }
