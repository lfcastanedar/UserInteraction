import { Component, OnInit } from '@angular/core';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-workflowhistory-modal',
  templateUrl: './workflowhistory-modal.component.html'
})
export class WorkflowhistoryModalComponent implements OnInit {

  public workflowHistory: any;
  public sanitizer: DomSanitizer;

  constructor(public options: ModalOptions, private modalRef: BsModalRef, private _sanitizer:DomSanitizer) {
    this.sanitizer = _sanitizer
  }

  ngOnInit(): void {
    console.log(this.options.initialState)
    this.workflowHistory = this.options.initialState;
  }

  closeModal(){
    this.modalRef?.hide()
  }

}
