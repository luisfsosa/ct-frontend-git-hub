import { Component, OnInit } from "@angular/core";
import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { UserLogin } from "../../../core/api/user.service";
import { WSClient } from "../../../core/api/client.service";
import { PubSubService } from "./../../../shared/ngx-pubsub/ngx-pubsub.service";
import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "../../../shared/ngx-pubsub/pubsub-actions";
import { ToastrService } from "ngx-toastr";
import { URLSearchParams, RequestOptions } from '@angular/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormState extends BSModalContext {
  constructor(public edit: string) {
    super();
  }
}

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"]
})


export class UserFormComponent implements ModalComponent<FormState> {
  context: FormState;
  public banksList = [];
  formData = {};

  options = {
    formState: {
      readOnly: false
    }
  };


  form: FormGroup = new FormGroup({});

  fields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: [
        {
          key: "usuario",
          type: "input",
          templateOptions: {
            type: "text",
            label: "Usuario",
            placeholder: "Ingresar Usuario"
          },
          validators: {
            validation: Validators.compose([Validators.required])
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
            placeholder: "Ingresar Email"
          },
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
  public data:any = {content:[],columns:[]};
  constructor(
    public dialog: DialogRef<FormState>,
    public _user: UserLogin,
    public _ws: WSClient,
    public router: Router,
    public pubsub: PubSubService,
    public toastr: ToastrService
  ) {

    this.context = dialog.context;
    dialog.setCloseGuard(this);
    console.log("test: "+JSON.stringify(this.data));

  }

  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  saveForm() {
    console.log("Form Data",this.formData);
    let fData:any = this.formData;
    let rfcs=[];

    fData.rfcs.forEach(item => {
      rfcs.push(item.id)
    })


    let newAccount = {
      "entity":"usuarios",
      "values": {
      "usuario":fData.usuario,
      "nombre": fData.nombre,
      "email": fData.email,
      "rol": fData.rol,
      "cliente_id": this._user.getUser().cliente_id,
      "rfcs": rfcs
      }
    }
    console.log("save this", newAccount);

    this._ws.Client().post(JSON.stringify(newAccount)).subscribe(res => {
      this.closeDialog();
      console.log(res);
      this.pubsub.publish(RECIEVED_EVENTS.RELOAD);
      this.toastr.success("Se guardo un nuevo usuario");
    });

    return false;
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
