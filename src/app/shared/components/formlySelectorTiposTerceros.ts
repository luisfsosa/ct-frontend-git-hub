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
  selector: "selector-tipos-terceros",
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
export class FormlySelectorTiposTerceros extends Field implements OnInit {

  constructor(public _ws: WSClient) {
    super();
  }
  ngOnInit() {
    this._ws.ThirdPartyType().get().subscribe(data => {
      let raw = data.json();

      const Types = createObject(raw.columns,raw.content);

      this.field.templateOptions.options = raw.content.map((item,i) => {
        return {
          id: Types[i],
          text:item[1]
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
