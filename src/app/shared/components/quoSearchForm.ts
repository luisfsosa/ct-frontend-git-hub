import { Component, OnInit } from "@angular/core";
import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { DatePipe } from '@angular/common';

import { UserLogin } from "./../../core/api/user.service";
import { WSClient } from "./../../core/api/client.service";
import { PubSubService } from "./../ngx-pubsub/ngx-pubsub.service";
import {
  HEADER_EVENTS,
  BANK_ACCOUNTS_EVENTS
} from "./../ngx-pubsub/pubsub-actions";
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

@Component({
  selector: "quo-search-form",
  template: `	
  <div class="search-form panel">
  <div class="panel-heading">
  <a (click)="toggle()">
  <strong>Búsqueda Avanzada </strong>
  <i *ngIf="_user.getSearchVisible()" class="fa fa-caret-square-o-up" aria-hidden="true"></i>
  <i *ngIf="!_user.getSearchVisible()" class="fa fa-caret-square-o-down" aria-hidden="true"></i>
  </a>
</div>
  <div class="panel-body" *ngIf="_user.getSearchVisible()">
    <form class="formly" name="form" role="form" novalidate [formGroup]="form" (ngSubmit)="search()">
    <div class="row">
      <div class="col-md-12">
        <formly-form [model]="formData" [fields]="formFields" [form]="form" [options]="options">
        </formly-form>
        <div class="col-md-12">
        <button type="submit" class="btn btn-success"><i class="fa fa-search" aria-hidden="true"></i> Busqueda avanzada</button>
        <a (click)="resetForm()" class="btn btn-default"><i class="fa fa-times" aria-hidden="true"></i> Limpiar</a>
        </div>
      </div>
    </div>
    </form>
  </div>
  </div>
		
    `,
    providers: [DatePipe]
})
export class QuoSearchFormComponent implements OnInit {
  formData = {
    rfc_emisor:"",
    tipo:"",
  };

  options = {
    formState: {
      readOnly: true
    }
  };

  form: FormGroup = new FormGroup({});
  formFields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: [
        {
          key: "nombre_receptor",
          type: "input",
          className: 'col-sm-4',
          templateOptions: {
            type: "text",
            label: "Nombre Receptor/Razón",
            placeholder: "Ingresar Nombre"
          },
        },
        {
          key: "nombre_emisor",
          type: "input",
          className: 'col-sm-4',
          templateOptions: {
            type: "text",
            label: "Nombre Emisor/Razón",
            placeholder: "Ingresar Nombre"
          },
        },

        {
          key: "fecha",
          type: "datepicker",
          className: 'col-sm-4',
          templateOptions: {
            label: "Fecha",
            placeholder: "Date"
          },
        },
        {
          key: "tipo",
          type: "select",
          className: 'col-sm-4',
          defaultValue:"",
          templateOptions: {
            label: "Tipo",
            placeholder: "Selecione tipo",
            options:[{
              value:'e',
              label: 'Emitidas',
            },
            {
              value:'i',
              label: 'Recibidas',
            }
          ]
          },
        },
        {
          key: "rfc_emisor",
          type: "input",
          className: 'col-sm-4',
          templateOptions: {
            type: "text",
            label: "RFC Emisor",
            placeholder: "Ingresar RFC emisor"
          },
        },
        {
          key: "rfc_receptor",
          type: "input",
          className: 'col-sm-4',
          templateOptions: {
            type: "text",
            label: "RFC Receptor",
            placeholder: "Ingresar RFC receptor"
          },
        },
        {
          key:"saldo[0]",
          type:'input',
          className: 'col-sm-3',
          templateOptions: {
            type: "text",
            label: "Saldo",
            placeholder: "Ingrese saldo"
          },
        },
        {
          key: "saldo[1]",
          type: "select",
          className: 'col-sm-3',
          defaultValue:"",
          templateOptions: {
            label: "Mayor/Menor",
            placeholder: "Selecione tipo",
            options:[
              {
                value:'eq',
                label: 'Igual',
              },
              {
              value:'gt',
              label: 'Mayor',
            },
            {
              value:'lt',
              label: 'Menor',
            },
            {
              value:'geq',
              label: 'Mayor o igual',
            },
            {
              value:'leq',
              label: 'Menor o igual',
            }

          ]
          }
        },

        {
          key:"folio[0]",
          type:'input',
          className: 'col-sm-3',
          templateOptions: {
            type: "text",
            label: "Folio",
            placeholder: "Ingrese folio"
          },
        },
        {
          key: "folio[1]",
          type: "select",
          className: 'col-sm-3',
          defaultValue:"",
          templateOptions: {
            label: "Mayor/Menor",
            placeholder: "Selecione tipo",
            options:[
              {
                value:'eq',
                label: 'Igual',
              },
              {
              value:'gt',
              label: 'Mayor',
            },
            {
              value:'lt',
              label: 'Menor',
            },
            {
              value:'geq',
              label: 'Mayor o igual',
            },
            {
              value:'leq',
              label: 'Menor o igual',
            }

          ]
          }
        },

        {
          key:"anio_fiscal",
          type:'select',
          className: 'col-sm-3',
          templateOptions: {
            label: "Año Fiscal",
            placeholder: "Ingrese Año",
            options: Array.from(Array(2018), (_, i) => i)
            .filter((x) => x >= 2006)
            .map((y) => ({'value': y,'label': `Año ${y}`}) )
          },
        },
        {
          key:"periodo_fiscal",
          type:'select',
          className: 'col-sm-3',
          templateOptions: {
            label: "Periodo Fiscal",
            placeholder: "Ingrese Periodo",
            options: Array.from(Array(13), (_, i) => i)
            .filter((x) => x > 0)
            .map((y)=> ({ "value": `0${y}` , "label" : `Periodo 0${y}` }))
          },
        },
        {
          key:"total",
          type:'input',
          className: 'col-sm-3',
          templateOptions: {
            type: "text",
            label: "Importe",
            placeholder: "Ingrese Importe"
          },
        },
        {
          key:"uuid",
          type:'input',
          className: 'col-sm-3',
          templateOptions: {
            type: "text",
            label: "Folio Fiscal",
            placeholder: "Ingrese Folio Fiscal"
          },
        },
        {
          key:"textsearch",
          type:'input',
          className: 'col-sm-3',
          templateOptions: {
            type: "text",
            label: "Palabra Clave",
            placeholder: "Ingrese Palabra Clave"
          },
        },
        {
          key:"estatus",
          type:'input',
          className: 'col-sm-3',
          templateOptions: {
            type: "text",
            label: "Estatus",
            placeholder: "Ingrese Estatus"
          },
        },
        {
          key:"id",
          type:'input',
          className: 'col-sm-3',
          templateOptions: {
            type: "text",
            label: "Identificador",
            placeholder: "Ingrese Identificador"
          },
        },

        {
          key:"es_tercero",
          type:'input',
          className: 'col-sm-3',
          templateOptions: {
            type: "text",
            label: "Tercero",
            placeholder: "Ingrese Tercero"
          },
        }
      ]
    }
  ];
  lastItem: number;
  visible = false;
  constructor(
    public _user: UserLogin,
    public _ws: WSClient,
    public router: Router,
    public pubsub: PubSubService,
    public toastr: ToastrService,
    public datePipe: DatePipe,
  ) {

  }

  ngOnInit() {}
  search(){
    const builder = Object.keys(this.formData).map((k)=> {

      if(this.formData[k].constructor === Array && this.formData[k][0]){
        return `${k}/${this.formData[k][1]}/${this.formData[k][0]}`;
      }else if(this.formData[k] && this.formData[k].constructor !== Array){
        return `${k}/eq/${this.formData[k]}`;
      }else{
        return '';
      }
    }).filter((x)=> x != '');
    console.log("SEARCH BUILDER:::",builder);
    this._user.setSearch(builder.toString());
    this.pubsub.publish('SEARCH_FILTER');
  }
  resetForm(){
    this.form.reset({
      nombre_receptor: '',
      nombre_emisor: '',
      fecha: '',
      tipo: '',
      rfc_emisor: '',
      rfc_receptor: '',
      saldo: [ '', ''],
      folio: ['', ''],
      anio_fiscal: ['', ''],
      periodo_fiscal: [''],
      total: '',
      uuid: '',
      textsearch: '',
      estatus: '',
      id: '',
      es_tercero: ''

    });
    this.pubsub.publish('SEARCH_FILTER_CLEAR');
  }
  toggle(){
    this._user.setSearchVisible(!this._user.getSearchVisible());
  }
}

