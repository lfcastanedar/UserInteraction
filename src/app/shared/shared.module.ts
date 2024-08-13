import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
import { LoadingComponent } from './loading/loading.component';
import { ButtonCardComponent } from './button-card/button-card.component';
import { HeaderSecondComponent } from './header-second/header-second.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoadingButtonComponent,
    LoadingComponent,
    ButtonCardComponent,
    HeaderSecondComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    LoadingButtonComponent,
    LoadingComponent,
    ButtonCardComponent,
    HeaderSecondComponent
  ]
})
export class SharedModule { }
