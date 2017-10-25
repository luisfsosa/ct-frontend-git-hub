import { Component, OnInit } from "@angular/core";
import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { UserLogin } from "./../../core/api/user.service";
import { WSClient } from "./../../core/api/client.service";
import { PubSubService } from "./../ngx-pubsub/ngx-pubsub.service";
import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "../../shared/ngx-pubsub/pubsub-actions";
import { ToastrService } from "ngx-toastr";
import { URLSearchParams, RequestOptions,Http } from "@angular/http";

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
  selector: "edituser-form",
  template: `
		
		<div class="container-fluid custom-modal-container">
		{{formData.rfc}}
    <form class="formly" role="form" novalidate [formGroup]="form" (ngSubmit)="updateUser(formData)">
      <div class="custom-modal-header">
        <h4 class="page-title"> <i class="fa fa-money"></i> Editar Usuario</h4>
      </div>
      <div class="row">
        <div class="col-md-12">
        <formly-form [model]="formData" [fields]="formFields" [form]="form" [options]="options">
        </formly-form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-right">
          <button type="submit" class="btn btn-warning btn-lg">Guardar</button>
          <a (click)="closeDialog()" class="btn btn-lg btn-default">Cancelar</a>
        </div>
      </div>
    </form>
  </div>
		
    `
})
export class EditFormComponent implements OnInit {
  formData = {
    id: 0,
    usuario: "",
    nombre: "",
    email: "",
    rol: [],
    rfcs: []
  };

  context: any;

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
            key: "usuario",
            type: "input",
            templateOptions: {
              type: "text",
              label: "Usuario",
              placeholder: "Ingresar Usuario",
              disabled: true
            }
          },

          {
            key: "nombre",
            type: "input",
            templateOptions: {
              type: "text",
              label: "Nombre de Usuario",
              placeholder: "Ingresar nombre de usuario"
            },
            validators: {
              validation: Validators.compose([Validators.required])
            }
          },

          {
            key: "email",
            type: "input",
            templateOptions: {
              type: "text",
              label: "Email",
              placeholder: "Ingresar Email",
              disabled: true
            }
          },

        {
          key: "rol",
          type: "select",
          templateOptions: {
            label: "Rol",
            placeholder: "Selecciona tipo de usuario",
            options: [{
              label: 'Super Usuario',
              value: 'SUPER_USUARIO',
            }, {
              label: 'Cuenta Maestra',
              value: 'CUENTA_MAESTRA',
            },
              {
                label: 'Contador',
                value: 'CONTADOR',
              },
              {
                label: 'Consulta',
                value: 'CONSULTA',
              }]
          },
          hideExpression: !this.isSuperUser(),
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },

        {
          key: "rol",
          type: "select",
          templateOptions: {
            label: "Rol",
            placeholder: "Selecciona tipo de usuario",
            options: [
              {
                label: 'Contador',
                value: 'CONTADOR',
              },
              {
                label: 'Consulta',
                value: 'CONSULTA',
              }]
          },
          hideExpression: this.isSuperUser(),
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          key: 'rfcs',
          type: 'rfc-multi-select',
          templateOptions: {
            label: 'Rfcs',
            placeholder: 'Seleccione uno o Varios Rfcs',
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
    private http: Http,
    public dialog: DialogRef<FormState>,
    public _user: UserLogin,
    public _ws: WSClient,
    public router: Router,
    public pubsub: PubSubService,
    public toastr: ToastrService
  ) {
    this.context = this.dialog.context;
    dialog.setCloseGuard(this);
    console.log("this.context.selected: "+this.context.selected[0]);

    this.formData.id = this.context.selected[0];
    this.formData.usuario = this.context.selected[1];
    this.formData.nombre = this.context.selected[2];
    this.formData.email = this.context.selected[3];
    this.formData.rol = this.context.selected[4];

    let rfcsAll=this.context.rfcs;

    let rfcs=this.context.selected[6];

    const idx = {
      razon_social: rfcsAll.columns.indexOf('razon_social'),
      rfc: rfcsAll.columns.indexOf('rfc')
    }

    if(rfcs){
      rfcsAll.content.forEach(item => {
        if(rfcs.includes(item[idx.rfc])){
          this.formData.rfcs.push(this.getRfcEntity(item,idx.rfc,idx.razon_social));
        }
      });
    }
  }

  getRfcEntity(item, rfc, razon_social){
    return {
      id: item[rfc],
      text:item[razon_social]+' - ' +item[rfc]
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

  updateUser(){
    console.log("Form Data",this.formData);
    let fData:any = this.formData;
    let rfcs=[];

    fData.rfcs.forEach(item => {
      rfcs.push(item.id)
    })

    let newAccount = {
      "entity":"usuarios",
      "id": this.formData.id,
      "values": {
        "nombre": fData.nombre,
        "rol": fData.rol,
        "rfcs": rfcs
      }
    }
    console.log("save this", JSON.stringify(newAccount));

    this._ws.Generic().put(JSON.stringify(newAccount)).subscribe(res => {
      this.closeDialog();
      console.log(res);
      this.toastr.success("Se guardo un nuevo usuario");
      this.pubsub.publish(RECIEVED_EVENTS.RELOAD);
    });

  }

  isSuperUser(){
    if(this._user.getUser().rol==='SUPER_USUARIO'){
      return true;
    }
    else {
      return false;
    }
  }
}

