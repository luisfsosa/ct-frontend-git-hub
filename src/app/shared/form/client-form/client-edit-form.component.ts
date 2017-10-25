import {FormState, toDatePicker} from '../util/form-state';
import {
  FormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { DialogRef} from "angular2-modal";
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
  selector: "app-client-edit-form",
  templateUrl: "./client-edit-form.component.html",
  styleUrls: ["./client-form.component.scss"]
})
export class ClientEditFormComponent implements OnInit, OnDestroy {
  context: any;
  idReceived:any;
  formData = {
    id:0,
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
            datepickerPopup: "yyyy-mm-dd",
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
            datepickerPopup: "yyyy-mm-dd"
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
            disabled:true
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
    this.context = this.dialog.context;
    dialog.setCloseGuard(this);
  }

  ngOnInit(){

    if(this.context && this.context.idReceived){
      this.idReceived=this.context.idReceived;
    }

    if(this.context && this.context.formModel){

      this.formData.id = this.context.formModel.id;
      this.formData.rfc_fuente = this.context.formModel.rfc_fuente;

      this.formData.fecha_inicio_vigencia =toDatePicker(this.context.formModel.fecha_inicio_vigencia);
      this.formData.fecha_fin_vigencia = toDatePicker(this.context.formModel.fecha_fin_vigencia);

      this.formData.cve_contable_quo = [this.context.formModel.cve_contable_quo];
      this.formData.tipo_asociacion = this.context.formModel.tipo_asociacion;


      if( this.context.formModel.parte_relacionada==1){
        this.formData.parte_relacionada_questionable=true
      }

      if( this.context.formModel.es_contado==1){
        this.formData.es_contado_questionable=true
      }

      this.formData.razon_social = this.context.formModel.razon_social;

      if( this.context.formModel.lista_negra==1){
        this.formData.lista_negra_questionable=true
      }

      if(this.context.formModel.regimen_fiscal_id!=null){
        this.formData.regimen_fiscal_id = [this.context.formModel.regimen_fiscal_id];
      }

      if(this.context.formModel.regimen_quo_id!=null){
        this.formData.regimen_quo_id = [this.context.formModel.regimen_quo_id];
      }
    }
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
      entity: "asociacion_cuentas",
      id: this.formData.id,
      values: {
        rfc_fuente: this.formData.rfc_fuente,
        fecha_inicio_vigencia:this.formData.fecha_inicio_vigencia.formatted,
        fecha_fin_vigencia:this.formData.fecha_fin_vigencia.formatted,
        cve_contable_quo: this.formData.cve_contable_quo[0].id,
        tipo_asociacion:this.formData.tipo_asociacion,
        parte_relacionada: 0,
        es_contado: 0,
        regimen_quo_id: this.formData.regimen_quo_id[0].id,
        razon_social:this.formData.razon_social,
        lista_negra: 0,
        regimen_fiscal_id: this.formData.regimen_fiscal_id[0].id,
      }
    };


    if( this.formData.parte_relacionada_questionable==true){
      entity.values.parte_relacionada=1
    }

    if( this.formData.es_contado_questionable==true){
      entity.values.es_contado=1
    }

    if( this.formData.lista_negra_questionable==true){
      entity.values.lista_negra=1
    }

    if( typeof this.formData.cve_contable_quo[0].id ==="undefined"){
      this.formData.cve_contable_quo[0]={id:this.formData.cve_contable_quo[0]}
    }

    console.log("save this", JSON.stringify(entity));

    this._ws.Generic().put(JSON.stringify(entity)).subscribe(
      (res) => this.onSaveAssociationAccount(res));
  }

  private onSaveAssociationAccount(result) {

    if(this.context && this.context.idReceived){
      let entity = {
        entity: "movimientos",
        id:this.idReceived,
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
    this.toastr.success("Se editó Cliente");


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
      rfc_fuente: this.formData.rfc_fuente,
      cve_contable_quo: this.formData.cve_contable_quo[0].id
    };

    console.log(JSON.stringify(entity));
    this._ws.Associations().post(JSON.stringify(entity)).subscribe(
      (res) => res);
  }
}

