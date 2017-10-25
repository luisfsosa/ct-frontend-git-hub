import { Observable } from "rxjs/Observable";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Overlay, DialogRef } from "angular2-modal";
import { Modal, TwoButtonPreset } from "angular2-modal/plugins/bootstrap";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { Http, RequestOptions, URLSearchParams } from "@angular/http";
import { WSClient } from "../../../core/api/client.service";
import { createObject } from "../../../shared/utils/index";


import { UserLogin } from "../../../core/api/user.service";
import { ToastrService, ToastrConfig } from "ngx-toastr";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  userFields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: [
        {
          key: "email",
          type: "input",
          templateOptions: {
            type: "email",
            label: "Usuario o Correo Electronico",
            placeholder: "Ingresar Email o Usuario"
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          key: "password",
          type: "input",
          templateOptions: {
            type: "password",
            label: "Contraseña",
            placeholder: "Contraseña",
            pattern: ""
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        }

        //  {
        //   key: 'perfil',
        //   type: 'select',
        //   defaultValue: '',
        //   templateOptions: {
        //     options: [
        //       {
        //       label: 'Administrador',
        //       value: 'ADMIN',
        //     }, {
        //       label: 'Contador',
        //       value: 'contador',
        //     }],
        //     label: 'Perfil',
        //     placeholder: 'Selecciona Perfil',
        //   },
        // }
      ]
    }
  ];

  user = {
    email: null,
    password: null
  };

  options: ToastrConfig;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _WS: WSClient,
    public modal: Modal,
    public _user: UserLogin,
    public _toastr: ToastrService

  ) {}

  errorMessage() {
    this.modal
      .alert()
      .size("lg")
      .titleHtml("<h4>Error</h4>")
      .body(`<p class='text-danger'>Verifica tu usuario o contraseña</p>`)
      .open();
  }

  connectionError() {
    this.modal
      .alert()
      .size("lg")
      .titleHtml("<h4>Error</h4>")
      .body(`<p class='text-danger'>Verifica tu conexión a internet</p>`)
      .open();
  }

  login(user) {
    if(user.email){
      console.log(user);
            const params: URLSearchParams = new URLSearchParams();
            params.set("email", user.email);
            params.set("password", user.password);
            const requestOptions = new RequestOptions();
            requestOptions.params = params;
      
            const requestLogin$ = this._WS.Login().get(requestOptions);
            requestLogin$.subscribe(
              data => {
                if (data.json().content.length > 0) {
                  console.log("Login", data.json());
      
                  const dataRaw = data.json();
      
                  const results = createObject(dataRaw.columns, dataRaw.content);
      
                  console.log("dataRaw", results[0]);
      
                  this._user.setUser(results[0]);
                  this.setClient();

                } else {
                  this._toastr.error("Verifica la información del formulario");
                }
              },
              err => {
                this._toastr.error("Verifica tu conexión a internet");
                console.error(err);
              }
            );
    }else{
      this._toastr.error('Email es un campo requerido','Error');
    }
    return false;
  }

  ngOnInit() {}

  setClient(){
    const params: URLSearchParams = new URLSearchParams();
    const requestOptions = new RequestOptions();
    requestOptions.params = params;
    params.set("cliente_id", this._user.getUser().cliente_id);
    this._WS.ClientsRFCs().get(requestOptions).subscribe(data => {
      console.log(data.json());
      const RFCS = createObject(data.json().columns, data.json().content);
      this._user.setClient(RFCS[0]);
      this._toastr.success("Ingreso exitoso!");
      this.router.navigate(["/private/dashboard"]);
    });
  }

}
