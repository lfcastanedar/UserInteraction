import { Component } from '@angular/core';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ControlPageService } from 'src/core/services/control-page.service';
import { ButtonTypes } from 'src/core/enums/buttonTypes';

@Component({
  selector: 'app-file-modal',
  templateUrl: './file-modal.component.html'
})
export class FileModalComponent {

  public file: any;
  public buttonTypes = ButtonTypes;
  public requestIsSending: boolean = false;

  constructor(public options: ModalOptions, private modalRef: BsModalRef, private _controlPageService: ControlPageService){
    
  }

  ngOnInit(): void {
    this.file = this.options.initialState;
  }

  closeModal() {
    this.modalRef?.hide()
  }

  GetDocument(){
    if(this.requestIsSending) { return }

    var data = {
      id: this.file.id,
      documentNumber: this.file.documentNumber
    }

    this.requestIsSending = true;


    this._controlPageService.getDocument(data).subscribe(
      {
        next: (response) => {
          const source = `data:application/pdf;base64,${response.base64}`;
          const link = document.createElement("a");
          link.href = source;
          link.download = `${this.file.name}.pdf`
          link.click();
          console.log(response)
        }
      }
    ).add(() => { this.requestIsSending = false; console.log(this.requestIsSending) });
  }
}
