import { Component } from '@angular/core';
import { ButtonTypes } from 'src/core/enums/buttonTypes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DocumentService } from 'src/core/services/document.service';

@Component({
  selector: 'app-seek-process',
  templateUrl: './seek-process.component.html'
})
export class SeekProcessComponent {
  public requestForProcessNumber: boolean = false;
  public showTable: boolean = false;
  public buttonTypes = ButtonTypes;

  public form: FormGroup;
  public dtOptions: DataTables.Settings = {};
  public listOfDocuments: any[] = [];

  get typeField() { return this.form.get('type'); }
  get numberField() { return this.form.get('number'); }

  constructor(private _fb: FormBuilder, private _documentService: DocumentService){
    this.form = this._fb.group({
      type: ['process', Validators.required],
      number: ['', Validators.required],
    });

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

  ngOnInit(): void {

    
  }

  submit(){
    if(this.requestForProcessNumber){return}
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.requestForProcessNumber = true;
      this.showTable = false;
      this._documentService.PostSearchInWeb(this.form.value).subscribe({
        next: value => {
          this.listOfDocuments = value;
          this.showTable = true;
        },
      }).add(() => { this.requestForProcessNumber = false  })
    }
    
  }


  clearForm(){
    this.form.reset();
    this.form.controls['type'].setValue('process');
  }
}
