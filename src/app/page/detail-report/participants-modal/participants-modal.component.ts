import { Component, OnInit } from '@angular/core';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-participants-modal',
  templateUrl: './participants-modal.component.html'
})
export class ParticipantsModalComponent implements OnInit {

  public participanDetail: any;

  constructor(public options: ModalOptions, private modalRef: BsModalRef) { }

  ngOnInit(): void {
    console.log(this.options.initialState)
    this.participanDetail = this.options.initialState;
  }

  closeModal(){
    this.modalRef?.hide()
  }

}
