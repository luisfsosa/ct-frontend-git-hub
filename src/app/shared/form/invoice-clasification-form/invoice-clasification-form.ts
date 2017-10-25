import {
  FormGroup,
  Validators
} from "@angular/forms";
import { Component } from "@angular/core";
import { DialogRef, ModalComponent} from "angular2-modal";
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
  selector: "app-invoice-clasification-form",
  templateUrl: "./invoice-clasification-form.html",
  styleUrls: ["./invoice-clasification-form.scss"]
})
export class InvoiceClasificationFormComponent implements ModalComponent<FormState> {
  context: any;
  formData = {
    cve_contable_quo: []
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
          key: 'cve_contable_quo',
          type: 'categorized-accounting-account-select',
          templateOptions: {
            label: 'CVE Contable QUO',
            placeholder: 'Seleccione una CVE Contable QUO',
            required: true
          },
          validation: {
            show: true,
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
    public _WS: WSClient,
    public _User: UserLogin,
    public router: Router,
    public pubsub: PubSubService,
    public toastr: ToastrService,
  ) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
  }

  ngOnInit(){
    if(this.context && this.context.formModel){
      if(this.context.formModel.cve_contable_quo!==null){
        this.formData.cve_contable_quo=[this.context.formModel.cve_contable_quo];
      }
    }
  }

  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  saveForm() {
    if(this.context && this.context.formModel){
      let entity = {
        entity: "movimientos",
        id:this.context.formModel.id,
        values: {
          cve_contable_quo: this.formData.cve_contable_quo[0].id,
        }
      };
      console.log(JSON.stringify(entity));
      this._WS.Generic().put(JSON.stringify(entity)).subscribe(
        (res) => this.onSave());
    }else{
      this.toastr.error("Error al Cargar la Información de la Facture. Consulte con el Administrador");
    }
  }

  private onSave() {
    this.closeDialog();
    this.pubsub.publish(RECIEVED_EVENTS.RELOAD);
    this.toastr.success("Se realizo la Clasificación Correctamente");
  }
}
