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
  selector: "app-invoice-detail-clasification-form",
  templateUrl: "./invoice-detail-clasification-form.html",
  styleUrls: ["./invoice-detail-clasification-form.scss"]
})
export class InvoiceDetailClasificationFormComponent implements ModalComponent<FormState> {
  context: any;
  selectedItems = [];
  idInvoice:any;
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
    if(this.context && this.context.selectedItems){
      this.selectedItems=this.context.selectedItems;
    }

    if(this.context && this.context.idInvoice){
      this.idInvoice=this.context.idInvoice;
    }
  }

  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  saveForm() {
    let entity = {
      cliente_id: this._User.getClient().cliente_id,
      rfc: this._User.getClient().rfc,
      movimiento_id:this.idInvoice,
      detalle_id:0,
      cve_contable_quo:this.formData.cve_contable_quo[0].id
    };

    this.selectedItems.forEach(item => {
      entity.detalle_id=+item[0];

      console.log(entity);

      this._WS.Associations().post(JSON.stringify(entity)).subscribe(
        (res) => res);
      }
    );

    this.closeDialog();
    this.pubsub.publish(RECIEVED_EVENTS.RELOAD);
    this.toastr.success("Se realizo la Clasificación Correctamente");
  }
}
