import {FormState, getEmptyDatePicker, getCurrentDate} from '../util/form-state';
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
import { PubSubService } from "../../ngx-pubsub/ngx-pubsub.service";
import { ToastrService } from "ngx-toastr";
import { FormlyFieldConfig } from '@ngx-formly/core';

import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "../../ngx-pubsub/pubsub-actions";


const swal = require("sweetalert");


@Component({
  selector: "app-client-form",
  templateUrl: "./client-form.component.html",
  styleUrls: ["./client-form.component.scss"]
})
export class ClientFormComponent implements ModalComponent<FormState> {
  context: any;
  formData = {
      rfc_fuente: "",
      fecha_inicio_vigencia: null,
      fecha_fin_vigencia: null,
      cve_contable_quo: [],
      tipo_asociacion: "",
      parte_relacionada: 0,
      parte_relacionada_questionable:false,
      es_contado: 0,
      es_contado_questionable:false,
      regimen_quo_id: [],
      razon_social:"",
      lista_negra: 0,
      lista_negra_questionable:false,
      regimen_fiscal_id:[]
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
          key: 'rfc_fuente',
          type: 'input',
          templateOptions: {
            type: "text",
            label: "RFC Fuente",
            description: 'Máximo 20 Caracteres',
            placeholder: "Ingresar RFC Fuente",
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
          key: "fecha_inicio_vigencia",
          type: "datepicker",
          templateOptions: {
            label: "Fecha Inicio Vigencia",
            type: "text",
            datepickerPopup: "yyyy-MM-dd",
            required: true
          },
          validation: {
            show: true,
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          key: "fecha_fin_vigencia",
          type: "datepicker",
          templateOptions: {
            label: "Fecha Fin Vigencia",
            type: "text",
            datepickerPopup: "yyyy-MM-dd"
          }
        },
        {
          key: 'cve_contable_quo',
          type: 'accounting-account-select',
          templateOptions: {
            label: 'CVE Contable QUO',
            placeholder: 'Seleccione uno de los siguientes valores',
            required: true
          },
          validation: {
            show: true,
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          key: 'tipo_asociacion',
          type: 'select',
          templateOptions: {
            options: [{
              label: 'Fijo',
              value: 'FIJO',
            }, {
              label: 'Mixto',
              value: 'MIXTO',
            }],
            label: 'Tipo de Asociación',
            placeholder: 'Seleccione El Tipo de Asociación',
            required: true
          },
          validation: {
            show: true,
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          key: "parte_relacionada_questionable",
          type: "checkbox",
          templateOptions: {
            label: "¿Parte Relacionada?"
          }
        },
        {
          key: "es_contado_questionable",
          type: "checkbox",
          templateOptions: {
            label: "¿Es Contado?"
          }
        },
        {
          key: 'regimen_quo_id',
          type: 'regime-quo-select',
          templateOptions: {
            label: 'Régimen QUO',
            placeholder: 'Seleccione un Régimen QUO',
            required: true
          },
          validation: {
            show: true,
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          key: 'razon_social',
          type: 'textarea',
          templateOptions: {
            rows: 5,
            cols: 20,
            label: 'Razón Social',
            description: 'Máximo 120 Caracteres',
            focus: true,
            required: true
          },
          validation: {
            show: true,
          },
          validators: {
            validation: Validators.compose([Validators.required,Validators.maxLength(120)])
          }
        },
        {
          key: "lista_negra_questionable",
          type: "checkbox",
          templateOptions: {
            label: "¿Lista Negra?",
            disabled: true
          }
        },
        {
          key: 'regimen_fiscal_id',
          type: 'regime-tax-select',
          templateOptions: {
            label: 'Régimen Fiscal',
            placeholder: 'Seleccione un Régimen Fiscal',
            required: true
          },
          validation: {
            show: true,
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
    public _ws: WSClient,
    public _User: UserLogin,
    public router: Router,
    public pubsub: PubSubService,
    public toastr: ToastrService,
  ) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
  }

  ngOnInit(){
    this.formData.fecha_inicio_vigencia =getCurrentDate();
    if(this.context && this.context.formModel){
      this.formData.razon_social=this.context.formModel.nombre;
      this.formData.rfc_fuente=this.context.formModel.rfc;
    }
  }

  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  saveForm() {

    if(this.formData.fecha_fin_vigencia==null){
      this.formData.fecha_fin_vigencia=getEmptyDatePicker();
    }

    let entity = {
      entity: "asociacion_cuentas",
      values: {
        cliente_id: this._User.getClient().cliente_id,
        rfc :this._User.getClient().rfc,
        aplicacion_cuenta:"CLIENTE",
        rfc_fuente: this.formData.rfc_fuente,
        fecha_inicio_vigencia: this.formData.fecha_inicio_vigencia.formatted,
        fecha_fin_vigencia: this.formData.fecha_fin_vigencia.formatted,
        cve_contable_quo: this.formData.cve_contable_quo[0].id,
        tipo_asociacion:this.formData.tipo_asociacion,
        parte_relacionada: 0,
        es_contado:0,
        regimen_quo_id:this.formData.regimen_quo_id[0].id,
        razon_social:this.formData.razon_social,
        lista_negra:0,
        regimen_fiscal_id:this.formData.regimen_fiscal_id[0].id
      }
    };


    if(this.formData.parte_relacionada_questionable==true){
      entity.values.parte_relacionada=1
    }

    if(this.formData.es_contado_questionable==true){
      entity.values.es_contado=1
    }

    if(this.formData.lista_negra_questionable==true){
      entity.values.lista_negra=1
    }
    console.log(JSON.stringify(entity));
    this._ws.Generic().post(JSON.stringify(entity)).subscribe(
      (res) => this.onSaveAssociationAccount(res));
  }

  private onSaveAssociationAccount(result) {

    if(this.context && this.context.formModel){
      let entity = {
        entity: "movimientos",
        id:this.context.formModel.id,
        values: {
          cve_contable_quo: this.formData.cve_contable_quo[0].id,
        }
      };

      console.log(JSON.stringify(entity));
      this._ws.Generic().put(JSON.stringify(entity)).subscribe(
        (res) => this.onSave());
    }else {
      this.onSave();
    }
  }

  private onSave() {
    this.closeDialog();
    this.pubsub.publish(RECIEVED_EVENTS.RELOAD);
    this.toastr.success("Se guardó un nuevo Cliente");

    if(this.formData.tipo_asociacion==='FIJO'){
      swal(
        {
          title: "Clasificación Masiva",
          text: "¿Desea aplicar la clasificación a todas las facturas previamente ingresadas?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Ok",
          cancelButtonText: "Cancelar",
          closeOnConfirm: false,
          closeOnCancel: true
        },
        isConfirm => {
          if (isConfirm) {
            this.massClassification();
            swal("Aplicado!", "Se aplico la clasificación con exito.", "success");
          }
        }
      );
    }
  }

  private massClassification(){
    let entity = {
      cliente_id: this._User.getClient().cliente_id,
      rfc :this._User.getClient().rfc,
      aplicacion_cuenta:"CLIENTE",
      rfc_fuente: this.formData.rfc_fuente,
      cve_contable_quo: this.formData.cve_contable_quo[0].id
    };

    console.log(JSON.stringify(entity));
    this._ws.Associations().post(JSON.stringify(entity)).subscribe(
      (res) => res);
  }
}
