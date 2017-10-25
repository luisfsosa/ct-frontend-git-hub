import { FormState} from '../settings-global-form/settings-global-form.component';
import {
  FormGroup,
  Validators
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { DialogRef } from "angular2-modal";
import { Router } from "@angular/router";
import { WSClient } from "../../../core/api/client.service";
import { UserLogin } from '../../../core/api/user.service';
import { PubSubService } from "../../../shared/ngx-pubsub/ngx-pubsub.service";
import { ToastrService } from "ngx-toastr";
import { FormlyFieldConfig } from '@ngx-formly/core';
import SettingsValidator from "../settings.validator"
import {GLOBAL}  from "../settings.constants";

@Component({
  selector: "app-settings-global-edit-form",
  templateUrl: "./settings-global-edit-form.component.html",
  styleUrls: ["./settings-global-form.component.scss"]
})
export class SettingsGlobalEditFormComponent implements OnInit {
  context: any;
  formData = {
    id:0,
    codigo_parametro: "",
    permite_sobreescritura:0,
    permite_sobreescritura_questionable:false,
    tipo_parametro: "CUENTA_CONTABLE",
    valor_valor: "",
    valor_cuenta_contable: [],
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
          key: "codigo_parametro",
          type: "input",
          templateOptions: {
            type: "text",
            label: "Código del Parámetro",
            placeholder: "Ingresar el Código del Parámetro",
            disabled: true
          }
        },
        {
          key: "permite_sobreescritura_questionable",
          type: "checkbox",
          templateOptions: {
            label: "¿Permite Sobre Escritura?"
          }
        },
        {
          key: 'tipo_parametro',
          type: 'select',
          templateOptions: {
            options: [{
              label: 'Cuenta Contable',
              value: 'CUENTA_CONTABLE',
            }, {
              label: 'Valor',
              value: 'VALOR',
            }],
            label: 'Tipo de Parámetro',
            disabled: true
          }
        },
        {
          key: "valor_valor",
          type: "input",
          templateOptions: {
            type: "text",
            label: "Valor",
            placeholder: "Ingresar el Valor",
            required: true,
          },
          hideExpression: 'model.tipo_parametro==="CUENTA_CONTABLE" ? true: false'
        },
        {
          key: "valor_cuenta_contable",
          type: "accounting-account-select",
          templateOptions: {
            type: "text",
            label: "Valor",
            placeholder: "Ingresar el Valor",
            required: true,
          },
          hideExpression: 'model.tipo_parametro!=="CUENTA_CONTABLE" ? true: false'
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
    this.context = this.dialog.context;
    dialog.setCloseGuard(this);


    this.formData.id = this.context.selected[0];
    this.formData.codigo_parametro=this.context.selected[5];
    if(this.context.selected[7]==1){
      this.formData.permite_sobreescritura_questionable = true;
    }
    this.formData.tipo_parametro =this.context.selected[8];
    if(this.context.selected[8]==="CUENTA_CONTABLE"){
      if(this.context.selected[6]!=null){
        this.formData.valor_cuenta_contable = [this.context.selected[6]];
      }
    }else{
      this.formData.valor_valor = this.context.selected[6];
    }
  }

  ngOnInit() {}

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
    SettingsValidator.update(GLOBAL, this.formData,this._User.getClient(),this.dialog, this._WS, this.pubsub, this.toastr );
  }
}

