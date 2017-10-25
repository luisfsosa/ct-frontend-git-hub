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
import { WSClient } from "../../../core/api/client.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  formData = {};
  userFields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: [
        {
          key: "email",
          type: "input",
          templateOptions: {
            type: "email",
            label: "Dirección de correo electronico",
            placeholder: "Ingresar Email"
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          key: "usuario",
          type: "input",
          templateOptions: {
            type: "input",
            label: "Nombre de Usuario",
            placeholder: "Ingresar Nombre de Usuario"
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
        },
        {
          key: "confirmPassword",
          type: "input",
          templateOptions: {
            type: "password",
            label: "Confirmar Contraseña",
            placeholder: "Ingresar Contraseña",
            pattern: ""
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          key: "referer",
          type: "select",
          defaultValue: "",
          templateOptions: {
            options: [
              {
                label: "Redes Sociales",
                value: "REDES_SOCIALES"
              },
              {
                label: "Google",
                value: "GOOGLE"
              },
              {
                label: "Cursos",
                value: "CURSOS"
              },
              {
                label: "Recomendación",
                value: "RECOMENDACION"
              }
            ],
            label: "¿Como se entero de nosotros?",
            placeholder: "Seleccionar"
          }
        }
      ]
    }
  ];

  /*
    Redes Sociales
Google
Cursos
Recomendación
    */

  user = {
    email: "email@gmail.com",
    checked: false
  };

  constructor(
    public modal: Modal,
    private route: ActivatedRoute,
    private router: Router,
    public _ws: WSClient,
    public toastr: ToastrService
  ) {}

  submit(user) {
    console.log("User: " + JSON.stringify(user));
    this.saveForm(user);
    /*this.modal
      .alert()
      .size("lg")
      .showClose(false)
      .body(
        `
        <div class="text-center">
        <img src="assets/img/quo-logo.png" />
        <h3><span class="fa fa-check text-success"></span> Email de activación enviado</h3>
            <h4>¡Te enviamos un correo de activación!</h4>
            <p>Por favor verifica tu bandeja de entrada y sigue las instrucciones de activación</p>
        </div>
            `
      )
      .open()
      .then((dialog: DialogRef<TwoButtonPreset>) => {
        dialog.result
          .then(result => {
            this.router.navigate(["/login"]);
          })
          .catch(() => {
            console.log("Error");
          });
      });*/
  }

  saveForm(user) {
    console.log("Form Data", this.formData);
    let bStatus = true;
    let fData: any = user;
    let newAccount = {
      entity: "usuarios",
      values: {
        email: fData.email,
        usuario: fData.usuario,
        nombre: fData.usuario,
        rol: "CUENTA_MAESTRA",
        password: fData.password,
        cliente_id: 1
      }
    };
    console.log("save this", JSON.stringify(newAccount));
    try {
      console.log("fData: " + JSON.stringify(fData));
      if (fData.email == "" || fData.email == null) {
        this.toastr.error("por favor ingrese Email");
        bStatus = false;
      }
      if (fData.usuario == "" || fData.usuario == null) {
        this.toastr.error("por favor ingrese un Nombre de Usuario");
        bStatus = false;
      }
      if (fData.password == "" || fData.password == null) {
        this.toastr.error("por favor ingrese un Password");
        bStatus = false;
      }
      if (fData.password != fData.confirmPassword) {
        this.toastr.error("sus claves no coinciden");
        bStatus = false;
      }
      if (fData.password.length < 6) {
        this.toastr.error("su clave debe ser mayor a 6 caracteres");
        bStatus = false;
      }
      if (bStatus) {
        this._ws
          .Client()
          .post(JSON.stringify(newAccount))
          .subscribe(res => {
            console.log(res.text());
            let data = JSON.parse(res.text());
            if (data.result) {
              this.toastr.success(
                "Se a enviado un mail de activacion a su correo"
              );
              this.modal
                .alert()
                .size("lg")
                .showClose(false)
                .body(
                  `
              <div class="text-center">
              <img src="assets/img/ct-logo-w.png" />
              <h3><span class="fa fa-check text-success"></span> Email de activación enviado</h3>
                  <h4>¡Te enviamos un correo de activación!</h4>
                  <p>Por favor verifica tu bandeja de entrada y sigue las instrucciones de activación</p>
              </div>
                  `
                )
                .open()
                .then((dialog: DialogRef<TwoButtonPreset>) => {
                  dialog.result
                    .then(result => {
                      this.router.navigate(["/login"]);
                    })
                    .catch(() => {
                      console.log("Error");
                    });
                });
            } else {
              this.toastr.warning(
                "ocurrio un error en el sistema por favor contacte al administrador del sistema"
              );
            }
          });
      }
    } catch (error) {
      console.log(error);
    }

    return false;
  }

  ngOnInit() {}
}
