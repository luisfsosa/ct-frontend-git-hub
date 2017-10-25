import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { UserLogin } from "./../../core/api/user.service";
import { URLSearchParams, RequestOptions } from "@angular/http";
import { WSClient } from "./../../core/api/client.service";
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  OnDestroy
} from "@angular/core";
import {
  FormlyModule,
  FormlyFieldConfig,
  Field,
  FieldWrapper
} from '@ngx-formly/core';
//   <my-date-picker name="dp" placeholder="{{to.placeholder}}" [options]="myDatePickerOptions" [formControl]="formControl"></my-date-picker>

@Component({
  selector: "selector-monedas",
  template: `
    <div class="form-group">
    <label>{{to.label}}</label>
    <br>
    <div class="btn-group" dropdown placement="bottom left">
    <button dropdownToggle type="button" class="form-control dropdown-toggle">
      {{ selectedValue || to.placeholder || "Seleccionar Opción"}} <span class="caret"></span>
    </button>
    <ul *dropdownMenu class="dropdown-menu dropdown-menu-left" role="menu">
      <li role="menuitem" *ngFor="let option of to.options"><a class="dropdown-item" (click)="setValue(option)">
        {{option[1] + ' - ' + option[2]}}
      </a>
      </li>
    </ul>
  </div>
    </div>
    `
})
export class FormlySelectorMoneda extends Field implements OnInit {
  public selectedValue: string;
  constructor(public _ws: WSClient, public _User: UserLogin) {
    super();
  }
  ngOnInit() {
    this._ws.Currencies().get().subscribe(data => {
      let raw = data.json();
      this.field.templateOptions.options = raw.content;
      console.log("bancos Options", this.field.templateOptions.options);
    });
  }
  setValue(option) {
    this.selectedValue = option[1] + " - " + option[2];
    console.log(this.formControl.value);
    this.formControl.setValue({
      "codigo": option[1],
      "descripcion": option[2],
    });
  }
}
