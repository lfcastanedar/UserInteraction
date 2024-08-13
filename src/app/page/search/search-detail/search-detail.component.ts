import { Component, OnInit } from '@angular/core';

import { DocumentService } from 'src/core/services/document.service';
import { WorkflowService } from 'src/core/services/workflow.service';
import { ControlPageService } from 'src/core/services/control-page.service';
import { ComplaintParticipantService } from 'src/core/services/complaint-participant.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

import { DetailTabs } from 'src/core/enums/detailTabs';
import { ButtonTypes } from 'src/core/enums/buttonTypes';
import { FileModalComponent } from '../../detail-report/file-modal/file-modal.component';
import { WorkflowhistoryModalComponent } from '../../detail-report/workflowhistory-modal/workflowhistory-modal.component';
import { ParticipantsModalComponent } from '../../detail-report/participants-modal/participants-modal.component';


@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html'
})
export class SearchDetailComponent implements OnInit {

  public report_id: string | undefined;
  public dtOptions: DataTables.Settings = {};
  public dtWFOptions: DataTables.Settings = {};
  public dtCPOptions: DataTables.Settings = {};

  public buttonTypes = ButtonTypes;
  public detailTabs = DetailTabs;
  public tabSelected: DetailTabs;

  public documentDetail: any;
  public requestIsSendingForDetail: boolean = true;

  public listOfPageControls: any[] = [];
  public requestIsSendingForPageControl: boolean = true;

  public listOfWorkFlowHistories: any[] = [];
  public requestIsSendingForWorkFlowHistories: boolean = true;

  public listOfComplaintParticipants: any[] = [];
  public requestIsSendingForComplaintParticipants: boolean = true;

  public requestIsSendingForDowloadFolder: boolean = false;

  bsModalRef?: BsModalRef;

  constructor(private _activatedRoute: ActivatedRoute,
    private _documentService: DocumentService,
    private _workflowService: WorkflowService,
    private _controlPageService: ControlPageService,
    private modalService: BsModalService,
    private _complaintParticipantService: ComplaintParticipantService) {

    this.tabSelected = this.detailTabs.people;

    this._activatedRoute.params.subscribe(
      parameters => {
        this.report_id = parameters['report_id'];
      }
    );

    this._documentService.getById(this.report_id).subscribe({
      next: (response) => { this.documentDetail = response; }
    }).add(() => this.requestIsSendingForDetail = false);

    this._complaintParticipantService.getById(this.report_id).subscribe({
      next: (response) => { this.listOfComplaintParticipants = response; }
    }).add(() => this.requestIsSendingForComplaintParticipants = false);

    this._controlPageService.getPageControls(this.report_id).subscribe({
      next: (response) => { this.listOfPageControls = response; }
    }).add(() => this.requestIsSendingForPageControl = false);

    this._workflowService.getWorkFlowHistories(this.report_id).subscribe({
      next: (response: any) => { this.listOfWorkFlowHistories = response; }
    }).add(() => this.requestIsSendingForWorkFlowHistories = false);
  }

  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      language: {
        lengthMenu: "Mostrar _MENU_ filas por página",
        info: "Mostrando _PAGE_ de _PAGES_",
        paginate: {
          first: "Primero",
          last: "Último",
          previous: "Anterior",
          next: "Siguiente"
        },
        emptyTable: 'Sin registros'
      }
    };

    this.dtWFOptions = {
      searching: false,
      language: {
        lengthMenu: "Mostrar _MENU_ filas por página",
        info: "Mostrando _PAGE_ de _PAGES_",
        paginate: {
          first: "Primero",
          last: "Último",
          previous: "Anterior",
          next: "Siguiente"
        },
        emptyTable: 'Sin registros'
      },
      order: [[3, 'asc']]

    };

    this.dtCPOptions = {
      searching: false,
      language: {
        lengthMenu: "Mostrar _MENU_ filas por página",
        info: "Mostrando _PAGE_ de _PAGES_",
        paginate: {
          first: "Primero",
          last: "Último",
          previous: "Anterior",
          next: "Siguiente"
        },
        emptyTable: 'Sin registros'
      },
      order: [[1, 'asc']]

    };
  }

  openFileModal(item: any) {
   item['documentNumber'] = this.documentDetail.document_number;
    const initialState: ModalOptions = {
      initialState: item,
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(FileModalComponent, initialState);
  }

  GetDocument(item: any) {
    var data = {
      id: item.id,
      documentNumber: this.documentDetail.document_number
    }

    console.log(data)

    this._controlPageService.getDocument(data).subscribe(
      {
        next: (response) => {
          const source = `data:application/pdf;base64,${response.base64}`;
          const link = document.createElement("a");
          link.href = source;
          link.download = `${item.name}.pdf`
          link.click();
          console.log(response)
        }
      }
    ).add(() => false);;
  }

  getDocumentFolder() {

    if (this.requestIsSendingForDowloadFolder == true) {

    }

    this.requestIsSendingForDowloadFolder = true;

    var obj = {
      documentNumber: this.documentDetail.document_number.split('/')[0],
      title: this.documentDetail.title,
      address: this.documentDetail.address
    }

    this._controlPageService.getDocumentFolder(obj).subscribe(
      {
        next: (response) => {
          const source = `data:application/pdf;base64,${response.base64}`;
          const link = document.createElement("a");
          link.href = source;
          link.download = `${this.documentDetail.document_number}.pdf`
          link.click();
        }
      }
    ).add(() => this.requestIsSendingForDowloadFolder = false)
  }

  openWorkFlowHistoryModal(item: any) {
    const initialState: ModalOptions = {
      initialState: item,
      class: 'modal-xl'
    };
    this.bsModalRef = this.modalService.show(WorkflowhistoryModalComponent, initialState);
  }

  openParticipantDetail(item: any) {
    const initialState: ModalOptions = {
      initialState: item,
      class: 'modal-xl'
    };
    this.bsModalRef = this.modalService.show(ParticipantsModalComponent, initialState); 
  }

  changeTab(tabSelected: DetailTabs) {
    this.tabSelected = tabSelected;
  }

}
