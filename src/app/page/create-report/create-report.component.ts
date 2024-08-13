import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonTypes } from 'src/core/enums/buttonTypes';
import { ActivatedRoute, Router } from "@angular/router";


import { ModulePageService } from 'src/core/services/module-page.service';
import { DocumentService } from 'src/core/services/document.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html'
})
export class CreateReportComponent {
  
  public form: FormGroup;
  public requestIsSending: boolean = false;
  public buttonTypes = ButtonTypes;

  get title() { return this.form.get('title'); }
  get model_page_id() { return this.form.get('model_page_id'); }

  public listOfModules: any[] = [];
  
  constructor(private _fb: FormBuilder, 
    private _modulePageService: ModulePageService,
    private _documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router){
    this.form = this._fb.group({
      title: ['', Validators.required],
      model_page_id: ['', Validators.required]
    });

    this._modulePageService.getAll().subscribe(
      {
        next: (response) => {
          this.listOfModules = response;
        }
      }
    )
  }


  submit(){
    this.form.markAllAsTouched();
    if(this.form.invalid || this.requestIsSending == true){
      return
    }

    this.requestIsSending = true;

    this._documentService.create(this.form.value).subscribe(
      {
        next: (response)=>{
          this.router.navigate(['bandeja_entrada', response.address], {relativeTo: this.route.parent})
          console.log(response)
        }
      }
    ).add(()=> {
      this.requestIsSending = false;
    });
  }
}
