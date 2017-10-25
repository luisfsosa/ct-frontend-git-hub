import { FormState} from '../third-party-form/third-party-form.component';
import {
  FormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { DialogRef} from "angular2-modal";
import { Router } from "@angular/router";
import { WSClient } from "../../../core/api/client.service";
import { PubSubService } from "../../../shared/ngx-pubsub/ngx-pubsub.service";
import { ToastrService } from "ngx-toastr";
import { FormlyFieldConfig } from '@ngx-formly/core';

import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "../../../shared/ngx-pubsub/pubsub-actions";


@Component({
  selector: "app-third-party-edit-form",
  templateUrl: "./third-party-edit-form.component.html",
  styleUrls: ["./third-party-form.component.scss"]
})
export class ThirdPartyEditFormComponent implements OnInit, OnDestroy {
  context: any;
  formData = {
    id:0,
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
    public router: Router,
    public pubsub: PubSubService,
    public toastr: ToastrService,
  ) {
    this.context = this.dialog.context;
    dialog.setCloseGuard(this);

    this.formData.id = this.context.selected[0];
    this.formData.nombre = this.context.selected[3];
    this.formData.comentarios =this.context.selected[4];
    this.formData.rfc_tercero =this.context.selected[5];
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

    let entity = {
      entity: "terceros",
      id: this.formData.id,
      values: {
        nombre: this.formData.nombre,
        comentarios: this.formData.comentarios,
        rfc_tercero: this.formData.rfc_tercero
      }
    };

    console.log("save this", JSON.stringify(entity));

    this._ws.Generic().put(JSON.stringify(entity)).subscribe(res => {
      this.closeDialog();
      this.pubsub.publish(RECIEVED_EVENTS.RELOAD);
      this.toastr.success("Se editó el Tercero");
    });
  }
}

