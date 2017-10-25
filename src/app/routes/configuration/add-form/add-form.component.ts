import { Component, OnInit } from "@angular/core";
import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { UserLogin } from "../../../core/api/user.service";
import { WSClient } from "../../../core/api/client.service";

export class FormState extends BSModalContext {
  constructor(public edit: string) {
    super();
  }
}

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: "add-form",
  templateUrl: "./add-form.component.html",
  styleUrls: ["./add-form.component.scss"]
})
export class AddFormComponent implements ModalComponent<FormState> {
  context: FormState;
  _rfcDetails = {
    entity: "rfc_cliente",
    values: { cliente_id: "" }
  };
  form: FormGroup = new FormGroup({});
  userFields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: [
        {
          key: "rfc",
          type: "input",
          templateOptions: {
            type: "text",
            label: "RFC",
            placeholder: "Ingresar RFC"
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },

        {
          key: "razon_social",
          type: "input",
          templateOptions: {
            type: "text",
            label: "Razón Social",
            placeholder: "Ingresar Razón Social"
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },

        {
          key: "usuarios",
          type: "input",
          templateOptions: {
            type: "text",
            label: "Usuarios",
            placeholder: "Ususarios"
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },

        {
          key: "clave",
          type: "input",
          templateOptions: {
            type: "password",
            label: "Clave SAT",
            placeholder: "Ingresar Clave",
            pattern: ""
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        }
      ]
    }
  ];

  constructor(
    public dialog: DialogRef<FormState>,
    public _user: UserLogin,
    public _ws: WSClient,
    public router: Router,
  ) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
    this._rfcDetails.values.cliente_id = _user.getClient().cliente_id;
  }

  closeDialog(value) {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  refresh() {
    const currentRoute = this.router.url;
    console.log(currentRoute);
    this.router.navigate(["/dahboard"]);
    setTimeout(() => this.router.navigate([currentRoute]), 100);
  }


  saveForm() {
    console.log(this._rfcDetails);
    this._ws.Generic().post(JSON.stringify(this._rfcDetails)).subscribe(res => {
      console.log(res);
      this.refresh();
    });
  }
}
