import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonTypes } from 'src/core/enums/buttonTypes';
import { DocumentService } from 'src/core/services/document.service';
import { WorkflowService } from 'src/core/services/workflow.service';
import { UserService } from 'src/core/services/user.service';
import swal from 'sweetalert2';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html'
})
export class WorkflowComponent {

  get step_id() { return this.form.get('step_id'); }
  get role_id() { return this.form.get('role_id'); }
  get user_id() { return this.form.get('user_id'); }

  public documentDetail: any;
  public requestIsSendingForDetail: boolean = true;

  public listOfSteps: any[] = [];
  public listOfUsersByRole: any[] = [];
  public listOfUsers: any[] = [];

  public roleSelected: string = '';
  public commisinarySelected: string = '';

  public report_id: string | undefined;

  public form: FormGroup;
  public requestIsSending: boolean = false;
  public buttonTypes = ButtonTypes;

  public editor: Editor;
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _documentService: DocumentService,
    private _workflowService: WorkflowService,
    private _userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editor = new Editor();
    this._activatedRoute.params.subscribe(
      parameters => {
        this.report_id = parameters['report_id'];
      }
    );

    this._documentService.getById(this.report_id).subscribe(
      {
        next: (response) => {
          this.documentDetail = response;
          console.log(response)
        }
      }
    ).add(() => this.requestIsSendingForDetail = false);

    this._workflowService.getStepsByAddress(this.report_id).subscribe(
      {
        next: (response) => {
          this.listOfSteps = response;
        }
      }
    );

    this._userService.getUsersGroupByRoles().subscribe(
      {
        next: (response: any) => {
          this.listOfUsersByRole = response;
        }
      }
    );

    this.form = this._fb.group({
      step_id: ['', Validators.required],
      role_id: ['', Validators.required],
      user_id: ['', Validators.required],
      comment: ['']
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  selectRole(role: any) {
    this.listOfUsers = this.listOfUsersByRole.find((x: any) => x.id == role.value)?.users ?? [];
    this.form.controls['user_id'].setValue('');
  }

  submit() {
    this.form.markAllAsTouched();

    console.log(this.form.value)

    if (this.form.invalid || this.requestIsSending == true) {
      return
    }

    let finished = this.listOfSteps.find(x => x.id == this.form.value.step_id)

    if (finished.code == 'finished') {
      swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: '¿Esta seguro con finalizar el proceso?',
        showCancelButton: true,
        confirmButtonText: 'Si estoy seguro',
        cancelButtonText: `No estoy seguro`
      }).then((result: any) => {
        if(result.isConfirmed){
          this.requestIsSending = true;
          this.sendRequest();
        }
      })
    } else {
      this.requestIsSending = true;
      this.sendRequest();
    }
  }

  onChangeStep(item: any) {
    let step = this.listOfSteps.find(x => x.id == item.value);
    this.roleSelected = '';
    if (item.value != '' && step != null && (step.code == 'review')) {
      let role = this.listOfUsersByRole.find(x => x.code == 'commissioner') ?? {};
      this.roleSelected = role.code;
      this.form.controls['role_id'].setValue(role.id);
      this.listOfUsers = role.users;
      if (role.users.length == 1) {
        this.commisinarySelected = `${role.users[0].first_name} ${role.users[0].last_name}`;
        console.log(role.users[0].id)
        this.form.controls['user_id'].setValue(role.users[0].id);
      }
    }
  }

  sendRequest() {
    let value = this.form.value;
    delete value.role_id;

    this._documentService.edit(value, this.report_id!).subscribe(
      {
        next: (response) => {
          this.router.navigate(['../../bandeja_entrada'], { relativeTo: this.route.parent })
          console.log(response)
        }
      }
    ).add(() => this.requestIsSending = false);
  }

  clearForm() {
    this.form.controls['step_id'].setValue('');
    this.form.controls['role_id'].setValue('');
    this.form.controls['user_id'].setValue('');
  }
}
