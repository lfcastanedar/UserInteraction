import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ButtonTypes } from 'src/core/enums/buttonTypes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  get emailField() { return this.form.get('email'); }
  get passwordField() { return this.form.get('password'); }
  
  
  public requestIsSending: boolean = false;
  public buttonTypes = ButtonTypes;

  public form: FormGroup;


  constructor(private _fb: FormBuilder, private _userService: UserService, private _router: Router) {
    this.form = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('_user')){
      let user = JSON.parse(localStorage.getItem('_user')!)
      console.log(user.url_redirect)
      this._router.navigateByUrl(user.url_redirect);
    }
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.invalid || this.requestIsSending){
      return;
    }
      
    
    this.requestIsSending = true
    this._userService.login(this.form.value).subscribe({
      next: (data: any) =>{
        this.form.reset();
        localStorage.setItem('_user', JSON.stringify(data));
        this._router.navigateByUrl(data.url_redirect);
      },
      error: (data: any) => {

      }
    }).add(()=> this.requestIsSending = false)
  }



}
