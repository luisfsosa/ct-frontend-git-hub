import { FormState} from '../settings-global-form/settings-global-form.component';
import {
  FormGroup,
  Validators
} from "@angular/forms";
import { Component } from "@angular/core";
import { DialogRef, ModalComponent} from "angular2-modal";
import { Router } from "@angular/router";
import { WSClient } from "../../../core/api/client.service";
import { UserLogin } from '../../../core/api/user.service';
import { PubSubService } from "../../../shared/ngx-pubsub/ngx-pubsub.service";
import { ToastrService } from "ngx-toastr";
import { FormlyFieldConfig } from '@ngx-formly/core';
import SettingsValidator from "../settings.validator"
import {DISPATCHING}  from "../settings.constants";

@Component({
  selector: "app-dispatching-dispatching-form",
  templateUrl: "./settings-dispatching-form.component.html",
  styleUrls: ["./settings-dispatching-form.component.scss"]
})
export class SettingsDispatchingFormComponent implements ModalComponent<FormState> {
  context: FormState;
  formData = {
    codigo_parametro: "",
    permite_sobreescritura:0,
    permite_sobreescritura_questionable:false,
    tipo_parametro: "CUENTA_CONTABLE",
    valor_valor: "",
    valor_cuenta_contable: ""
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
            description: 'Máximo 30 Caracteres',
            placeholder: "Ingresar el Código del Parámetro",
            required: true
          },
          validation: {
            show: true,
          },
          validators: {
            validation: Validators.compose([Validators.required, Validators.maxLength(30)])
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
            label: 'Tipo de Parámetro'
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
          key: 'valor_cuenta_contable',
          type: 'accounting-account-select',
          templateOptions: {
            label: 'Valor',
            placeholder: 'Seleccione un Valor',
            required: true
          },
          hideExpression: 'model.tipo_parametro!=="CUENTA_CONTABLE" ? true: false'
        },
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

  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  saveForm() {
    SettingsValidator.create(DISPATCHING, this.formData, this._User.getClient(),this.dialog, this._WS, this.pubsub, this.toastr );
  }
}
