import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonTypes } from 'src/core/enums/buttonTypes';
import { DocumentTypeService } from 'src/core/services/document-type.service';
import { DocumentService } from 'src/core/services/document.service';

@Component({
  selector: 'app-seek-by-user',
  templateUrl: './seek-by-user.component.html'
})
export class SeekByUserComponent {
  public requestForProcessNumber: boolean = false;
  public buttonTypes = ButtonTypes;
  public showTable: boolean = false;

  public documentList: any[] = [];
  public listOfDocuments: any[] = [];
  public form: FormGroup;
  public dtOptions: DataTables.Settings = {};

  constructor(private _documentTypeService: DocumentTypeService, private _fb: FormBuilder, private _documentService: DocumentService){

    this.form = this._fb.group({
      fullname: ['', Validators.required],
    });
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
        emptyTable: 'Sin procesos'
      },
    };
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.requestForProcessNumber){return}   
    if(this.form.valid){
      this.requestForProcessNumber = true;
      this.showTable = false;
      this._documentService.PostSearchInWebByPerson(this.form.value).subscribe({
        next: value => {
          this.listOfDocuments = value;
          this.showTable = true;
        },
      }).add(() => { this.requestForProcessNumber = false  })
      

    }
  }

  clear(){
    this.form.reset();
  }
}
