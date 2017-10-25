import { FormState} from '../../../../shared/form/util/form-state';
import {
  FormGroup,
  Validators,
} from "@angular/forms";
import { Component } from "@angular/core";
import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { Router } from "@angular/router";
import { WSClient } from "../../../../core/api/client.service";
import { PubSubService } from "../../../../shared/ngx-pubsub/ngx-pubsub.service";
import { ToastrService } from "ngx-toastr";
import { FormlyFieldConfig } from '@ngx-formly/core';

import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "../../../../shared/ngx-pubsub/pubsub-actions";


@Component({
  selector: "app-credit-form",
  templateUrl: "./credit-form.component.html",
  styleUrls: ["./credit-form.component.scss"]
})
export class CreditFormComponent implements ModalComponent<FormState> {
  context: FormState;
  formData = {
      codigo: "",
      nombre: ""
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
          key: 'codigo',
          type: 'input',
          templateOptions: {
            type: "text",
            label: "Código",
            description: 'Máximo 20 Caracteres',
            placeholder: "Ingresar Código",
            required: true
          },
          validation: {
            show: true,
          },
          validators: {
            validation: Validators.compose([Validators.required,Validators.maxLength(20)])
          }
        },
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
        }
      ]
    }
  ];

  constructor(
    public dialog: DialogRef<FormState>,
    public _ws: WSClient,
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
      entity: "libros",
      values: {
        codigo: this.formData.codigo,
        nombre: this.formData.nombre
      }
    };

    this._ws.Generic().post(JSON.stringify(entity)).subscribe(
      (res) => this.onSave(res));
  }

  private onSave(result) {
    this.closeDialog();
    this.pubsub.publish(RECIEVED_EVENTS.RELOAD);
    this.toastr.success("Se guardó un nuevo Client Institucional");
  }
}
