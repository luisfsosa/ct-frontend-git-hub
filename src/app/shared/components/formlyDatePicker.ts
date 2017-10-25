import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
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
import { IMyDpOptions } from "mydatepicker";

@Component({
  selector: "formly-datepicker",
  template: `
    <div class="form-group">
    <label>{{to.label}}</label>
    <my-date-picker name="dp" placeholder="{{to.placeholder}}" [options]="myDatePickerOptions" [formControl]="formControl"></my-date-picker>
  </div>
    `
})
export class FormlyDatePicker extends Field {
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    openSelectorOnInputClick: true,
    inline: false,
    editableDateField: false,
    dateFormat: "yyyy-mm-dd",
    monthLabels: {
      1: "Ene",
      2: "Feb",
      3: "Mar",
      4: "Abr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Ago",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec"
    },
   dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'},
   todayBtnTxt: 'Hoy',
  };
}
