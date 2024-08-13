import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

import { ButtonTypes } from 'src/core/enums/buttonTypes';

import { FamilyCommissaryService } from 'src/core/services/family-commissary.service';

@Component({
  selector: 'app-family-form',
  templateUrl: './family-form.component.html'
})
export class FamilyFormComponent implements OnInit {

  get name() { return this.form.get('name'); }
  
  public form: FormGroup;
  public buttonTypes = ButtonTypes;
  public requestIsSending: boolean = false;

  public family_id: string | undefined;

  constructor(private _fb:FormBuilder, private route: ActivatedRoute,
    private router: Router, private _activatedRoute: ActivatedRoute, private _familyCommissaryService: FamilyCommissaryService) { 
    this.form = this._fb.group({
      name: ['', Validators.required]
    });

    this._activatedRoute.params.subscribe(
      parameters => {
        this.family_id = parameters['family_id'];

        if(this.family_id){
          this._familyCommissaryService.getById(this.family_id).subscribe(
            {
              next: (response: any) => {
                this.form.controls['name'].setValue(response.name)
              }
            }
          )
        }
      }
    );
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

    if(this.family_id){
      this._familyCommissaryService.edit(this.form.value, this.family_id).subscribe(
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
      this._familyCommissaryService.create(this.form.value).subscribe(
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
