import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { FamilyCommissaryService } from 'src/core/services/family-commissary.service';

import { UserService } from 'src/core/services/user.service';

import { ButtonTypes } from 'src/core/enums/buttonTypes';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  get first_name() { return this.form.get('current_password'); }
  get last_name() { return this.form.get('last_name'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get role_id() { return this.form.get('role_id'); }
  get family_commissary_id() { return this.form.get('family_commissary_id'); }
  
  public form: FormGroup;
  public buttonTypes = ButtonTypes;
  public requestIsSending: boolean = false;
  public roleList: any[] = [];
  public user_id: string | undefined;
  public commisarryList: any[] = [];
  
  constructor(private _fb: FormBuilder, private _userService: UserService, private route: ActivatedRoute,
    private router: Router, private _activatedRoute: ActivatedRoute, private _familyCommissaryService: FamilyCommissaryService) {
    this.form = this._fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      role_id: ['', Validators.required],
      family_commissary_id: ['', Validators.required]

    });

    this._familyCommissaryService.getAll().subscribe(
      {
        next: (response: any) => {
          this.commisarryList = response;
        }
      }
    )

    this._activatedRoute.params.subscribe(
      parameters => {
        this.user_id = parameters['user_id'];

        if(this.user_id){
          this._userService.getProfile(this.user_id).subscribe(
            {
              next: (response: any) => {
                
                Object.keys(response).forEach(key => {
                  const formControl = this.form.get(key);
            
                  if (formControl) {
                    this.form.controls[key].setValue(response[key] ?? '');
                  }
                });
              }
            }
          );
          console.log('entra')
        }else{
          this.form.addControl('password', new FormControl('', Validators.required))
        }
      }
    );

    this._userService.getUserRoles().subscribe(
      {
        next: (response: any) => {
          this.roleList = response;
        }
      }
    )
  }

  ngOnInit(): void {
  }

  clearForm(){
    this.form.reset();
  }

  submit(){
    if(this.form.invalid || this.requestIsSending == true){
      return
    }

    this.requestIsSending = true;

    if(this.user_id){
      this._userService.putEditProfile(this.user_id,this.form.value).subscribe(
        {
          next: (response)=>{
            this.router.navigate(['../../'], { relativeTo: this.route })
            console.log(response)
          }
        }
      ).add(()=> {
        this.requestIsSending = false;
      });
    }else{
      this._userService.register(this.form.value).subscribe(
        {
          next: (response)=>{
            this.router.navigate(['../'], { relativeTo: this.route })
            console.log(response)
          }
        }
      ).add(()=> {
        this.requestIsSending = false;
      });
    }

    
  }

}
