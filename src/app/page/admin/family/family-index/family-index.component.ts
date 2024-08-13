import { Component, OnInit } from '@angular/core';
import { FamilyCommissaryService } from 'src/core/services/family-commissary.service';

@Component({
  selector: 'app-family-index',
  templateUrl: './family-index.component.html'
})
export class FamilyIndexComponent implements OnInit {

  public comissaryList: any[] = [];

  public requestIsSending: boolean = false;
  public dtOptions: DataTables.Settings = {};
  
  constructor(private _familyCommissaryService: FamilyCommissaryService) {
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
        }
      },
    };
    
    this._familyCommissaryService.getAll().subscribe(
      {
        next: (response: any) => {
          this.comissaryList = response;
        }
      }
    ).add(() => this.requestIsSending = true);
  }

  ngOnInit(): void {
  }

}
