import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DataTablesModule } from "angular-datatables";

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SeekProcessComponent } from './home/seek-process/seek-process.component';
import { SeekByUserComponent } from './home/seek-by-user/seek-by-user.component';
import { ProcessComponent } from './process/process.component'


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    SeekProcessComponent,
    SeekByUserComponent,
    ProcessComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class UserModule { }
