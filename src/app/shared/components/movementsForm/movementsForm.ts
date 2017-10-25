import { TemplateService } from './../../../core/api/templates.service';
import { Component, OnInit } from "@angular/core";
import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { UserLogin } from "./../../../core/api/user.service";
import { WSClient } from "./../../../core/api/client.service";
import { PubSubService } from "./../../ngx-pubsub/ngx-pubsub.service";
import {
  HEADER_EVENTS,
} from "./../../ngx-pubsub/pubsub-actions";
import { ToastrService } from "ngx-toastr";
import { URLSearchParams, RequestOptions } from "@angular/http";

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormState extends BSModalContext {}

@Component({
  selector: "movements-form",
  template: `
    <div class="container-fluid custom-modal-container">
    <div class="well text-center" *ngIf="formStructure == undefined">
    <h4><i class="fa fa-gear fa-spin"></i> Cargando Formulario..</h4>
    </div>
    <form *ngIf="formStructure" class="formly" role="form" novalidate [formGroup]="form" (ngSubmit)="saveForm(formData)">
      <div class="custom-modal-header">
        <h4 class="page-title">{{context.formType[1]}}</h4>
      </div>
      <div class="row">
        <div class="col-md-12">
          <formly-form [model]="formData" [fields]="fields" [form]="form" [options]="options">
          </formly-form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-right">
          <button type="submit" class="btn btn-warning btn-lg">Guardar</button>
          <a (click)="closeDialog()" class="btn btn-lg btn-default">Cancelar</a>
        </div>
      </div>
    </form>
  </div>
    `
})
export class MovementsForm implements ModalComponent<FormState> {
  context: any;
  formData = {};
  options = {
    formState: {
      readOnly: true
    }
  };

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: []
    }
  ];
  formStructure: any = undefined;
  constructor(
    public dialog: DialogRef<FormState>,
    public _user: UserLogin,
    public _ws: WSClient,
    public router: Router,
    public pubsub: PubSubService,
    public toastr: ToastrService,
    public Templates: TemplateService
  ) {
    this.context = this.dialog.context;
    dialog.setCloseGuard(this);
    console.log(this.context);
    this.getFormStructure(this.context.formType[0]);
    //this.formData.cliente_id = _user.getClient().cliente_id;
  }

  getFormStructure(id) {
    const params: URLSearchParams = new URLSearchParams();
    params.set("tipo", id);
    const requestOptions = new RequestOptions();
    requestOptions.params = params;
    this._ws.FormMovementFormat().get(requestOptions).subscribe(res => {
      this.formStructure = res.json();
      const firstObjName = Object.keys(this.formStructure)[0];
      this.formStructure.fields.map(field => {
        if (field.key == "@version") return false;
          let tpl = {}; 
          tpl = this.Templates.getTemplate(field);
          this.fields[0].fieldGroup.push(tpl);
      });
      console.log(Object.keys(this.formStructure)[0]);
      console.log("Form Structure", this.formStructure);
    });
  }


  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  saveForm() {
    let Move = this.formData;
    console.log("Save Move", Move);

    const params: URLSearchParams = new URLSearchParams();
    params.set("cliente_id", this._user.getUser().id);
    const requestOptions = new RequestOptions();
    requestOptions.params = params;

    this._ws
      .Operation()
      .post(JSON.stringify(Move))
      .subscribe(res => {
        this.closeDialog();
        this.pubsub.publish(HEADER_EVENTS.FILTERS);
        console.log(res);
        this.toastr.success("Se guardo un movimiento");
      });
    return false;
  }
}
