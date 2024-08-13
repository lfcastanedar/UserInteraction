import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonTypes } from 'src/core/enums/buttonTypes';
import { StepService } from 'src/core/services/step.service';
import { ModulePageService } from 'src/core/services/module-page.service';
import { DocumentService } from 'src/core/services/document.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-index',
  templateUrl: './search-index.component.html'
})
export class SearchIndexComponent implements OnInit {

  public form: FormGroup;
  public requestIsSending: boolean = false;
  public buttonTypes = ButtonTypes;
  public dtOptions: DataTables.Settings = {};

  public stepList: any[] = [];
  public moduleList: any[] = [];
  public listOfDocuments: any[] = [];

  constructor(private _formBuilder: FormBuilder, private _stepService: StepService, private _modulePageService: ModulePageService,
    private _documentService: DocumentService, private toastr: ToastrService) {
    this.form = this._formBuilder.group({
      title: [''],
      address: [''],
      step_id: [''],
      model_page_id: [''],
      document_number: [''],
    })

    this._stepService.getAll().subscribe({
      next: (response) => { this.stepList = response; }
    });

    this._modulePageService.getAll().subscribe({
      next: (response) => { this.moduleList = response; }
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
        emptyTable: 'Sin resultados'
      },
    };
  }

  clearForm() {

  }

  submit() {
    let form = this.form.value;
    let isValid = false;
    Object.keys(form).forEach(key => {
      if(form[key].length !== 0){
        console.log(form[key])
        isValid = true;
      }
    })

    if(!isValid){
      this.toastr.info('Debes llenar por lo menos un campo', 'Atención');
      return;
    };

    if(this.requestIsSending){ return }
    this.listOfDocuments = [];
    this.requestIsSending = true;
    this._documentService.PostSearch(this.form.value).subscribe({
      next: (response)=> {this.listOfDocuments = response; }
    }).add(() => {this.requestIsSending = false;})
  }

}
