import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonTypes } from 'src/core/enums/buttonTypes';

import { PageControlTypeService } from 'src/core/services/page-control-type.service';
import { DocumentService } from 'src/core/services/document.service';
import { ControlPageService } from 'src/core/services/control-page.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html'
})
export class AddFileComponent {

  public form: FormGroup;
  public requestIsSending: boolean = false;
  public buttonTypes = ButtonTypes;

  public report_id: string | undefined;

  public pageControlTypes: any[] = [];

  public documentDetail: any;
  public requestIsSendingForDetail: boolean = true;

  public infoFile: any;

  get name() { return this.form.get('name'); }
  get page_control_type_id() { return this.form.get('page_control_type_id'); }
  get base64() { return this.form.get('base64'); }

  constructor(private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _pageControlTypeService: PageControlTypeService,
    private _documentService: DocumentService,
    private _controlPageService: ControlPageService,
    private route: ActivatedRoute,
    private router: Router) {

    this.form = this._fb.group({
      name: ['', Validators.required],
      page_control_type_id: ['', Validators.required],
      document_id: ['', Validators.required],
      base64: ['', Validators.required]
    })

    this._activatedRoute.params.subscribe(
      parameters => {
        this.report_id = parameters['report_id'];
      }
    );

    this._documentService.getById(this.report_id).subscribe(
      {
        next: (response) => {
          this.documentDetail = response;
          this.form.controls['document_id'].setValue(this.documentDetail.id);
        }
      }
    ).add(() => this.requestIsSendingForDetail = false);

    this._pageControlTypeService.getAll().subscribe(
      {
        next: (data: any) => {
          this.pageControlTypes = data;
        }
      }
    );
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.requestIsSending = true;
    this._controlPageService.create(this.form.value).subscribe(
      {
        next: (response) => {
          this.router.navigate(['../'], {relativeTo: this.route})
        }
      }
    ).add(() => this.requestIsSending = false);
  }

  async handleFileInput(target: any) {
    let file: File = target.files[0];

    if (file) {
      this.getBase64(file).then(async base64 => {
        let base64String = base64 as string;
        let matches = base64String.match('/\/Type[\s]*\/Page[^s]/g');

        this.infoFile = {          
          name: file.name,
          pageNumber:  matches ? matches.length : 0,
          size: file.size
        };
        
        this.form.controls['base64'].setValue(base64);

      });
    }
  }

  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  clearForm(){
    this.form.controls['name'].reset();
    this.form.controls['page_control_type_id'].reset();
    this.form.controls['base64'].reset();
    this.infoFile = {};
  }
}
