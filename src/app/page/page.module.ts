import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PageComponent } from './page.component';
import { NgxEditorModule } from 'ngx-editor';

import { PageRoutingModule } from './page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './components/index/index.component';
import { InboxComponent } from './inbox/inbox.component';
import { DetailReportComponent } from './detail-report/detail-report.component';
import { AddFileComponent } from './add-file/add-file.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { FileModalComponent } from './detail-report/file-modal/file-modal.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { WorkflowhistoryModalComponent } from './detail-report/workflowhistory-modal/workflowhistory-modal.component';
import { ParticipantsModalComponent } from './detail-report/participants-modal/participants-modal.component';
import { SearchIndexComponent } from './search/search-index/search-index.component';
import { SearchDetailComponent } from './search/search-detail/search-detail.component';



@NgModule({
  declarations: [
    PageComponent,
    IndexComponent,
    InboxComponent,
    DetailReportComponent,
    AddFileComponent,
    WorkflowComponent,
    CreateReportComponent,
    FileModalComponent,
    AddUsersComponent,
    WorkflowhistoryModalComponent,
    ParticipantsModalComponent,
    SearchIndexComponent,
    SearchDetailComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BreadcrumbModule,
    NgxEditorModule
  ]
})
export class PageModule { }
