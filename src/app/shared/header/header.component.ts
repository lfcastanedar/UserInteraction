import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from 'src/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public profile: any;
  
  constructor(private _userService: UserService, private _router: Router) {
    this.loadProfile();
  }

  ngOnInit(): void {
  }

  userDropdown() {
    const elements = document.getElementsByClassName('userDropdown');
    
    Array.from(elements).forEach(item =>{
      if(item.classList.contains('show')){
        item.classList.remove('show');
      }else{
        item.classList.add('show');
      }     
    });
  }

  loadProfile(){
    this.profile = this._userService.getProfileNavbar();
  }

  logOut(){
    localStorage.removeItem('_user');
    this._router.navigateByUrl('');
  }

}
