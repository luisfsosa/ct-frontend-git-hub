import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { UserLogin } from "./../../core/api/user.service";
import { URLSearchParams, RequestOptions } from "@angular/http";
import { WSClient } from "./../../core/api/client.service";
import { createObject } from "../../shared/utils/index";
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
  selector: "selector-tercero",
  template: `
  <div class="form-group">
  <label>{{to.label}}</label>
  <ng-select [allowClear]="true"
  [formControl]="formControl"
  [items]="to.options"
  [disabled]="to.disabled"
  (data)="refreshValue($event)"
  (selected)="selected($event)"
  (removed)="removed($event)"
  (typed)="typed($event)"
  placeholder="{{to.placeholder}}">
</ng-select>
    </div>
    `
})
export class FormlySelectorTercero extends Field implements OnInit {

  constructor(
      public _ws: WSClient,
      public _User: UserLogin,
    ) {
    super();
  }
  ngOnInit() {
    const params: URLSearchParams = new URLSearchParams();
    
        params.set("cliente_id", this._User.getUser().id);
        params.set("rfc", this._User.getClient().rfc);
    
        const requestOptions = new RequestOptions();
        requestOptions.params = params;

    this._ws.ThirdParty().get(requestOptions).subscribe(data => {
      let raw = data.json();

      const idx = {
          nombre: raw.columns.indexOf('nombre')
      } 


      this.field.templateOptions.options = raw.content.map((item,i) => {
        return {
          id: item,
          text:item[idx.nombre]
        }
      }
    );
      console.log("cliente Options",this.field.templateOptions.options);
    });
  }
  refreshValue(e){
    console.log("refresh",e)
  }
  selected(e){
    console.log("selected",e)
  }
  removed(e){
    console.log("removed",e)
  }
  typed(e){
    console.log("typed",e)
  }
}
