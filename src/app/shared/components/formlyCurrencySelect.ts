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
//   <my-date-picker name="dp" placeholder="{{to.placeholder}}" [options]="myDatePickerOptions" [formControl]="formControl"></my-date-picker>


@Component({
  selector: "bank-select",
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
export class FormlyCurrencySelect extends Field implements OnInit{
  constructor(public _ws: WSClient){
    super()
  }
  ngOnInit(){
    this._ws.Currencies().get().subscribe(data => {
      let raw = data.json();
      this.field.templateOptions.options = raw.content.map(item => {
        return {
          id:item[1],
          text:item[2]
        }
      }
    );
      console.log("monedas Options",this.field.templateOptions.options);
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
