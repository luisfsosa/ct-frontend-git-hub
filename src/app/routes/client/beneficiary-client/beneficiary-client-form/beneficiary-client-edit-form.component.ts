import { FormState} from '../../../../shared/form/util/form-state';
import {
  FormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { DialogRef} from "angular2-modal";
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
  selector: "app-beneficiary-client-edit-form",
  templateUrl: "./beneficiary-client-edit-form.component.html",
  styleUrls: ["./beneficiary-client-form.component.scss"]
})
export class BeneficiaryClientEditFormComponent implements OnInit, OnDestroy {
  context: any;
  formData = {
    id:0,
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
            placeholder: "Ingresar Código",
            disabled: true
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
    this.context = this.dialog.context;
    dialog.setCloseGuard(this);

    this.formData.id = this.context.selected[0];
    this.formData.codigo = this.context.selected[1];
    this.formData.nombre = this.context.selected[2];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  total(arr) {
    if (arr.length > 1) {
      const totSum = arr
        .filter(x => parseFloat(x[8]))
        .reduce((x, y) => parseFloat(x[8]) + parseFloat(y[8]));
      return totSum.toFixed(2);
    } else {
      return arr[0][8];
    }
  }

  saveForm(){

    let newAccount = {
      entity: "libros",
      id: this.formData.id,
      values: {
        nombre: this.formData.nombre
      }
    };

    console.log("save this", JSON.stringify(newAccount));

    this._ws.Generic().put(JSON.stringify(newAccount)).subscribe(res => {
      this.closeDialog();
      this.pubsub.publish(RECIEVED_EVENTS.RELOAD);
      this.toastr.success("Se editó el Client Institucional");
    });
  }
}
