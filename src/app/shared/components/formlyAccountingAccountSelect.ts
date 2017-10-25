import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { WSClient } from './../../core/api/client.service';
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


@Component({
  selector: "accounting-account-select",
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
export class FormlyAccountingAccountSelect extends Field implements OnInit{
  constructor(public _ws: WSClient){
    super()
  }
  ngOnInit(){
    this._ws.AccountingAccounts().get().subscribe(data => {
      let raw = data.json();
      this.field.templateOptions.options = raw.content.map(item => {
        return {
          id:item[1],
          text:item[1]+' - ' +item[20]
        }
      }
    );
      console.log("Cuentas Contables Options",this.field.templateOptions.options);
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
