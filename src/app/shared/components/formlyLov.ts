import { UserLogin } from './../../core/api/user.service';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { Http, URLSearchParams, RequestOptions } from "@angular/http";
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
  selector: "selector-lov",
  template: `
    <div class="form-group">
    <label>{{to.label}}</label>
    <ng-select [allowClear]="true"
    [formControl]="formControl"
    [items]="list"
    [disabled]="to.disabled"
    placeholder="{{to.placeholder}}">
</ng-select>
    </div>
    `
})
export class FormlyLov extends Field implements OnInit {
  list: any;
  constructor(
    private http: Http,
    public _user:UserLogin
  ){
    super();
  }
  ngOnInit() {
    console.log("template options LOV", this.to.field);
    const client_id = this._user.getUser().id;
    const rfc = this._user.getClient().rfc;
    let URL = this.to.field['LOV_Endpoint']
    URL = URL.replace('<cliente_id>',client_id);
    URL = URL.replace('<rfc>',rfc);
    const EndPoint = `http://${URL}`;
    this.http.get(EndPoint).subscribe((res)=> {
      console.log("LOV ENDPOINT",res.json())
      const raw = res.json(); 
      console.log("raw",raw);
      this.list = Object.keys(raw).map((x)=> { 
        return { id: x, text: raw[x] } 
      });

      console.log("Lov Options", this.list);
    });

    
  }
}
