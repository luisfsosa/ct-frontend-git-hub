import {
  FormGroup,
  Validators,
} from "@angular/forms";
import { Component } from "@angular/core";
import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { Router } from "@angular/router";
import { WSClient } from "../../../core/api/client.service";
import { UserLogin } from '../../../core/api/user.service';
import { PubSubService } from "../../../shared/ngx-pubsub/ngx-pubsub.service";
import { ToastrService } from "ngx-toastr";
import { FormlyFieldConfig } from '@ngx-formly/core';

import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "../../../shared/ngx-pubsub/pubsub-actions";


export class FormState extends BSModalContext {
  constructor(public edit: string) {
    super();
  }
}

@Component({
  selector: "app-third-party-form",
  templateUrl: "./third-party-form.component.html",
  styleUrls: ["./third-party-form.component.scss"]
})
export class ThirdPartyFormComponent implements ModalComponent<FormState> {
  context: FormState;
  formData = {
    nombre: "",
    comentarios: "",
    rfc_tercero: ""
  };

  options = {
    formState: {
      readOnly: true
    }
  };

  form: FormGroup = new FormGroup({});
  userFields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: [
        {
          key: 'nombre',
          type: 'textarea',
          templateOptions: {
            rows: 5,
            cols: 20,
            label: 'Nombre',
            description: 'Máximo 80 Caracteres',
            focus: true,
            required: true
          },
          validation: {
            show: true,
          },
          validators: {
            validation: Validators.compose([Validators.required,Validators.maxLength(80)])
          }
        },
        {
          key: 'comentarios',
          type: 'textarea',
          templateOptions: {
            rows: 5,
            cols: 20,
            label: 'Comentarios',
            description: 'Máximo 80 Caracteres',
            focus: true,
            required: true
          },
          validation: {
            show: true,
          },
          validators: {
            validation: Validators.compose([Validators.required,Validators.maxLength(80)])
          }
        },
        {
          key: 'rfc_tercero',
          type: 'textarea',
          templateOptions: {
            rows: 5,
            cols: 20,
            label: 'RFC Tercero',
            description: 'Máximo 80 Caracteres',
            focus: true,
            required: true
          },
          validation: {
            show: true,
          },
          validators: {
            validation: Validators.compose([Validators.required,Validators.maxLength(80)])
          }
        }
      ]
    }
  ];

  constructor(
    public dialog: DialogRef<FormState>,
    public _ws: WSClient,
    public _User: UserLogin,
    public router: Router,
    public pubsub: PubSubService,
    public toastr: ToastrService,
  ) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
  }

  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  saveForm() {

    let entity = {
      entity: "terceros",
      values: {
        cliente_id: this._User.getClient().cliente_id,
        rfc: this._User.getClient().rfc,
        nombre: this.formData.nombre,
        comentarios: this.formData.comentarios,
        rfc_tercero: this.formData.rfc_tercero
      }
    };

    this._ws.Generic().post(JSON.stringify(entity)).subscribe(
      (res) => this.onSave(res));
  }

  private onSave(result) {
    this.closeDialog();
    this.pubsub.publish(RECIEVED_EVENTS.RELOAD);
    this.toastr.success("Se guardó un nuevo Tercero");
  }
}
