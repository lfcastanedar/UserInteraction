import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  public sidebar: any[] = [];
  public requestIsSending: boolean = true;
  
  constructor(private _userService: UserService) {
    this._userService.getSidebar().subscribe({
      next: (data: any) =>{
        this.sidebar = data;
      }
    }).add(() => this.requestIsSending = false);
  }

  ngOnInit(): void {
  }

  openSubmenu(subitem: any){
    let index = this.sidebar.findIndex(x => x.id == subitem.id);
    let state = this.sidebar[index].active ?? false;

    this.sidebar[index].active = !state;
  }

}
