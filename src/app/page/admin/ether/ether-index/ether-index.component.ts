import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/core/services/user.service';

@Component({
  selector: 'app-ether-index',
  templateUrl: './ether-index.component.html'
})
export class EtherIndexComponent implements OnInit {

  public requestIsSending: boolean = true;
  public dtOptions: DataTables.Settings = {};
  public etherAccount: any = {};

  constructor(private _userService: UserService) { 
    this._userService.getEtherAccount().subscribe({
      next: (response) => { this.etherAccount = response }
    })
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
        emptyTable: 'Sin Transacciones'
      },

    };
  }

}
