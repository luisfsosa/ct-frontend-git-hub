import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

form: FormGroup = new FormGroup({});
  userFields: FormlyFieldConfig = [{
    className: 'row',
    fieldGroup: [{
        key: 'email',
        type: 'input',
        templateOptions: {
            type: 'email',
            label: 'Dirección de correo electronico',
            placeholder: 'Ingresar Email',
        },
        validators: {
            validation: Validators.compose([Validators.required])
        }
    }, {
        key: 'password',
        type: 'input',
        templateOptions: {
            type: 'password',
            label: 'Contraseña',
            placeholder: 'Contraseña',
            pattern: ''
        },
        validators: {
          validation: Validators.compose([Validators.required])
        }
    },
    {
        key: 'confirmPassword',
        type: 'input',
        templateOptions: {
            type: 'password',
            label: 'Confirmar Contraseña',
            placeholder: 'Ingresar Contraseña',
            pattern: ''
        },
        validators: {
          validation: Validators.compose([Validators.required])
        }
    }

    ]
  }];

  user = {
    email: 'email@gmail.com',
    checked: false
  };

  submit(user) {
    console.log(user);
  }

    ngOnInit() {
    }

}
