import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { URLSearchParams, RequestOptions } from "@angular/http";
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
  selector: "readOnly",
  template: `
    <div class="form-group">
    <label>{{to.label}}: {{model[key] | json}}</label>
    <br>
    </div>

    `
})
export class FormlyReadOnly extends Field implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {

  }
}
