import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

import { HealthPromotingEntityService } from 'src/core/services/health-promoting-entity.service';
import { DocumentTypeService } from 'src/core/services/document-type.service';
import { PersonTypeService } from 'src/core/services/person-type.service';
import { RelationshipTypeService } from 'src/core/services/relationship-type.service';
import { ComplaintParticipantService } from 'src/core/services/complaint-participant.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ButtonTypes } from 'src/core/enums/buttonTypes';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html'
})
export class AddUsersComponent {

  get formArray(): FormArray {
    return this.form.controls["people"] as FormArray;
  }

  @ViewChild('target') private myScrollContainer: ElementRef | undefined;

  public report_id: string | undefined;
  public buttonTypes = ButtonTypes;


  public form: FormGroup
  public listOfProcessTypes: any[] = [];
  public listOfEPS: any[] = [];
  public listOfPersonTypes: any[] = [];
  public listOfRelationshipses: any[] = [];
  public listOfDocumentTypes: any[] = [];


  constructor(
    private _fb: FormBuilder,
    private _healthPromotingEntityService: HealthPromotingEntityService,
    private _documentTypeService: DocumentTypeService,
    private _personTypeService: PersonTypeService,
    private _relationshipTypeService: RelationshipTypeService,
    private _complaintParticipantService: ComplaintParticipantService,
    private _activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.form = this._fb.group({
      people: this._fb.array([])
    });

    this._activatedRoute.params.subscribe(
      parameters => {
        this.report_id = parameters['report_id'];
      }
    );



    this._healthPromotingEntityService.getAll().subscribe(
      {
        next: (response) => {
          this.listOfEPS = response;
        }
      }
    )

    this._documentTypeService.getAll().subscribe(
      {
        next: (response) => {
          this.listOfDocumentTypes = response;
        }
      }
    )

    this._personTypeService.getAll().subscribe(
      {
        next: (response) => {
          this.listOfPersonTypes = response;
        }
      }
    )

    this._relationshipTypeService.getAll().subscribe(
      {
        next: (response) => {
          this.listOfRelationshipses = response;
        }
      }
    )

    this._complaintParticipantService.getById(this.report_id).subscribe(
      {
        next: (response: any[]) => {

          if (response.length > 0) {
            response.forEach((item, index) => {
              this.addUser(false);
              let form = this.formArray.at(index) as FormGroup;

              Object.keys(item).forEach(key => {
                const formControl = form.get(key);

                if (formControl) {
                  form.controls[key].setValue(item[key] ?? '');
                }
              });
            })
          }

        }
      }
    )

  }

  addUser(message: boolean = true) {
    this.formArray.push(this.createForm());
    if (message) {
      this.showMessage("Has agregado un nuevo formulario");
      this.scrollDown();
    }

  }

  createForm(): FormGroup {
    return this._fb.group({
      person_type_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      document_type_id: [''],
      dni: [''],
      age: [''],
      displaced: [false, Validators.required],
      neighborhood: ['', Validators.required],
      address: ['', Validators.required],
      telephone: [''],
      mobile: [''],
      email: [''],
      health_promoting_entity_id: [''],
      occupation: [''],
      id: [''],
      address_smart_contract: [this.report_id],
      state: [false],
      relationship_type_id: ['', Validators.required]
    })
  }

  deleteUser(index: number) {
    let form = this.formArray.at(index) as FormGroup;
    if (form.get('state')?.value == true) {
      return
    }

    if (form.get('id')?.value != '') {
      this._complaintParticipantService.delete(form.value.id).subscribe({
        next: (response) => {
          this.formArray.removeAt(index);
          this.showMessage("El sujeto procesal ha sido eliminado");
        }
      });
    } else {
      this.formArray.removeAt(index);
      this.showMessage("El sujeto procesal ha sido eliminado");
    }
  }

  clone(index: number) {
    let formValues = Object.assign(this.formArray.at(index).value);
    if (formValues['state'] == true) {
      return
    }

    formValues['id'] = '';

    let form = this.createForm();

    Object.keys(formValues).forEach(key => {
      form.controls[key].setValue(formValues[key])
    })


    this.formArray.push(form);
    this.showMessage("El sujeto procesal ha sido clonado")
    this.scrollDown();
  }

  submit(index: number) {
    let form = this.formArray.at(index) as FormGroup;

    form.markAllAsTouched();

    if (form.invalid || form.get('state')?.value == true) {
      return
    }

    form.get('state')?.setValue(true);


    if (form.get('id')?.value == '') {
      this._complaintParticipantService.create(form.value).subscribe(
        {
          next: (response) => {
            form.controls['id'].setValue(response.id);
            this.showMessage("El sujeto procesal ha sido guardado");
          }
        }
      ).add(() => form.get('state')?.setValue(false));
    } else {
      this._complaintParticipantService.edit(form.value, form.value.id).subscribe(
        {
          next: (response) => {
            form.controls['id'].setValue(response.id);
            this.showMessage("El sujeto procesal ha sido editado");
          }
        }
      ).add(() => form.get('state')?.setValue(false));
    }


  }

  showMessage(message: string) {
    this.toastr.info(message, 'Atención');
  }

  scrollDown() {
    (async () => {
      await this.delay(100);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' // si quieres un efecto de desplazamiento suave
      });
    })();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
