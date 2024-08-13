import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControlPageService } from 'src/core/services/control-page.service';
import { DocumentService } from 'src/core/services/document.service';
import { UserService } from 'src/core/services/user.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html'
})
export class ProcessComponent {
  public requestIsSendingForDetail: boolean = true;
  public requestIsSendingForPageControl: boolean = true;
  public documentDetail: any;
  public address: string | undefined;
  public dtOptions: DataTables.Settings = {};
  public listOfPageControls: any[] = [];
  public etherAccount: any = {};

  constructor(private _documentService: DocumentService, private _activatedRoute: ActivatedRoute,
    private _controlPageService: ControlPageService, private _userService: UserService){
    this._activatedRoute.params.subscribe(
      parameters => {
        this.address = parameters['address'];
      }
    );

    this._userService.getAccount().subscribe({
      next: (response) => { this.etherAccount = response }
    })

    this._documentService.GetDetailByAddress(this.address).subscribe(
      {
        next: (response) => {
          this.documentDetail = response;
        }
      }
    ).add(() => this.requestIsSendingForDetail = false);

    this._controlPageService.getPageControls(this.address).subscribe(
      {
        next: (response) => {
          this.listOfPageControls = response;
        }
      }
    ).add(() => this.requestIsSendingForPageControl = false);

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
        emptyTable: 'Sin registros'
      },
      order: [[1, 'asc']]

    };

  }
}
