import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/core/services/user.service'

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html'
})
export class UserIndexComponent implements OnInit {

  public requestIsSending: boolean = false;
  public userList: any[] = [];
  
  public dtOptions: DataTables.Settings = {};

  constructor(private _userService: UserService) { 
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

    this._userService.getAllUsers().subscribe(
      {
        next: (response) => {
          this.userList = response as any[];
        }
      }
    ).add(() => this.requestIsSending = true);
  }

  ngOnInit(): void {
  }

}
