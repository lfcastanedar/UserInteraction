import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonTypes } from 'src/core/enums/buttonTypes';

import { UserService } from 'src/core/services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {

  public form: FormGroup;
  public requestIsSending: boolean = false;
  public buttonTypes = ButtonTypes;

  get current_password() { return this.form.get('current_password'); }
  get password() { return this.form.get('password'); }
  get password_confirmation() { return this.form.get('password_confirmation'); }
  
  constructor(private _fb: FormBuilder, private _userService: UserService) {
    this.form = this._fb.group({
      current_password: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submit(){
    if(this.form.invalid || this.requestIsSending == true){
      return
    }

    this.requestIsSending = true;

    this._userService.postUpdatePassword({ user: this.form.value}).subscribe(
      {
        next: () => { this.clearForm()}
      }
    ).add(()=> {
      this.requestIsSending = false;
    });
  }

  clearForm(){
    this.form.reset();
  }

}
