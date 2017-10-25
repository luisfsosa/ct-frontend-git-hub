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
  selector: "categorized-accounting-account-select",
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
export class FormlyCategorizedAccountingAccountSelect extends Field implements OnInit{
  constructor(public _ws: WSClient){
    super()
  }
  ngOnInit(){
    this._ws.CategorizedAccountingAccounts().get().subscribe(data => {
      this.field.templateOptions.options =this.getMap(data.json());
      console.log("Cuantas Contables Categorizadas",this.field.templateOptions.options);
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

  getMap(array){
    let map:any=[];
    for (let id in array) {
      map.push({id:id, text:array[id]});
    }
    return map;
  }
}
