import { Component, OnInit } from "@angular/core";
import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { DatePipe } from '@angular/common';
const orderBy = require('lodash/orderBy');
import { UserLogin } from "./../../../core/api/user.service";
import { WSClient } from "./../../../core/api/client.service";
import { PubSubService } from "./../../ngx-pubsub/ngx-pubsub.service";
import { createObject } from "../../../shared/utils/index";
import {
  HEADER_EVENTS,
  BANK_ACCOUNTS_EVENTS
} from "./../../ngx-pubsub/pubsub-actions";
import { ToastrService } from "ngx-toastr";
import { URLSearchParams, RequestOptions } from "@angular/http";

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormState extends BSModalContext {}
@Component({
  selector: "payment-form",
  templateUrl: './operationsForm.html',
    providers: [DatePipe]
})
export class OperationsFormComponent implements OnInit {
  formData = {
    tipo_operacion: "PAGO",
    fecha_emision: "",
    cliente_id: 1,
    rfc: "PCF070509371",
    total: 0,
    modo_operacion: "RECIBIDO",
    recepcion_operacion: "TRANSFERENCIA",
    numero_referencia: "123090321",
    cuenta_bancaria_id: 1,
    observaciones: "",
    detalles: []
  };

  selectedIndex:any;

  context: any;

  options = {
    formState: {
      readOnly: true
    }
  };
  dataRFC = {};
  totalColumns = 0;
  form: FormGroup = new FormGroup({});
  formFields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: [

        {
          key: "fecha_emision",
          type: "datepicker",
          className: 'col-xs-4',
          templateOptions: {
            datepickerPopup: "yyyy-MM-dd",
            type: "text",
            label: "Fecha Emision",
            placeholder: "Fecha"
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }

        },

        {
          key: "recepcion_operacion",
          type: "select",
          className: 'col-xs-4',
          defaultValue: 'TRANSFERENCIA',
          templateOptions: {
            label: "Metódo de pago",
            placeholder: "Metódo de pago",
            options: [{
              label: 'TRANSFERENCIA',
              value: 'TRANSFERENCIA',
            }, {
              label: 'DEPOSITO',
              value: 'DEPOSITO',
            },
            {
              label: 'CHEQUE',
              value: 'CHEQUE',
            }],
          },

          validators: {
            validation: Validators.compose([Validators.required])
          }

        },

        {
          key: "cuenta_bancaria_id",
          type: "selectorBanco",
          className: 'col-xs-4',
          templateOptions: {
            type: "text",
            label: "Cuenta Bancaría",
            placeholder: "Seleccionar Cuenta Bancaría"
          },

          validators: {
            validation: Validators.compose([Validators.required])
          }

        },

        {
          key: "observaciones",
          type: "input",
          className: 'col-xs-12',
          templateOptions: {
            type: "text",
            label: "observaciones",
            placeholder: "observaciones"
          },
        },


      ]
    }
  ];
  lastItem: number;
  columns = [];
  idx = {
    id:0,
    total:0,
    fecha: 0,
    rfc: 0,
    folio:0,
    nombre:0,
  };
  constructor(
    public dialog: DialogRef<FormState>,
    public _user: UserLogin,
    public _ws: WSClient,
    public router: Router,
    public pubsub: PubSubService,
    public toastr: ToastrService,
    public datePipe: DatePipe,
  ) {
    this.context = this.dialog.context;
    dialog.setCloseGuard(this);
    console.log(this.context.selected, this.context.selected[0].length);
    console.log("TIPO OPERACION", this.context.type);
    this.formData.tipo_operacion = this.context.type.tipo_operacion;
    this.formData.modo_operacion = this.context.type.modo_operacion;
    this.totalColumns = this.context.columns.length + 1;
    this.selectedIndex = this.totalColumns + 1
    this.columns = this.context.columns;
    this.dataRFC = this.context.selected[0];
    this.idx.id = this.columns.indexOf('id');
    this.idx.total = this.columns.indexOf('total');
    this.idx.fecha = this.columns.indexOf('fecha');
    this.idx.folio = this.columns.indexOf('folio')
    this.idx.rfc = this.columns.indexOf('rfc');
    this.idx.nombre = this.columns.indexOf('nombre');
    this.lastItem = this.context.selected[0].length;
    this.formData.detalles = this.context.selected.map((item) =>{
      item[this.lastItem] = {
        "movimiento_id":item[this.idx.id],
        "monto": item[this.idx.total],
        "instrucciones_especificas":""
      };
      item[this.selectedIndex] = false;
      return item;
    } );
    this.formData.detalles = orderBy(this.formData.detalles, ['movimiento'], ['asc']);
    console.log('NEW DETALLES',this.formData.detalles)
    this.formData.fecha_emision = this.datePipe.transform((new Date()),'yyyy-mm-dd');
    console.log(":::FECHA EMISION",this.formData.fecha_emision);
    //console.log("DATA:::", this.formData.detalles)
    this.formData.cliente_id = _user.getClient().cliente_id;
    this.formData.rfc = _user.getClient().rfc;
  }

  ngOnInit() {}

  foundSelected(arr){
    const filtered = arr.filter((x)=> x[this.selectedIndex] == true);
    return filtered.length > 0;
  }

  totalSum(index, arr){
    const sum = (x,y) => x + y;
    const getValue = (i) => parseFloat(i[index]);
    const isValid = (x) => (x)=> x > 0;
    return arr.map(getValue).filter(isValid).reduce(sum);
  }

  totalSelectedSum(index, arr){
    if( arr.length > 0 ){
      const sum = (x,y) => x + y;
      const getValue = (i) => parseFloat(i[index].monto);
      const isValid = (x) => (x)=> x > 0;
      const selectedItems = (x)=> x[this.selectedIndex] == true;
      const selectedArr = arr.filter(selectedItems);
      if (selectedArr.length > 0) {
        return selectedArr.map(getValue).filter(isValid).reduce(sum);
      } else { return 0 }
    } else {
      return 0;
    }
  }

  getTotal(arr){
    console.log('Total Array',arr);
    const sum = (x,y) => x + y;
    const getValue = (y) => parseFloat(y);
    const isValid = (x) => (x)=> x > 0;
    return arr.map(getValue).filter(isValid).reduce(sum);      
  }

  saveOperation(){
    let tempData = {cuenta_bancaria_id:{},detalles:[],total:0};
    Object.assign(tempData, this.formData);
    if(this.formData.cuenta_bancaria_id && tempData.detalles.length > 0){
      tempData.cuenta_bancaria_id = this.formData.cuenta_bancaria_id['@IdCuenta'];
      tempData['fecha_emision'] = tempData['fecha_emision'].formatted;
      tempData.detalles = tempData.detalles.filter((x)=> x[this.selectedIndex] == true).map((item)=> item[this.lastItem]);
      tempData.total = this.getTotal(tempData.detalles.map(x => x.monto));
    }
    console.warn('Save data:::',tempData);
    this._ws.Operation().post(JSON.stringify(tempData)).subscribe((res)=>{
      console.log(res);
      this.toastr.success(`Se realizo el ${this.formData.tipo_operacion} con exito`);
      this.closeDialog();
    })
  }

  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }
  total(arr) {
    if (arr.length > 1) {
      const isValid = (x) => (x)=> x > 0;
      const totSum = arr
        .filter(isValid)
        .reduce((x, y) => parseFloat(x[8]) + parseFloat(y[8]));
      return totSum.toFixed(2);
    } else {
      return arr[0][8];
    }
  }
  removeItem(item){
    const index = this.formData.detalles.indexOf(item);
    this.formData.detalles.splice(index, 1);
    if(this.formData.detalles.length == 0){
      this.toastr.info("Necesitas tener facturas agregadas")
      setTimeout(()=>this.closeDialog(),1000)
    }
  }

  checkAll(ev) {
    if (this.formData.detalles.length > 0) {
      this.formData.detalles.forEach(
        x => (x[this.selectedIndex] = ev.target.checked)
      );
    }
  }
}

/*
MODEL
{
	"tipo_operacion":"PAGO",
	"fecha_emision": "2017-07-11",
	"cliente_id" : 1,
	"rfc":"PCF070509371",
	"total": 250000,
	"modo_operacion": "RECIBIDO",
	"recepcion_operacion": "TRANSFERENCIA",
	"numero_referencia" : "123090321",
	"cuenta_bancaria_id": 1,
	"observaciones":"Primer Pago que Hacemos",
	"detalles" : [
				   {"movimiento_id":662,
				   	"monto": 248000,
				   	"instrucciones_especificas":"Hola 123"
				   },
				   {
				   	 "movimiento_id":663,
				   	 "monto":50,
				   	 "instrucciones_especificas":"Hola 12332"
				   },
				   {
				     "movimiento_id":664,
				   	 "monto":150,
				   	 "instrucciones_especificas":"Hola 12332"
				   },
				   {
				     "movimiento_id":665,
				   	 "monto":350,
				   	 "instrucciones_especificas":"Hola 12332"
				   },
				   {
				     "movimiento_id":666,
				   	 "monto":1100,
				   	 "instrucciones_especificas":"Hola 12332"
				   },
				   {
				     "movimiento_id":667,
				   	 "monto":350,
				   	 "instrucciones_especificas":"Hola 12332"
				   } 
				 ]
}
*/
