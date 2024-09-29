import { Component, OnInit } from '@angular/core';
import { FamilyCommissaryService } from 'src/core/services/family-commissary.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-family-index',
  templateUrl: './family-index.component.html'
})
export class FamilyIndexComponent implements OnInit {

  public comissaryList: any[] = [];

  public requestIsSending: boolean = false;
  public dtOptions: DataTables.Settings = {};
  
  constructor(private _familyCommissaryService: FamilyCommissaryService, private _toastr: ToastrService) {
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

  deleteComissarie(id: string){
    console.log(id)
    swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: '¿Esta seguro de eliminiar esta comisaría?',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: `No, no estoy seguro`
    }).then((response: any) => {
      if(response.isConfirmed){
        this._familyCommissaryService.delete(id).subscribe(
          {
            next: (response: any) => {
              if(response.result){
                this.comissaryList = this.comissaryList.filter(x => x.id != id)
              }else{
                this._toastr.warning('No se ha podido eliminar la comisaría porque tiene usuarios asociados', 'Atención')
              }
            }
          }
        )
      }
    })
  }

}
