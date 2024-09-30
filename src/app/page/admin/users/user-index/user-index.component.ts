import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/core/services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html'
})
export class UserIndexComponent implements OnInit {

  public requestIsSending: boolean = false;
  public userList: any[] = [];
  
  public dtOptions: DataTables.Settings = {};

  constructor(private _userService: UserService, private _toastr: ToastrService) { 
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

    this.getUsers();
  }

  ngOnInit(): void {
  }

  getUsers(){
    this.requestIsSending = false;
    this._userService.getAllUsers().subscribe(
      {
        next: (response) => {
          this.userList = response as any[];
        }
      }
    ).add(() => this.requestIsSending = true);
  }

  deleteUser(user: any){
    var status: boolean = !user.enabled
    swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: `¿Esta seguro de ${ status == true ? 'activar' : 'inactivar'} a ${user.first_name + " " + user.last_name }`,
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: `No, no estoy seguro`
    }).then((response: any) => {
      if(response.isConfirmed){
        this._userService.putEnableUser({user_id: user.id, enabled: status}).subscribe({
          next: (response) => {
            if (response.success) {
              this.getUsers();
              this._toastr.success(response.message, "Atención");
            }else{
              this._toastr.warning(response.message, "Atención");
            }            
          }
        })
      }
    })
  }

}
