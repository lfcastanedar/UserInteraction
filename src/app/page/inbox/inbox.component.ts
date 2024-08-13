import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/core/services/document.service';
import { ButtonTypes } from 'src/core/enums/buttonTypes';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html'
})
export class InboxComponent implements OnInit {

  public requestIsSending: boolean = false;
  public buttonTypes = ButtonTypes;
  
  public listOfDocuments: any[] | undefined;

  constructor(private _documentService: DocumentService) {
    this._documentService.getAll().subscribe(
      {
        next: (response)=>{
          this.listOfDocuments = response;

        }
      }
    ).add(()=> {
      this.requestIsSending = true;
    });
  }

  public dtOptions: DataTables.Settings = {};

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
        emptyTable: 'Sin procesos'
      },

    };


  }

}
