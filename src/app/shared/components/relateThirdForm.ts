import { SelectItem } from 'ng2-select';
import { FormState } from './../../routes/settings/settings-global-form/settings-global-form.component';
import { Component, OnInit } from "@angular/core";
import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { DatePipe } from '@angular/common';

import { UserLogin } from "./../../core/api/user.service";
import { WSClient } from "./../../core/api/client.service";
import { PubSubService } from "./../ngx-pubsub/ngx-pubsub.service";
import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "./../ngx-pubsub/pubsub-actions";
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


@Component({
  selector: "relate-third-form",
  template: `	
  <div class="container-fluid custom-modal-container">

    <form class="formly" name="form" role="form" novalidate [formGroup]="form" (ngSubmit)="saveForm()">
    <div class="custom-modal-header">
    <h4 class="page-title"><i class="fa fa-users" aria-hidden="true"></i> Relacionar Tercero</h4>
  </div>

  <div class="row">
  <div class="col-md-12">
  <div class="well well-sm">
    Si no encuentra el tercero puede crearlo aquí <br/>
    <a class="btn btn-warning" (click)="newThird()"><i class="fa fa-plus"></i> Nuevo Tercero</a>
    
  </div>
  </div>
  </div>

    <div class="row">
      <div class="col-md-12">
        <formly-form [model]="formData" [fields]="fields" [form]="form" [options]="options">
        </formly-form>
      </div>
      
    </div>

    <div class="row">
    <div class="col-md-12">
    <button type="submit" class="btn btn-lg btn-warning">Relacionar</button>
    <a class="btn btn-lg btn-default" (click)="closeDialog()">Cancelar</a>
    </div>
    </div>

    </form>	
    </div>	
    `,
    providers: [DatePipe]
})
export class RelateThirdFormComponent implements ModalComponent<FormState> {
  context: any = {
    columns: [],
    selected: [],
  };
  formData: any = {
  };

  options = {
    formState: {
      readOnly: true
    }
  };

  idx = {
    id:0,
  }

  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: [
        {
          key: "nombre_tercero",
          type: "tercero-select",
          templateOptions: {
            type: "text",
            label: "Nombre",
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          key: "selected_tercero",
          type: "tipos-terceros-select",
          templateOptions: {
            label: "Selecionar Tipo de Tercero",
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
      ]
    }
  ];
  constructor(
    public dialog: DialogRef<FormState>,
    public _user: UserLogin,
    public _ws: WSClient,
    public router: Router,
    public pubsub: PubSubService,
    public toastr: ToastrService,
  ) {
    this.context = dialog.context;
    console.log(this.context);
    this.idx.id = this.context.columns.indexOf('id')
    dialog.setCloseGuard(this);
  }

  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  newThird(){
    this.pubsub.publish('NEW_THIRD');
  }

  saveForm() {
    console.log("Form Data",this.formData);
    const selectedTercero = this.formData.selected_tercero[0].id;
    const { nombre } = this.formData; 
    const newThird = {
       movimiento_id: this.context.selected[0][this.idx.id],
       nombre_tercero: this.formData.nombre_tercero[0].text,
       cve_contable_quo: selectedTercero.cve_contable_quo,
       descripcion: selectedTercero.description
    }
    console.log("New Form", newThird);
    this._ws.Tercero().post(newThird).subscribe((res)=>{
      this.toastr.success('Tercero guardado con exíto!');
      this.closeDialog();
      this.pubsub.publish(RECIEVED_EVENTS.RELOAD);
    })

    return false;
  }

}

